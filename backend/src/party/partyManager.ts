import { Socket } from "socket.io";

const codeFilter = "abcdefghijklmnopqrstuvwxyz.";

class NinjaRoomMember {
  public isReady = false;

  public get ip() {
    return (
      String(this.socket.handshake.headers["x-forwarded-for"] || "") ||
      this.socket.handshake.address
    ).replace("::ffff:", "");
  }

  constructor(public room: NinjaRoom, public socket: Socket, public name: string) {}

  public toJSON(ref: NinjaRoomMember) {
    return {
      name: this.name,
      ready: this.isReady,
      me: ref == this,
    };
  }
}

class NinjaRoom {
  public members: NinjaRoomMember[] = [];
  public bannedIPs: string[] = [];
  public get owner() {
    return this.members[0];
  }

  constructor(public code: string) {
    ninjaRooms.push(this);
  }
  public addMember(sock: Socket, name: string) {
    const mem = new NinjaRoomMember(this, sock, name);
    if (this.bannedIPs.includes(mem.ip))
      return this.removeMember(mem, "You are banned from this party.");
    if (this.members.find((m) => m.name == mem.name)) mem.name += String(Date.now()).substring(10);
    this.members.push(mem);
    this.sendMeta();

    mem.socket.on("disconnect", () => this.removeMember(mem));
    mem.socket.on("isReady", (state) => {
      mem.isReady = !!state;
      this.sendMeta();
    });
    mem.socket.on("leave", () => {
      this.removeMember(mem, "You have left the party.");
    });
    mem.socket.on("banMem", (name) => {
      const banned = this.members.find((m) => m.name == String(name) && m !== mem);
      if (this.owner && banned) {
        this.removeMember(banned, "You have been banned from the party.");
        this.bannedIPs.push(banned.ip);
      }
    });
  }
  public removeMember(mem: NinjaRoomMember, reason?: string) {
    const i = this.members.indexOf(mem);
    if (i > -1) this.members.splice(i, 1);
    mem.socket.emit("joinErr", reason || "You have been disconnected from the party.");
    setTimeout(() => mem.socket.disconnect(true), 500);
    this.sendMeta();
    if (!this.members.length) this.destroy();
  }
  public sendMeta() {
    this.members.forEach((mem) => {
      mem.socket.emit(
        "updateMembers",
        this.members.map((m) => m.toJSON(mem))
      );
    });
  }

  public destroy() {
    this.members.forEach((m) => this.removeMember(m, "Party deleted."));
    ninjaRooms.splice(ninjaRooms.indexOf(this), 1);
  }
}

const ninjaRooms: NinjaRoom[] = [];
function findRoom(code: string) {
  return ninjaRooms.find((r) => r.code == code);
}

export default function partyManagerConnection(socket: Socket, code: string, name: string) {
  code = [...String(code)].filter((c) => codeFilter.includes(c)).join("");
  let room = findRoom(code);
  if (!room) room = new NinjaRoom(code);
  room.addMember(socket, String(name || "Guest").slice(0, 50));
  socket.emit("joinedParty", room.code);
}
