import axios from "axios";

const ncGamesApi = axios.create({
  baseURL: "https://nc-games-gry8.onrender.com/api",
});

export const fetchItems = () => {
  return ncGamesApi.get(`/reviews`).then((response) => {
    return response.data.reviews;
  });
};

export const fetchCategories = () => {
  return ncGamesApi.get("/categories").then((response) => {
    return response.data.categories;
  });
};
