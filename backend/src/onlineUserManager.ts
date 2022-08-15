import { Socket } from "socket.io";

export const onlineUsers: { sock: Socket; id: string }[] = [];
export default function onlineUserConn(socket: Socket, id: string) {
  id = String(id);
  if (!id || !Number(id)) return socket.disconnect(true);
  if (onlineUsers.find((u) => u.id == id)) {
    socket.emit("fail", "Already logged in on another tab.");
    socket.disconnect(true);
    return;
  }
  onlineUsers.push({ sock: socket, id });
  socket.emit("success");

  function dc() {
    const i = onlineUsers.findIndex((u) => u.id == id);
    if (i >= 0) onlineUsers.splice(i, 1);
    socket.disconnect(true);
  }

  socket.on("dc", () => dc());
  socket.on("disconnect", () => dc());
}
