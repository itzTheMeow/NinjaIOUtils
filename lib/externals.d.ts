/* Shims for the third-party globals bundled into lib/latest.js that have no
 * matching type package. Managed by generate-types.ts - only names the game
 * code references that we do not type via pixi.js/howler live here. */

declare var LZString: any;
declare var MobileDetect: any;
declare var Flatbush: any;
declare var Box2D: any;
