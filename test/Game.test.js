import Game from '../src/index';

it('We can check if the consumer called the class constructor', () => {
  const game = new Game();
  expect(game.globals.bgMusic).toBe(null);
  expect(game.isBooted).toBe(true);
});
