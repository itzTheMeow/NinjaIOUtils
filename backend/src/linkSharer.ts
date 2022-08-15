import { Application } from "express";
import { onlineUsers } from "./onlineUserManager";

export default function initLinkSharer(app: Application) {
  app.get("/requestlink", async (req, res) => {
    const reqUser = onlineUsers.find((u) => u.id == req.query.userid);
    const reqID = String(req.query.id);
    if (!reqUser || !reqID) return res.json([null]);
    let responded = false;
    function foundLink(rid: string, linkRes = null) {
      if (responded || rid !== reqID) return;
      responded = true;
      reqUser.sock.off("gotLink", foundLink);
      if (typeof linkRes !== "boolean" && linkRes !== null && !Array.isArray(linkRes))
        linkRes = null;
      if (Array.isArray(linkRes))
        linkRes = [String(linkRes[0]), String(linkRes[1]), String(linkRes[2])];
      res.json([linkRes]);
    }
    reqUser.sock.on("gotLink", foundLink);
    reqUser.sock.emit("needsLink", reqID);
    setTimeout(() => foundLink(reqID), 10000);
  });
}
