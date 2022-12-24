import Vec2 from "vec2";
import { Segment } from "./segment";

export class Rectangle {
  constructor(public x: number, public y: number, public width: number, public height: number) {}

  public getCorners() {
    return {
      nw: new Vec2(this.x, this.y),
      sw: new Vec2(this.x, this.y + this.height),
      ne: new Vec2(this.x + this.width, this.y),
      se: new Vec2(this.x + this.width, this.y + this.height),
    };
  }

  public getCornerSegments(): Segment[] {
    const { nw, sw, ne, se } = this.getCorners();
    return [
      new Segment(new Vec2(nw.x, nw.y), new Vec2(ne.x, ne.y)),
      new Segment(new Vec2(nw.x, nw.y), new Vec2(sw.x, sw.y)),
      new Segment(new Vec2(ne.x, ne.y), new Vec2(se.x, se.y)),
      new Segment(new Vec2(sw.x, sw.y), new Vec2(se.x, se.y)),
    ];
  }
}
