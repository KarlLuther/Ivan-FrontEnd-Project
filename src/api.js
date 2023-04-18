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

export const fetchReviewById = (review_id) => {
  return ncGamesApi.get(`/reviews/${review_id}`).then((response) => {
    return response.data.review;
  });
};

export const modifyDate = (date) => {
  const requiredData = date.slice(0, 10);
  return requiredData;
};
