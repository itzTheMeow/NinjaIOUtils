export const XMLHttpRequest = window.XMLHttpRequest as any as typeof window.XMLHttpRequest & {
  prototype: {
    _open: typeof window.XMLHttpRequest["prototype"]["open"];
  };
};
