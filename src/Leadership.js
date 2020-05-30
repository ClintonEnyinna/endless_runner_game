const baseUrl =
  'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games';

const id = 'wiwuz8XPfcvf2MG5o2fz';

const addScoreData = async (playerScore) => {
  const response = await fetch(`${baseUrl}/${id}/scores`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(playerScore),
  });

  const result = await response.json();
  const data = await result;

  return data;
};

const getScoreData = async () => {
  const response = await fetch(`${baseUrl}/${id}/scores`);

  const result = await response.json();
  const data = await result;

  return data;
};

export { addScoreData, getScoreData };
