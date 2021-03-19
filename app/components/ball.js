import { detectCollision } from './collisionDetection.js';
import { colors } from './colors.js';
import Entity from './entity.js';

export default class Ball extends Entity {
  constructor(game) {
    super(game);
    this.size = 24;
    this.radius = this.size / 2;
    this.game = game;
    this.reset();
    this.collisions = 0;
    this.colors = colors;
    this.randNum = Math.floor(Math.random() * 10) + 1;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = `hsla(${this.colors[this.randNum]}, 100%, 60%, 50%)`;
    ctx.strokeStyle = `hsla(${this.colors[this.randNum]}, 100%, 30%, 80%)`;
    ctx.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    ctx.fill();
    ctx.stroke();
  }

  startBall() {
    if (this.ballStarted) return;

    this.ballStarted = true;
    this.speed = {
      x: 4,
      y: -4,
    };
  }

  reset() {
    this.position = {
      x: this.game.paddle.position.x + this.game.paddle.width / 2,
      y: this.game.paddle.position.y - this.radius,
    };
    this.speed = {
      x: 0,
      y: 0,
    };
    this.ballStarted = false;
  }

  update() {
    if (!this.ballStarted) {
      this.position.x =
        this.game.paddle.position.x + this.game.paddle.width / 2;
      return;
    }
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // collision with side walls
    if (
      this.position.x <= 0 + this.radius ||
      this.position.x >= this.gameWidth - this.radius
    ) {
      this.speed.x *= -1;
    }

    // collision with top wall
    if (this.position.y <= 0 + this.radius) this.speed.y *= -1;

    // bottom wall
    if (this.position.y >= this.gameHeight - this.radius - 15) {
      this.game.lives--;
      this.reset();
    }

    let collision = detectCollision(this, this.game.paddle);
    if (this.collisions >= 1) {
      this.collisions -= 1;
    } else {
      if (collision) {
        if (collision === 'top') {
          this.speed.y *= -1;
        } else if (collision === 'left') {
          this.speed.y *= -1;
          this.speed.x *= -1;
        } else if (collision === 'right') {
          this.speed.y *= -1;
          this.speed.x *= -1;
        }
        this.collisions = 50;
      }
    }
  }
}
