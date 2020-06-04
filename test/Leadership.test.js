import { addScoreData, getScoreData } from '../src/Leadership';

test('Simulate a method post with data:user and score , to our API', async () => {
  const response = await addScoreData({
    user: 'Clinton',
    score: 50,
  });
  expect(response.result).toBe('Leaderboard score created correctly.');
}, 3000);

test('Verify that we are recieving data from our API', async () => {
  const response = await getScoreData();

  expect(response.result[0].user).toBe('Clinton');
}, 3000);
