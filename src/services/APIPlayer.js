const URL_API = 'https://opentdb.com/api_token.php?command=request';

export const API_PLAYER = async () => {
  const response = await fetch(URL_API);
  const data = await response.json();
  return data;
};
