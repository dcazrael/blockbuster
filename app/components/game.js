import Ball from './ball.js';
import InputHandler from './input.js';
import { buildLevel, levels } from './levels.js';
import Paddle from './paddle.js';

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4,
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = GAMESTATE.MENU;

    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.blocks = [];
    this.gameObjects = [];

    this.lives = 3;

    this.levels = levels;
    this.currentLevel = 1;

    this.points = 0;

    new InputHandler(this.paddle, this.ball, this);
  }

  start() {
    if (
      this.gamestate !== GAMESTATE.MENU &&
      this.gamestate !== GAMESTATE.NEWLEVEL
    )
      return;

    this.blocks = buildLevel(this, this.levels[this.currentLevel]);
    this.gameObjects = [this.ball, this.paddle];

    this.gamestate = GAMESTATE.RUNNING;
  }

  update() {
    if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;

    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER
    )
      return;

    if (this.blocks.length === 0) {
      this.currentLevel++;
      this.gamestate = GAMESTATE.NEWLEVEL;
      this.ball.reset();
      this.start();
    }

    [...this.gameObjects, ...this.blocks].forEach((object) => object.update());

    this.blocks = this.blocks.filter((block) => !block.markedForDeletion);
  }

  draw(ctx) {
    this.background(ctx);
    this.statusBar(ctx);

    [...this.gameObjects, ...this.blocks].forEach((object) => object.draw(ctx));

    if (this.gamestate === GAMESTATE.PAUSED) {
      this.screenOverlay(ctx, 'PAUSED');
    }

    if (this.gamestate === GAMESTATE.MENU) {
      this.screenOverlay(ctx, 'Press SPACEBAR to start the game');
    }

    if (this.gamestate === GAMESTATE.GAMEOVER) {
      this.screenOverlay(ctx, 'GAMEOVER');
    }
  }

  togglePause() {
    if (this.gamestate === GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }

  background(ctx) {
    const gradient = ctx.createLinearGradient(
      0,
      0,
      this.gameWidth,
      this.gameHeight
    );
    gradient.addColorStop(0, 'hsla(184, 53%, 54%, 50%');
    gradient.addColorStop(0.5, 'hsla(284, 48%, 65%, 50%');
    gradient.addColorStop(1, 'hsla(29, 99%, 68%, 50%');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
  }

  screenOverlay(ctx, text) {
    ctx.rect(0, 0, this.gameWidth, this.gameHeight);
    ctx.fillStyle = 'hsla(0, 0%, 0%, 50%';
    ctx.fill();

    ctx.font = '30px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(text, this.gameWidth / 2, this.gameHeight / 2);
  }

  statusBar(ctx) {
    ctx.rect(0, this.gameHeight - 30, this.gameWidth, 30);
    ctx.fillStyle = 'hsla(0, 0%, 0%, 90%';
    ctx.fill();

    ctx.font = '14px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(
      `Lives:${this.lives}`,
      this.gameWidth / 4,
      this.gameHeight - 10
    );
    ctx.fillText(
      `Level:${this.currentLevel}`,
      (this.gameWidth / 4) * 2,
      this.gameHeight - 10
    );
    ctx.fillText(
      `Points:${this.points}`,
      (this.gameWidth / 4) * 3,
      this.gameHeight - 10
    );
  }
}
