// eslint-disable-next-line import/no-unresolved
import 'phaser';
import Button from '../Objects/Button';

// eslint-disable-next-line no-undef
export default class WelcomeScene extends Phaser.Scene {
  constructor() {
    super('Welcome');
    this.name = '';
  }

  create() {
    this.model = this.sys.game.globals.model;

    this.add.image(400, 300, 'cover').setScale(3);
    this.title = this.add.text(400, 100, 'Welcome to Endless Runner', {
      fontSize: 40,
      fill: '#000',
    });

    this.title.setOrigin(0.5, 0.5);

    this.text = this.add.text(400, 190, "What's your name?", {
      fontSize: 24,
      fill: '#000',
    });
    this.text.setOrigin(0.5, 0.5);

    this.playerName = this.add.text(400, 300, '', {
      fontSize: 36,
      stroke: '#000',
      fill: '#43d637',
      strokeThickness: 3,
    });
    this.playerName.setOrigin(0.5, 0.5);

    this.input.keyboard.on('keyup', (event) => {
      if (
        (event.keyCode >= 48 && event.keyCode <= 90)
        || event.keyCode === 32
      ) {
        this.name += event.key;
      }

      if (event.key === 'Backspace') {
        this.name = this.name.slice(0, this.name.length - 1);
      }
      this.playerName.setText(this.name);
      this.model.setName(this.name);
    });

    this.add.line(400, 330, 0, 0, 240, 0, 0x000);

    this.nextButton = new Button(
      this,
      400,
      500,
      'normal',
      'hover',
      'click',
      'Continue',
      'Title',
    );
  }
}
