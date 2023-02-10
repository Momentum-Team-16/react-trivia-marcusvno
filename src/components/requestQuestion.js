import axios from 'axios';

export const requestQuestions = (id) => {
  
  const url = `https://opentdb.com/api.php?amount=10&category=${id}`

  const response = axios.get(url);
  return response;
}
