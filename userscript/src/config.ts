export default {
  ver: "$$version",
  api: "http://localhost:8907",
  customDelimiter: "__custom",
  actualGameVersion:
    document
      .querySelector<HTMLScriptElement>(`script[src*="game.js"]`)
      ?.src.split("/")
      .pop()
      ?.split("?v=")?.[1] ||
    (() => {
      try {
        return App.ClientVersion;
      } catch {
        return "unknown";
      }
    })(),
  PacketTypeMap: {
    systemMessage: "w",
    chatSend: "x",
    findMatch: "h",
    joinMatch: "j",
    data: "d",
    data2: "p",
    joinedMessage: "i",
  },
  Colors: {
    dotGreen: 65280,
    dotGrey: 8947848,
    dotOrange: 16757012,
    green: 8978312,
    grey: 16777215,
    red: 12603201,
    white: 13421772,
    yellow: 16763904,
  },
  MapIDs: {
    Hull: 1,
    Igloo: 2,
    Temple: 3,
    DragonsDen: 4,
    dm_Arena1: 5,
    Elysium: 6,
    Tobruk: 7,
    ColdFusion: 8,
    TwinFaces: 9,
    KodysIsland: 10,
    Canyon: 11,
    Hill364: 12,
    Stasis: 13,
    ctf_Evening: 14,
    ArcticDusk: 15,
    Cathedral: 16,
    ctf_Lambda: 17,
    Aerial: 18,
    ctf_FacingWorlds: 19,
    ctf_Ash: 20,
    ctf_Naom: 21,
    dm_Hunter: 22,
    Tribal: 23,
    Kiwi: 24,
    Webb: 26,
    dm_Sleet: 27,
    SpaceStation: 28,
    Sinkhole: 29,
    LonelyIsland: 30,
    dm_Nexus: 31,
  },
  WeaponReloadTimes: {
    Fists: 0,
    Shotgun: 0,
    SubmachineGun: 0,
    NadeLauncher: 2000, // M79
    Barrett: 2500,
    ShockRifle: 0,
    PulseGun: 0,
    FlameThrower: 0,
    RPG: 4000,
    Rifle: 2000,
    LaserGun: 0,
    LinkGun: 0,
    AK47: 0,
    Chainsaw: 0,
    DesertEagle: 0,
    Minigun: 0,
    X75: 0,
    MAC10: 0,
    Bow: 300,
    RocketLauncher: 0, // Avenger
    Carbine: 0,
    BoomerangGun: 0,
    M60: 4000,
    Uzi: 0,
    Bouncyball: 0,
  },
};
