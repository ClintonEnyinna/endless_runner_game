import 'phaser';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import AboutScene from './Scenes/AboutScene';
import ScoreScene from './Scenes/ScoreScene';
import RestartScene from './Scenes/RestartScene';
import WelcomeScene from './Scenes/WelcomeScene';

import Model from './Model';

// eslint-disable-next-line no-undef
export default class Game extends Phaser.Game {
  constructor() {
    super(config);

    const model = new Model();
    this.globals = { model, bgMusic: null };

    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Welcome', WelcomeScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('About', AboutScene);
    this.scene.add('Score', ScoreScene);
    this.scene.add('Restart', RestartScene);
    this.scene.add('Game', GameScene);
    this.scene.start('Boot');
  }
}

window.onload = () => {
  window.game = new Game();
};
