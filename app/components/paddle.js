import Entity from './entity.js';

export default class Paddle extends Entity {
  constructor(game) {
    super(game);
    this.height = 20;
    this.width = 100;
    this.position = {
      x: this.gameWidth / 2 - this.width / 2,
      y: this.gameHeight - this.height - 50,
    };
  }
}
