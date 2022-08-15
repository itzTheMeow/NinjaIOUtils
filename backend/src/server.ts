import express from "express";
import { readFileSync } from "fs";
import cors from "cors";
import { Server } from "socket.io";
import { SocketTypes } from "../../shared";
import onlineUserConn, { onlineUsers } from "./onlineUserManager";
import partyManagerConnection from "./party/partyManager";

const config = {
  port: 8907,
  home: "https://github.com/itzTheMeow/NinjaIOUtils",
  ver: readFileSync("../version.json").toString().replace(/"/g, "").trim(),
};

const app = express();
app.use(
  cors({
    origin: "*",
    allowedHeaders: ["content-type"],
  })
);

app.get("/", (req, res) => res.redirect(config.home));
app.get("/ver", (req, res) => {
  res.send(config.ver);
});
app.get(
  "/onlineplayers",
  cors({
    origin: "*",
  }),
  (req, res) => {
    res.json(onlineUsers.map((u) => u.id));
  }
);

const server = app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}.`);
});
const ws = new Server(server, { cors: { origin: "*" } });
ws.on("connection", (socket) => {
  socket.on("init", (type: SocketTypes, ...args: any[]) => {
    switch (type) {
      case SocketTypes.online:
        onlineUserConn(socket, args[0]);
        break;
      case SocketTypes.party:
        partyManagerConnection(socket, args[0], args[1]);
        break;
      default:
        socket.disconnect(true);
    }
  });
});
