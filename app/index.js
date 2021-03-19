import Game from './components/game.js';
import { calcDimensions } from './components/helper.js';

const gameScreen = document.getElementById('gameScreen'),
  ctx = gameScreen.getContext('2d'),
  dpi = window.devicePixelRatio;

let gameWidth = calcDimensions().width();
let gameHeight = calcDimensions().height();

const game = new Game(gameWidth, gameHeight);

function gameLoop() {
  fix_dpi();
  game.draw(ctx);
  game.update();
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);

export function fix_dpi() {
  gameWidth = calcDimensions().width() * dpi;
  gameHeight = calcDimensions().height() * dpi;
  gameScreen.setAttribute('width', gameWidth);
  gameScreen.setAttribute('height', gameHeight);
}
