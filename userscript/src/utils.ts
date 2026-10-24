import type { PIXI } from "lib";
import { UITheme } from "lib";

/** Simulates a click event on a PIXI container. */
export function clickContainer(container: PIXI.Container) {
  // the various events used for container click events
  for (const eventType of [
    "pointertap",
    "pointerdown",
    "mousedown",
    "click",
  ] satisfies (keyof PIXI.FederatedEventEmitterTypes)[])
    (<any>container)._events?.[eventType]?.forEach((f) => f?.fn());
}
/**
 * Clones a `TextStyle` and applies `newProps` to it.
 * @param style The original style to clone.
 * @param newProps New properties to set on the cloned style.
 * @returns The new TextStyle instance.
 */
export function cloneTextStyle(
  style: PIXI.TextStyle,
  newProps: Partial<PIXI.TextStyleOptions>,
) {
  const newStyle = style.clone();
  Object.keys(newProps).forEach((key) => {
    newStyle[key] = newProps[key];
  });
  return newStyle;
}

/** Shorthand function to fetch a blob from a URL. */
export async function fetchBlob(url: string): Promise<Blob> {
  return await (await fetch(url)).blob();
}

/** SHA256 hash a blob or text data to a hex string. */
export async function sha256(data: string | Blob): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    data instanceof Blob
      ? await data.arrayBuffer()
      : new TextEncoder().encode(data),
  );
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Decodes a URL component, falling back to the raw string on malformed data.
 */
export function safeDecode(part: string): string {
  try {
    return decodeURIComponent(part);
  } catch {
    return part;
  }
}

/**
 * Paints a themed list row (striped background, border, accent edge) in the
 * style of the game's clan/player lists. Wire mouseover/mouseout to
 * `paintListRow(gfx, w, h, index, true/false)` to update the hover state.
 */
export function paintListRow(
  gfx: PIXI.Graphics,
  w: number,
  h: number,
  index: number,
  hovered: boolean,
  edgeColor: number,
) {
  const even = index % 2 === 0;
  gfx
    .clear()
    .roundRect(0, 0, w, h, 4)
    .fill({
      color: hovered
        ? even
          ? UITheme.MenuColors.rowHoverEven
          : UITheme.MenuColors.rowHoverOdd
        : even
          ? UITheme.MenuColors.rowEven
          : UITheme.MenuColors.rowOdd,
      alpha: hovered ? 0.8 : 0.78,
    })
    .stroke({
      color: hovered
        ? UITheme.MenuColors.accentStrong
        : UITheme.MenuColors.panelStroke,
      width: 1,
      alpha: hovered ? 0.24 : 0.18,
    })
    .roundRect(0, 0, 5, h, 4)
    .fill({ color: edgeColor, alpha: hovered ? 0.35 : 0.16 });
}
