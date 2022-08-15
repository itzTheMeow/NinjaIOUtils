import { Application } from "express";
import { onlineUsers } from "./onlineUserManager";

export default function initStatTracker(app: Application) {
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
  app.post("/submit", async (req, res) => {
    return res.json({
      err: "DISABLED",
      message: `The score tracker is disabled for now!`,
    });
    /*const key = String(req.query.key || "");
    if (!key)
      return res.json({
        err: "NOT_AUTHORIZED",
        message: "Your API key is invalid.",
      });
    const acc = getAllAccounts().find((a) => a.apiKey && a.apiKey == key);
    if (!acc)
      return res.json({
        err: "NOT_AUTHORIZED",
        message: "Your API key is invalid.",
      });
    const account = getAccount(acc.id);

    const data = req.body as IncomingNinjaGame;
    const linkID = String(data.id || "");
    if (!linkID)
      return res.json({
        err: "INCOMPLETE",
        message: "Incomplete request missing ID.",
      });

    const linkStats = getNinjaData(linkID);
    if (!account || !account.ninjaLinks.includes(linkID) || !linkStats)
      return res.json({
        err: "NOT_LINKED",
        message: "This account is not linked to the tracker!",
      });

    if (!data.map || !NinjaMaps[data.map] || !Number(data.map))
      return res.json({ err: "INVALID_MAP", message: "Map ID invalid." });

    let determinedMode: NinjaGamemodes;
    switch (data.mode) {
      case NinjaGamemodes.captureTheFlag:
        determinedMode = NinjaGamemodes.captureTheFlag;
        break;
      case NinjaGamemodes.deathmatch:
        determinedMode = NinjaGamemodes.deathmatch;
        break;
      case NinjaGamemodes.dodgeball:
        determinedMode = NinjaGamemodes.dodgeball;
        break;
      case NinjaGamemodes.teamDeathmatch:
        determinedMode = NinjaGamemodes.teamDeathmatch;
        break;
    }
    if (!determinedMode) return res.json({ err: "INVALID_MODE", message: "Mode name invalid." });

    const builtData: NinjaGame = {
      time: Date.now(),
      map: data.map,
      mode: determinedMode,
      kills: Number(data.kills) || 0,
      deaths: Number(data.deaths) || 0,
      kdr: Math.round(((Number(data.kills) || 0) / (Number(data.deaths) || 1)) * 1000) / 1000,
    };
    if (builtData.mode == NinjaGamemodes.captureTheFlag) {
      builtData.captures = Number(data.caps) || 0;
      if (builtData.captures > 3 || builtData.captures < 0)
        return res.json({
          err: "SUSPICIOUS_CAPS",
          message: `Your capture count (${builtData.captures}) is suspicious. Contact the developer if this is an issue.`,
        });
    }

    if (builtData.kills < -5 || builtData.kills > 150)
      return res.json({
        err: "SUSPICIOUS_KILLS",
        message: `Your kill count (${builtData.kills}) is suspicious. Contact the developer if this is an issue.`,
      });
    if (builtData.deaths < 0 || builtData.deaths > 100)
      return res.json({
        err: "SUSPICIOUS_DEATHS",
        message: `Your death count (${builtData.deaths}) is suspicious. Contact the developer if this is an issue.`,
      });
    if (!builtData.kills && !builtData.deaths && !builtData.captures) {
      console.error(
        "No nonzero:\n" + JSON.stringify(builtData) + "\nsent: " + JSON.stringify(data)
      );
      return res.json({
        err: "NO_DATA",
        message: `There wasn't any nonzero score data.`,
      });
    }

    linkStats.matchHistory.unshift(builtData);
    setNinjaData(linkID, linkStats);

    res.json({
      err: null,
    });*/
  });
}
