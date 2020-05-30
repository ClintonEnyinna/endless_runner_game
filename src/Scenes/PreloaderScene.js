import 'phaser';
import { getScoreData } from '../Leadership';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    this.model = this.sys.game.globals.model;

    // add logo image
    this.add.image(400, 300, 'logo');

    // display progress bar
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 500, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height - 120,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height - 75,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height - 35,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 510, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });

    // remove progress bar when complete
    this.load.on(
      'complete',
      async function () {
        const data = await getScoreData();
        const players = data.result;

        const sortedPlayers = players
          .sort((a, b) => b.score - a.score)
          .slice(0, 5);

        this.model.setGameBoard(sortedPlayers);

        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        assetText.destroy();
        this.ready();
      }.bind(this)
    );

    this.timedEvent = this.time.delayedCall(2000, this.ready, [], this);

    // load assets needed in our game
    this.load.image('walk0', 'assets/player/Run__000.png');
    this.load.image('walk1', 'assets/player/Run__001.png');
    this.load.image('walk2', 'assets/player/Run__002.png');
    this.load.image('walk3', 'assets/player/Run__003.png');
    this.load.image('walk4', 'assets/player/Run__004.png');
    this.load.image('walk5', 'assets/player/Run__005.png');
    this.load.image('walk6', 'assets/player/Run__006.png');
    this.load.image('walk7', 'assets/player/Run__007.png');
    this.load.image('walk8', 'assets/player/Run__008.png');
    this.load.image('walk9', 'assets/player/Run__009.png');
    this.load.image('jump', 'assets/player/Jump__002.png');
    this.load.image('city', 'assets/bg.jpg');
    this.load.image('platform', 'assets/platform.png');
    this.load.image('normal', 'assets/ui/Button_05.png');
    this.load.image('hover', 'assets/ui/Button_06.png');
    this.load.image('click', 'assets/ui/Button_07.png');
    this.load.image('sound_normal', 'assets/ui/Button_158.png');
    this.load.image('sound_hover', 'assets/ui/Button_159.png');
    this.load.image('sound_click', 'assets/ui/Button_160.png');
    this.load.image('sound_locked', 'assets/ui/Button_161.png');
    this.load.image('box', 'assets/box.png');
    this.load.image('checkedBox', 'assets/ui/blue_boxCheckmark.png');
    this.load.audio('bgMusic', ['assets/Caketown.mp3']);
    this.load.audio('walkMusic', ['assets/run.m4a']);
    this.load.audio('jumpMusic', ['assets/Zoops32.mp3']);
    this.load.image('window', 'assets/Windows_17.png');
    this.load.image('cover', 'assets/Windows_38.png');
  }

  ready() {
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('Welcome');
    }
  }
}
