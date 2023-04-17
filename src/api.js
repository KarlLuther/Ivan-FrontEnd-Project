import axios from "axios";

export const fetchItems = () => {
  return axios
    .get(`https://nc-games-gry8.onrender.com/api/reviews`)
    .then((response) => {
      return response.data.reviews;
    });
};
