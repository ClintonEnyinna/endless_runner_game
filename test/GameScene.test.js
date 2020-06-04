import GameScene from '../src/Scenes/GameScene';

const game = new GameScene();
game.gameOver = jest.fn();
game.jump = jest.fn();
game.create = jest.fn();

test('check GameScene custom methods', () => {
  game.gameOver();
  game.jump();
  expect(game.gameOver).toHaveBeenCalledTimes(1);
  expect(game.jump).toHaveBeenCalledTimes(1);
  expect(typeof game).toBe('object');
  expect(typeof GameScene).toBe('function');
});
