import 'phaser';
import Button from '../Objects/Button';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Restart');
  }

  create() {
    this.model = this.sys.game.globals.model;

    this.title = this.add.text(400, 100, 'Game Over', { fontSize: 40 });
    this.title.setOrigin(0.5, 0.5);

    this.player = this.add.text(400, 190, "what's your name?", {
      fontSize: 24,
    });
    this.player.setOrigin(0.5, 0.5);

    this.menuButton = new Button(
      this,
      400,
      500,
      'normal',
      'hover',
      'click',
      'Menu',
      'Title'
    );
  }
}
