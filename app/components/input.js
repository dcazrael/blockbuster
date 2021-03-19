export default class InputHandler {
  constructor(paddle, ball, game) {
    this.game = game;
    this.startMovement(paddle);
    this.stopMovement(paddle);
    this.startBall(ball);
  }

  startMovement(paddle) {
    addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          paddle.moveLeft();
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          paddle.moveRight();
          break;
        case 'Escape':
          this.game.togglePause();
        case ' ':
          this.game.start();
          break;
        default:
          break;
      }
    });
  }

  stopMovement(paddle) {
    addEventListener('keyup', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (paddle.speed < 0) {
            paddle.stop();
          }
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (paddle.speed > 0) {
            paddle.stop();
          }
          break;
        default:
          break;
      }
    });
  }

  startBall(ball) {
    addEventListener('keypress', (e) => {
      e.preventDefault();
      console.log(e.key);
      switch (e.key) {
        case ' ':
          ball.startBall();
          break;
        default:
          break;
      }
    });
  }
}
