import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    this.model = this.sys.game.globals.model;

    // Game
    this.gameButton = new Button(
      this,
      config.width / 2,
      config.height / 2 - 120,
      'normal',
      'hover',
      'click',
      'Play',
      'Game'
    );

    // Options
    this.optionsButton = new Button(
      this,
      config.width / 2,
      config.height / 2,
      'normal',
      'hover',
      'click',
      'Score',
      'Score'
    );

    // Credits
    this.creditsButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 120,
      'normal',
      'hover',
      'click',
      'About',
      'About'
    );

    this.soundButton = this.add.image(750, 50, 'sound_normal');
    this.soundButton.setScale(0.3);
    this.soundButton.setInteractive();

    this.soundButton.on(
      'pointerover',
      function () {
        this.soundButton.setTexture('sound_hover');
      }.bind(this)
    );

    this.soundButton.on(
      'pointerout',
      function () {
        if (this.model.musicOn === false) {
          this.soundButton.setTexture('sound_locked');
        } else {
          this.soundButton.setTexture('sound_normal');
        }
      }.bind(this)
    );

    this.soundButton.on(
      'pointerdown',
      function () {
        this.soundButton.setTexture('sound_click');
        this.model.musicOn = !this.model.musicOn;
        setTimeout(() => {
          this.updateAudio();
        }, 100);
      }.bind(this)
    );

    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.soundButton.setTexture('sound_locked');
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    } else {
      this.soundButton.setTexture('sound_normal');
      if (this.model.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        this.model.bgMusicPlaying = true;
      }
    }
  }
}
