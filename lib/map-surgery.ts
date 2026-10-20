/** Source-map surgery primitives for the lib typings pipeline.
 *
 * Every text rewrite the generator performs is recorded as a "pass"
 * (non-overlapping replaced spans, recorded in the pass's input-text
 * coordinates). Passes compose char-offset mappings in BOTH directions:
 *   latest.js offset = gameStart + reverse(chunkPasses)(gameOffset - headerLen)
 *   finalDts offset  = forward(dtsPasses)(prePatchDts offset)
 * The declaration map embeds tsc's mappings in compiled-chunk /
 * unpatched-dts coordinates; the generator rewrites them onto the patched dts
 * so Zed (vtsls/tsserver) can navigate declarations back into the game code.
 */

export interface Span {
  start: number;
  end: number;
  replacement: string;
}

/** Precomputed pass item: span start, old length, new length, output delta. */
export interface PassItem {
  s: number;
  o: number;
  n: number;
  d: number;
}

export interface Pass {
  items: PassItem[];
  forward(p: number): number;
  reverse(o: number): number;
}

/** A pass either carries raw spans or precomputed {s, o, n} items. */
export type PassInput = Span | { s: number; o: number; n: number };

export function makePass(spans: PassInput[]): Pass {
  // accepts {start, end, replacement} spans or precomputed {s, o, n} items
  const items: PassItem[] = spans
    .map((span) =>
      "o" in span
        ? { s: span.s, o: span.o, n: span.n, d: 0 }
        : {
            s: span.start,
            o: span.end - span.start,
            n: span.replacement.length,
            d: 0,
          },
    )
    .sort((a, b) => a.s - b.s);
  let delta = 0;
  for (const item of items) {
    item.d = delta; // output shift of the text before this span
    delta += item.n - item.o;
  }
  // greatest index with keyOf(items[index]) <= p
  const lastAtMost = (p: number, keyOf: (item: PassItem) => number): number => {
    let lo = 0;
    let hi = items.length - 1;
    let found = -1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (keyOf(items[mid]) <= p) {
        found = mid;
        lo = mid + 1;
      } else hi = mid - 1;
    }
    return found;
  };
  return {
    items,
    forward(p) {
      const index = lastAtMost(p, (item) => item.s);
      if (index < 0) return p;
      const item = items[index];
      if (p < item.s + item.o)
        return item.s + item.d + Math.min(p - item.s, item.n);
      return p + item.d + (item.n - item.o);
    },
    reverse(o) {
      const index = lastAtMost(o, (item) => item.s + item.d);
      if (index < 0) return o;
      const item = items[index];
      const outStart = item.s + item.d;
      if (o < outStart + item.n) return item.s + Math.min(o - outStart, item.o);
      return o - (item.d + item.n - item.o);
    },
  };
}

/** Compose passes applied in sequence: text0 -pass0-> text1 -pass1-> ... */
export function composePasses(passes: Pass[]): {
  forward(p: number): number;
  reverse(p: number): number;
} {
  return {
    forward(p) {
      for (const pass of passes) p = pass.forward(p);
      return p;
    },
    reverse(p) {
      for (let index = passes.length - 1; index >= 0; index--)
        p = passes[index].reverse(p);
      return p;
    },
  };
}

export function applySpans(
  chunk: string,
  spans: Span[],
): { result: string; pass: Pass } {
  if (spans.length === 0) return { result: chunk, pass: makePass([]) };
  let result = "";
  let cursor = 0;
  const applied: Span[] = [];
  for (const span of spans.slice().sort((a, b) => a.start - b.start)) {
    if (span.start < cursor) continue;
    result += chunk.slice(cursor, span.start) + span.replacement;
    cursor = span.end;
    applied.push(span);
  }
  result += chunk.slice(cursor);
  return { result, pass: makePass(applied) };
}

/** Records every textual edit as a pass, in application order. `replaceAll`
 *  records ONE pass for the whole sweep (all matches share the same input
 *  text); individual ranged edits each record a single-span pass. */
export class EditTracker {
  text: string;
  passes: Pass[] = [];

  constructor(text: string) {
    this.text = text;
  }

  replaceAll(
    pattern: RegExp,
    buildReplacement: (match: RegExpMatchArray) => string,
  ): void {
    const flags = pattern.flags.includes("g")
      ? pattern.flags
      : pattern.flags + "g";
    const matches = [...this.text.matchAll(new RegExp(pattern.source, flags))];
    if (matches.length === 0) return;
    this.replaceWith(
      matches.map((match) => ({
        start: match.index ?? 0,
        end: (match.index ?? 0) + match[0].length,
        replacement: buildReplacement(match),
      })),
    );
  }

  replaceRange(start: number, end: number, replacement: string): void {
    this.replaceWith([{ start, end, replacement }]);
  }

  replaceWith(spans: Span[]): void {
    const { result, pass } = applySpans(this.text, spans);
    this.text = result;
    this.passes.push(pass);
  }
}

export function lineStarts(text: string): number[] {
  const starts = [0];
  for (let index = 0; index < text.length; index++)
    if (text.charCodeAt(index) === 10) starts.push(index + 1);
  return starts;
}

export interface LinePos {
  line: number;
  column: number;
}

export function offsetToPos(starts: number[], offset: number): LinePos {
  let low = 0;
  let high = starts.length - 1;
  while (low < high) {
    const mid = (low + high + 1) >> 1;
    if (starts[mid] <= offset) low = mid;
    else high = mid - 1;
  }
  return { line: low, column: offset - starts[low] };
}

export function posToOffset(
  starts: number[],
  line: number,
  column: number,
): number {
  if (starts.length === 0) return 0;
  const clamped = Math.min(Math.max(line, 0), starts.length - 1);
  return starts[clamped] + Math.max(column, 0);
}
