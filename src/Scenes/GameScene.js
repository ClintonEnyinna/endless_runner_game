import 'phaser';
import Obstacle from '../Objects/Obstacle';

// global game options
let gameOptions = {
  playerGravity: 900,
  jumpForce: 370,
  boxSpeed: 500,
  playerStartPosition: 200,
  jumps: 2,
  counter: 0,
  boxTiming: [200, 800],
};

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.value = 0;
  }

  preload() {
    // load images
  }

  create() {
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

    // adding the player;
    this.player = this.physics.add.sprite(200, 200, 'walk0');
    this.player.setScale(0.25);
    this.player.setGravityY(600);
    this.player.play('run');

    // adding obstacle
    this.obstacle = new Obstacle(this, 1000, 200, 'box');

    // setting collisions between the player and the platform group
    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.obstacle, this.ground);
    this.physics.add.collider(
      this.player,
      this.obstacle,
      this.gameOver,
      null,
      this
    );

    // checking for input
    this.input.on('pointerdown', this.jump, this);

    this.timedEvent = this.time.addEvent({
      delay: 5000,
      callback: this.onEvent,
      callbackScope: this,
      loop: true,
    });
  }

  onEvent() {
    this.obstacle = new Obstacle(this, 1000, 200, 'box');
    this.physics.add.collider(this.obstacle, this.ground);
    this.physics.add.collider(
      this.player,
      this.obstacle,
      this.gameOver,
      null,
      this
    );

    let delay =
      Phaser.Math.Between(gameOptions.boxTiming[0], gameOptions.boxTiming[1]) *
      10;

    this.timedEvent.delay = delay;
    gameOptions.counter++;

    if (gameOptions.counter > 5) {
      gameOptions.boxTiming[0] = 100;
      gameOptions.boxTiming[1] = 300;
      console.log(gameOptions.boxTiming);
    }
    if (gameOptions.counter > 20) {
      gameOptions.boxSpeed = 600;
    }
    if (gameOptions.counter > 30) {
      gameOptions.boxSpeed = 670;
    }
    if (gameOptions.counter % 17 === 0) {
      this.timedEvent.delay = 6000;
    }
  }

  // the player jumps when on the ground, or once in the air as long as there are jumps left and the first jump was on the ground
  jump() {
    if (
      this.player.body.touching.down ||
      (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps)
    ) {
      if (this.player.body.touching.down) {
        this.playerJumps = 0;
      }

      this.animation.pause();
      this.player.setTexture('jump');
      this.player.setVelocityY(gameOptions.jumpForce * -1);
      this.playerJumps++;
    }
  }

  update() {
    this.tileSprite.tilePositionX += 4;

    if (this.player.body.touching.down && this.animation.paused) {
      this.animation.resume();
      this.value += 100;
      this.score.setText('Score: ' + this.value);
    }

    if (this.obstacle.body) {
      if (this.obstacle.body.touching.down) {
        this.obstacle.setVelocityX(gameOptions.boxSpeed * -1);
      }
    }
  }

  gameOver() {
    gameOptions.boxTiming[0] = 200;
    gameOptions.boxTiming[1] = 800;
    game.boxSpeed = 500;
    gameOptions.counter = 0;

    this.physics.pause();
    this.value = 0;
    this.tileSprite.destroy();
    this.player.setTint(0xff0000);
    this.animation.destroy();
    this.time.delayedCall(
      1000,
      function () {
        this.scene.start('Restart');
      },
      [],
      this
    );
  }
}
