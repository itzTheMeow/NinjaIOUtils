import config from "./config";
import { gameLinkData } from "./shareURLs";
import { setHash } from "./utils";

export default function initMapIdentifier() {
  Client.prototype.onMessage = function (_a) {
    const a = Client.decompress(_a.data);
    // console.log(a);
    /* Hooks into the join message and gets the server name you join using. */
    if (
      a.type == config.PacketTypeMap.data &&
      a.data.type == config.PacketTypeMap.joinedMessage &&
      a.data.info.startsWith("You joined ")
    ) {
      let roomName = a.data.info.substring("You joined ".length);
      setHash(app.client.server.id, roomName, gameLinkData.pass);
    }
    const repFail = () => App.Console.log(`# Failed to identify map. Please report to Meow.`);
    const repSuccess = (id, name) => App.Console.log(`# Identified map as ${name} (ID: ${id}).`);
    if (
      a.type == config.PacketTypeMap.data2 &&
      a.data.t == config.PacketTypeMap.systemMessage &&
      a.data.msg.startsWith("Joining ")
    ) {
      const mapName = (a.data.msg.match(/(?: - )(.*)(?: by)/) || [])[1];
      this.mapID = 0;
      if (mapName) {
        const mapID = config.MapIDs[mapName];
        if (mapID) {
          repSuccess(mapID, mapName);
          this.mapID = mapID;
        } else repFail();
      } else repFail();
    } else if (
      a.type == config.PacketTypeMap.data2 &&
      a.data.t == config.PacketTypeMap.systemMessage &&
      a.data.msg.startsWith("loading map: ")
    ) {
      const mapName = a.data.msg.substring("loading map: ".length);
      this.mapID = 0;
      if (mapName) {
        const mapID = config.MapIDs[mapName];
        if (mapID) {
          repSuccess(mapID, mapName);
          this.mapID = mapID;
        } else repFail();
      } else repFail();
    }
    this.dispatchEvent(a);
  };
}
