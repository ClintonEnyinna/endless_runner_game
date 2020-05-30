import 'phaser';
import Button from '../Objects/Button';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Score');
  }

  create() {
    this.add.image(400, 300, 'cover').setScale(3);
    this.model = this.sys.game.globals.model;

    this.title = this.add.text(400, 70, 'High Scores', {
      fontSize: 40,
      fill: '#000',
    });
    this.title.setOrigin(0.5, 0.5);

    this.player = this.add.text(200, 140, 'Player', {
      fontSize: 24,
      fill: '#000',
    });
    this.player.setOrigin(0.5, 0.5);

    this.point = this.add.text(600, 140, 'Score', {
      fontSize: 24,
      fill: '#000',
    });
    this.point.setOrigin(0.5, 0.5);

    this.highScores = this.model.getGameBoard();
    this.addHighScores([200, 250, 300, 350, 400]);

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

  addHighScores(arg) {
    let pos = arg;
    this.highScores.forEach((item, index) => {
      this.add
        .text(600, pos[index], item.score, {
          fontSize: 24,
          stroke: '#000',
          fill: '#43d637',
          strokeThickness: 3,
          stroke: '#000',
        })
        .setOrigin(0.5, 0.5);

      this.add
        .text(200, pos[index], item.user, {
          fontSize: 24,
          stroke: '#000',
          fill: '#43d637',
          strokeThickness: 3,
          stroke: '#000',
        })
        .setOrigin(0.5, 0.5);
    });
  }
}
