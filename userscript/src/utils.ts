/* Small funtion to test if you are in a game. */
export const inGame = () =>
  app.matchStarted && app.client.socket && app.client.socket.readyState == WebSocket.OPEN;
