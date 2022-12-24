import Vec2 from "vec2";

export function lineIntersection(point1: Vec2, point2: Vec2, point3: Vec2, point4: Vec2) {
  const s =
    ((point4.x - point3.x) * (point1.y - point3.y) -
      (point4.y - point3.y) * (point1.x - point3.x)) /
    ((point4.y - point3.y) * (point2.x - point1.x) - (point4.x - point3.x) * (point2.y - point1.y));

  return new Vec2(point1.x + s * (point2.x - point1.x), point1.y + s * (point2.y - point1.y));
}
