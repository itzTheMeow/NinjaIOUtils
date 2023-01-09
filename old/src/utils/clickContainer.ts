export default function clickContainer(container: Container) {
  container._events.mousedown.forEach((f) => f.fn());
}
