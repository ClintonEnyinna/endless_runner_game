// eslint-disable-next-line import/no-unresolved
import 'phaser';
import Obstacle from '../Objects/Obstacle';
import { addScoreData, getScoreData } from '../Leadership';

// global game options
const gameOptions = {
  jumpForce: 400,
  boxSpeed: 350,
  jumps: 2,
  counter: 0,
  boxTiming: [300, 800],
};

// eslint-disable-next-line no-undef
export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.walkMusicOn = false;
  }

  create() {
    this.model = this.sys.game.globals.model;
    this.gameEnded = false;
    this.sliding = false;
    this.value = 0;
    this.sys.game.globals.bgMusic.setVolume(0.1);

    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.sys.game.globals.bgMusic.play();
      this.model.bgMusicPlaying = true;
    }
    // group with all active platforms.
    this.ground = this.physics.add.sprite(400, 585, 'platform').setScale(10, 1);
    this.ground.setImmovable(true);

    this.tileSprite = this.add.tileSprite(400, 300, 800, 600, 'city');

    this.score = this.add.text(10, 10, 'Score: 0', {
      fontSize: '30px',
      fill: '#fff',
    });
    // number of consecutive jumps made by the player
    this.playerJumps = 0;

    this.animation = this.anims.create({
      key: 'run',
      frames: [
        { key: 'walk0' },
        { key: 'walk1' },
        { key: 'walk2' },
        { key: 'walk3' },
        { key: 'walk4' },
        { key: 'walk5' },
        { key: 'walk6' },
        { key: 'walk7' },
        { key: 'walk8' },
        { key: 'walk9' },
      ],
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: 'slide',
      frames: [
        { key: 'slide0' },
        { key: 'slide1' },
        { key: 'slide2' },
        { key: 'slide3' },
        { key: 'slide4' },
      ],
      frameRate: 15,
      repeat: 1,
    });

    this.birdAnimation = this.anims.create({
      key: 'fly',
      frames: [
        { key: 'fly0' },
        { key: 'fly1' },
        { key: 'fly2' },
        { key: 'fly3' },
      ],
      frameRate: 15,
      repeat: -1,
    });

    // adding the player;
    this.player = this.physics.add.sprite(100, 0, 'walk0');
    this.player.setScale(0.25);
    this.player.setGravityY(650);
    this.player.setCollideWorldBounds(true);

    this.walkMusic = this.sound.add('walkMusic', { volume: 0.5, loop: true });

    this.jumpMusic = this.sound.add('jumpMusic', { volume: 0.5, repeat: 1 });

    this.player.anims.play('run');

    // adding obstacle
    this.obstacle = new Obstacle(this, 1000, 200, 'box', 0.8, 500);
    this.birdObstacle = new Obstacle(this, 1000, 450, 'fly0', 0.07, 0);
    this.birdObstacle.play('fly');
    this.birdObstacle.setVelocityX(-250);

    // setting collisions between the player and the platform group
    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.obstacle, this.ground);
    this.physics.add.collider(
      this.player,
      this.obstacle,
      this.gameOver,
      null,
      this,
    );

    this.physics.add.collider(
      this.player,
      this.birdObstacle,
      this.gameOver,
      null,
      this,
    );

    // checking for input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.on('keydown-UP', this.jump, this);

    this.timedEvent = this.time.addEvent({
      delay: 8000,
      callback: this.onEvent,
      callbackScope: this,
      loop: true,
    });

    this.birdTimedEvent = this.time.addEvent({
      delay: 5000,
      callback: this.onBirdEvent,
      callbackScope: this,
      loop: true,
    });
  }

  onBirdEvent() {
    this.birdObstacle = new Obstacle(this, 1000, 450, 'fly0', 0.07, 0);
    this.birdObstacle.play('fly');
    this.birdObstacle.setVelocityX(-300);
    this.physics.add.collider(this.birdObstacle, this.ground);
    this.physics.add.collider(
      this.player,
      this.birdObstacle,
      this.gameOver,
      null,
      this,
    );

    // eslint-disable-next-line no-undef
    const delay = Phaser.Math.Between(800, 1200) * 10;

    this.birdTimedEvent.delay = delay;
  }

  onEvent() {
    this.obstacle = new Obstacle(this, 1000, 200, 'box', 0.8, 500);
    this.physics.add.collider(this.obstacle, this.ground);
    this.physics.add.collider(
      this.player,
      this.obstacle,
      this.gameOver,
      null,
      this,
    );

    // eslint-disable-next-line no-undef
    const delay = Phaser.Math.Between(gameOptions.boxTiming[0], gameOptions.boxTiming[1])
      * 10;

    this.timedEvent.delay = delay;
    gameOptions.counter += 1;

    if (gameOptions.counter > 20) {
      gameOptions.boxTiming[0] = 100;
      gameOptions.boxTiming[1] = 300;
      gameOptions.boxSpeed = 450;
    }
    if (gameOptions.counter > 30) {
      gameOptions.boxSpeed = 500;
    }
    if (gameOptions.counter % 17 === 0) {
      this.timedEvent.delay = 6000;
    }
  }

  jump() {
    this.walkMusic.pause();
    this.jumpMusic.play();

    if (
      this.player.body.touching.down
      || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps)
    ) {
      if (this.player.body.touching.down) {
        this.playerJumps = 0;
      }

      this.animation.pause();
      this.player.setTexture('jump');
      this.player.setVelocityY(gameOptions.jumpForce * -1);
      this.playerJumps += 1;
    }
  }

  update() {
    this.tileSprite.tilePositionX += 3;

    if (
      this.player.body.touching.down
      && this.walkMusic.isPlaying === false
      && !this.gameEnded
    ) {
      this.walkMusic.play();
    }

    if (
      this.cursors.down.isDown
      && !this.sliding
      && this.player.body.touching.down
    ) {
      this.sliding = true;
      this.player.anims.play('slide');
      this.walkMusic.pause();
    } else if (this.cursors.down.isUp && this.sliding) {
      this.sliding = false;
      this.player.setVelocityY(-130);
      this.player.anims.play('run');
    }

    if (
      this.player.body.touching.down
      && this.animation.paused
      && !this.sliding
    ) {
      this.animation.resume();
      this.jumpMusic.pause();

      this.value += 100;
      this.score.setText(`Score: ${this.value}`);
      this.model.setScore(this.value);
    }

    if (this.obstacle.body) {
      if (this.obstacle.body.touching.down) {
        this.obstacle.setVelocityX(gameOptions.boxSpeed * -1);
      }
    }
  }

  async gameOver() {
    this.gameEnded = true;

    gameOptions.boxTiming[0] = 200;
    gameOptions.boxTiming[1] = 800;
    gameOptions.boxSpeed = 350;
    gameOptions.counter = 0;

    this.walkMusic.pause();
    this.physics.pause();
    this.tileSprite.destroy();
    this.player.setTint(0xff0000);
    this.animation.destroy();
    this.sys.game.globals.bgMusic.pause();
    this.model.bgMusicPlaying = false;

    if (this.model.getName() !== '') {
      await addScoreData({
        user: this.model.getName(),
        score: this.model.getScore(),
      });

      const data = await getScoreData();
      const players = data.result;

      const sortedPlayers = players
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

      this.model.setGameBoard(sortedPlayers);
      this.value = 0;
    }

    this.time.delayedCall(
      2000,
      () => {
        this.sys.game.globals.bgMusic.setVolume(0.5);
        this.scene.start('Restart');
      },
      [],
      this,
    );
  }
}
