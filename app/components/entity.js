export default class Entity {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.height = 20;
    this.width = 100;
    this.position = {
      x: 0,
      y: 0,
    };

    this.speed = 0;
    this.maxSpeed = 10;
  }

  draw(ctx) {
    const gradient = ctx.createLinearGradient(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    gradient.addColorStop(0, 'hsla(208, 100%, 29%, 80%');
    gradient.addColorStop(1, 'hsla(234, 100%, 8%, 80%');
    ctx.fillStyle = gradient;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }
  moveRight() {
    this.speed = this.maxSpeed;
  }

  update() {
    this.position.x += this.speed;
    if (this.position.x <= 0) this.position.x = 0;
    if (this.position.x >= this.gameWidth - this.width)
      this.position.x = this.gameWidth - this.width;
  }

  stop() {
    this.speed = 0;
  }
}
