import Vec2 from "vec2";
import { EndPoint } from "./Polygon";

export class Segment {
  public p1: EndPoint;
  public p2: EndPoint;
  public d: number = 0;

  constructor(p1: Vec2, p2: Vec2) {
    this.p1 = new EndPoint(p1.x, p1.y);
    this.p2 = new EndPoint(p2.x, p2.y);
    this.p1.segment = this;
    this.p2.segment = this;
  }
}
