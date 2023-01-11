export function clickContainer(container: any) {
  container._events.mousedown.forEach((f) => f.fn());
}
