import fs from "fs";

/* Script to run on browser: */
!(() => {
  Client.unpackGameData = function (a) {
    const d = JSON.parse(LZString.decompressFromUint8Array_Fast(a.subarray(1)));
    console.log(d);
    return {
      t: Protocol.Game.UPDATE,
      d,
    };
  };
});

// scales all polygons for maps that need it
const MAP_SCALE = 20;

const Map = {
  _id: null,
  name: "test",
  mode: "DM",
  author: "test",
  version: "1",
  editorVersion: "alpha",
  date: "2025/3/10",
  contextData: {
    environment: {},
    go: [],
  },
};

const json = JSON.parse(fs.readFileSync("dump.json").toString());

for (const packet of json) {
  // environment packet
  if (packet.env) {
    Map.contextData.environment = packet.env;
  }
  // game object
  else if (packet.id) {
    const obj = {
      type: packet.p.type,
      x: packet.p.x,
      y: packet.p.y,
      g: packet.g,
      p: packet.p,
    };
    if (packet.at) obj.at = packet.at;
    delete obj.p.x;
    delete obj.p.y;
    delete obj.p.r;
    obj.p.sh?.forEach((sh) => {
      delete sh.o;
      sh.v?.forEach((v) => {
        v.x *= MAP_SCALE;
        v.y *= MAP_SCALE;
      });
    });
    Map.contextData.go.push(obj);
  }
}

fs.writeFileSync("out.json", JSON.stringify(Map));
