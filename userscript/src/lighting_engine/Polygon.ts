import Vec2 from "vec2";

export class EndPoint extends Vec2 {
  public beginsSegment?: any;
  public segment?: any;
  public angle: number;

  constructor(public x: number, public y: number) {
    super(x, y);
  }
  public move(x: number, y: number) {
    const p = new EndPoint(this.x + x, this.y + y);
    p.beginsSegment = this.beginsSegment;
    p.segment = this.segment;
    p.angle = this.angle;
    return p;
  }
}

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

export default class Polygon {
  constructor(public segments: Segment[]) {}

  public shift(x: number, y: number) {
    return new Polygon(
      this.segments.map((s) => {
        s = { ...s };
        s.p1 = s.p1.move(x, y);
        s.p2 = s.p2.move(x, y);
        return s;
      })
    );
  }
}
