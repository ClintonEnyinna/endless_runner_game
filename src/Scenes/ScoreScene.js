import 'phaser';
import Button from '../Objects/Button';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Score');
  }

  create() {
    this.model = this.sys.game.globals.model;

    this.title = this.add.text(400, 100, 'High Scores', { fontSize: 40 });
    this.title.setOrigin(0.5, 0.5);

    this.player = this.add.text(200, 190, 'Player', { fontSize: 24 });
    this.player.setOrigin(0.5, 0.5);

    this.point = this.add.text(600, 190, 'Score', { fontSize: 24 });
    this.point.setOrigin(0.5, 0.5);

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
