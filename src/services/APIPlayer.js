const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';

export const API_PLAYER = async () => {
  const response = await fetch(URL_TOKEN);
  const data = await response.json();
  return data;
};

export const API_GAME = async (token) => {
  const urlGame = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(urlGame);
  const data = await response.json();
  return data;
};
