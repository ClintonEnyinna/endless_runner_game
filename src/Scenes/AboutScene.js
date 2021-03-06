import 'phaser';
import config from '../Config/config';

// eslint-disable-next-line no-undef
export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('About');
  }

  create() {
    this.add.image(400, 300, 'cover').setScale(3);

    this.creditsText = this.add.text(0, 0, 'Credits', {
      fontSize: '32px',
      fill: '#000',
    });

    this.madeByText = this.add.text(0, 0, 'Created By: Clinton Enyinna', {
      fontSize: '26px',
      fill: '#000',
    });

    this.zone = this.add.zone(
      config.width / 2,
      config.height / 2,
      config.width,
      config.height,
    );

    // eslint-disable-next-line no-undef
    Phaser.Display.Align.In.Center(this.creditsText, this.zone);

    // eslint-disable-next-line no-undef
    Phaser.Display.Align.In.Center(this.madeByText, this.zone);

    this.madeByText.setY(1000);

    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: -100,
      ease: 'Power1',
      duration: 2000,
      delay: 1000,
      onComplete() {
        // eslint-disable-next-line no-unused-expressions
        this.destroy;
      },
    });

    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: -100,
      ease: 'Power1',
      duration: 5000,
      delay: 1000,
      onComplete() {
        // eslint-disable-next-line no-unused-expressions
        this.madeByTween.destroy;
        this.scene.start('Title');
      },
    });
  }
}
