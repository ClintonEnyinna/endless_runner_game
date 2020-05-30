import 'phaser';

// eslint-disable-next-line no-undef
export default class Obstacle extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);

    this.setScale(0.15);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setGravityY(500);
  }
}
