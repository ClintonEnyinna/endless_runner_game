import 'phaser';
import Button from '../Objects/Button';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Restart');
  }

  create() {
    this.model = this.sys.game.globals.model;

    this.title = this.add.text(400, 100, 'Game Over!', { fontSize: 40 });
    this.title.setOrigin(0.5, 0.5);

    this.text = this.add.text(400, 190, 'Your score is: ', { fontSize: 24 });
    this.text.setOrigin(0.5, 0.5);

    this.score = this.add.text(400, 290, '', { fontSize: 36 });
    this.score.setText(this.model.getScore());
    this.score.setOrigin(0.5, 0.5);

    this.menuButton = new Button(
      this,
      250,
      500,
      'normal',
      'hover',
      'click',
      'Again?',
      'Game'
    );

    this.exitButton = new Button(
      this,
      550,
      500,
      'normal',
      'hover',
      'click',
      'Exit',
      'Title'
    );
  }
}
