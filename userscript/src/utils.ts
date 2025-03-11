import { TextStyle, TextStyleOptions } from "pixi.js";

export function clickContainer(container: any) {
  container._events.mousedown.forEach((f) => f.fn());
}
/**
 * Clones a `TextStyle` and applies `newProps` to it.
 * @param style The original style to clone.
 * @param newProps New properties to set on the cloned style.
 * @returns The new TextStyle instance.
 */
export function cloneTextStyle(style: TextStyle, newProps: Partial<TextStyleOptions>) {
  const newStyle = style.clone();
  Object.keys(newProps).forEach((key) => {
    newStyle[key] = newProps[key];
  });
  return newStyle;
}
