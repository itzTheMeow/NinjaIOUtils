import { lineIntersection } from "./line-intersection";
import { endpointCompare } from "./endpoint-compare";
import { segmentInFrontOf } from "./segment-in-front-of";
import { Segment } from "./segment";
import Vec2 from "vec2";
import { EndPoint } from "./Polygon";

function getTrianglePoints(origin: Vec2, angle1: number, angle2: number, segment: Segment): Vec2[] {
  const p1 = origin;
  const p2 = new Vec2(origin.x + Math.cos(angle1), origin.y + Math.sin(angle1));
  const p3 = new Vec2(0, 0);
  const p4 = new Vec2(0, 0);

  if (segment) {
    p3.set(segment.p1.x, segment.p1.y, true);
    p4.set(segment.p2.x, segment.p2.y, true);
  } else {
    p3.set(origin.x + Math.cos(angle1) * 200, origin.y + Math.sin(angle1) * 200, true);
    p4.set(origin.x + Math.cos(angle2) * 200, origin.y + Math.sin(angle2) * 200, true);
  }

  const pBegin = lineIntersection(p3, p4, p1, p2);
  p2.set(origin.x + Math.cos(angle2), origin.y + Math.sin(angle2), true);
  const pEnd = lineIntersection(p3, p4, p1, p2);

  return [pBegin, pEnd];
}

export function calculateVisibility(origin: Vec2, endpoints: EndPoint[]): Vec2[][] {
  const openSegments = [];
  const output = [];
  let beginAngle = 0;

  endpoints.sort(endpointCompare);

  for (let pass = 0; pass < 2; pass += 1) {
    for (const endpoint of endpoints) {
      const openSegment = openSegments[0];

      if (endpoint.beginsSegment) {
        let index = 0;
        let segment = openSegments[index];
        while (segment && segmentInFrontOf(endpoint.segment, segment, origin)) {
          index += 1;
          segment = openSegments[index];
        }

        if (!segment) {
          openSegments.push(endpoint.segment);
        } else {
          openSegments.splice(index, 0, endpoint.segment);
        }
      } else {
        const index = openSegments.indexOf(endpoint.segment);
        if (index > -1) {
          openSegments.splice(index, 1);
        }
      }

      if (openSegment !== openSegments[0]) {
        if (pass === 1) {
          const trianglePoints = getTrianglePoints(origin, beginAngle, endpoint.angle, openSegment);
          output.push(trianglePoints);
        }
        beginAngle = endpoint.angle;
      }
    }
  }

  return output;
}
