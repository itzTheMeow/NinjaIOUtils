import { Segment } from "./segment";
import { Rectangle } from "./rectangle";
import Vec2 from "vec2";
import { EndPoint } from "./Polygon";

const calculateEndPointAngles = (lightSource: Vec2, segment: Segment) => {
  const { x, y } = lightSource;
  const dx = 0.5 * (segment.p1.x + segment.p2.x) - x;
  const dy = 0.5 * (segment.p1.y + segment.p2.y) - y;

  segment.d = dx * dx + dy * dy;
  segment.p1.angle = Math.atan2(segment.p1.y - y, segment.p1.x - x);
  segment.p2.angle = Math.atan2(segment.p2.y - y, segment.p2.x - x);
};

const setSegmentBeginning = (segment: Segment) => {
  let dAngle = segment.p2.angle - segment.p1.angle;

  if (dAngle <= -Math.PI) {
    dAngle += 2 * Math.PI;
  }
  if (dAngle > Math.PI) {
    dAngle -= 2 * Math.PI;
  }

  segment.p1.beginsSegment = dAngle > 0;
  segment.p2.beginsSegment = !segment.p1.beginsSegment;
};

const processSegments = (lightSource: Vec2, segments: Segment[]) => {
  for (const segment of segments) {
    calculateEndPointAngles(lightSource, segment);
    setSegmentBeginning(segment);
  }

  return segments;
};

export function loadMap(room: Rectangle, walls: Segment[], lightSource: Vec2): EndPoint[] {
  const segments: Segment[] = [];
  for (const segment of room.getCornerSegments()) {
    segments.push(segment);
  }
  for (const segment of walls) {
    segments.push(segment);
  }
  const endPoints: EndPoint[] = [];
  for (const segment of processSegments(lightSource, segments)) {
    endPoints.push(segment.p1, segment.p2);
  }
  return endPoints;
}
