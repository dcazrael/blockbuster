import { detectCollision } from './collisionDetection.js';
import Entity from './entity.js';

export default class Block extends Entity {
  constructor(game, position, color) {
    super(game);
    this.height = 30;
    this.width = game.gameWidth / 10 - 4;
    this.position = {
      x: position.x + 4,
      y: position.y,
    };
    this.game = game;
    this.game.collisions = 0;
    this.color = color;
    this.markedForDeletion = false;
  }

  draw(ctx) {
    ctx.fillStyle = `hsla(${this.color}, 100%, 60%, 50%)`;
    ctx.strokeStyle = `hsla(${this.color}, 100%, 30%, 80%)`;
    ctx.beginPath();
    ctx.rect(this.position.x, this.position.y, this.width, this.height);
    ctx.fill();
    ctx.stroke();
  }

  update() {
    let collision = detectCollision(this.game.ball, this);
    if (this.game.collisions >= 1) {
      this.game.collisions -= 1;
    } else {
      if (collision) {
        this.game.ball.randNum = Math.floor(Math.random() * 10) + 1;
        this.game.points++;

        if (collision === 'top' || collision === 'bottom') {
          this.game.ball.speed.y *= -1;
        } else {
          this.game.ball.speed.x *= -1;
        }
        this.game.collisions = 1;
        this.markedForDeletion = true;
      }
    }
  }
}
