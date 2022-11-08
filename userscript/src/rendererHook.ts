import Vec2 from "vec2";
import config from "./config";
import { loadMap } from "./lighting_engine/load-map";
import { Segment } from "./lighting_engine/Polygon";
import { Rectangle } from "./lighting_engine/rectangle";
import { calculateVisibility } from "./lighting_engine/visibility";

export default function hookRenderer() {
  Canvas.prototype._update = Canvas.prototype.update;
  Canvas.prototype.update = function (...d) {
    const upd = this._update(...d);
    const plr = this.manager?.getLocalPlayer();
    if (plr?.alive) {
      const camPos = new Vec2(this.cam.x, this.cam.y);
      const plrPos = camPos.subtract(new Vec2(plr.p.x, plr.p.y).abs(), true);
      const bodies = Object.values(this.manager.bodies).filter(
        (b: any) => b.g?.tx && b.p?.sh?.length
      );
      const segs: Segment[] = [];
      bodies.forEach(
        (b: {
          bounds: { x: number; y: number };
          p: {
            sh: { o?: { x: number; y: number }; v?: { x: number; y: number }[] }[];
            x: number;
            y: number;
          };
        }) => {
          const offset = new Vec2(b.p.x, b.p.y);
          b.p.sh.forEach((sh) => {
            if (!sh.o || !sh.v?.length) return;
            [...sh.v, sh.v[0]].reduce((v, s2) => {
              const s1 = v || sh.v[sh.v.length - 1];
              const seg = new Segment(
                new Vec2(s1.x, s1.y).add(sh.o.x, sh.o.y).add(offset).subtract(camPos),
                new Vec2(s2.x, s2.y).add(sh.o.x, sh.o.y).add(offset).subtract(camPos)
              );
              if (
                (seg.p1.x >= 0 || seg.p2.x >= 0) &&
                (seg.p1.y >= 0 || seg.p2.y >= 0) &&
                (seg.p1.x <= App.ClientWidth || seg.p2.x <= App.ClientWidth) &&
                (seg.p1.y <= App.ClientHeight || seg.p2.y <= App.ClientHeight)
              )
                segs.push(seg);
              return s2;
            });
          });
        }
      );
      const visibility = calculateVisibility(
        plrPos,
        loadMap(new Rectangle(0, 0, App.ClientWidth, App.ClientHeight), segs, plrPos)
      );
      const polyContainer: Graphics =
        this.polyContainer || (this.polyContainer = new PIXI.Graphics());
      if (!polyContainer.parent) app.game.hud.addChildAt(polyContainer, 0);
      polyContainer.clear();
      polyContainer.beginFill(config.Colors.red, 1);
      visibility.forEach((v) =>
        polyContainer.drawPolygon([plrPos.toJSON(), ...v.map((vv) => vv.toJSON())])
      );
      console.log(visibility);
      polyContainer.drawPolygon([
        { x: 0, y: 0 },
        { x: 10, y: 10 },
        { x: 300, y: 50 },
      ]);
      polyContainer.endFill();
    }
    return upd;
  };
}
