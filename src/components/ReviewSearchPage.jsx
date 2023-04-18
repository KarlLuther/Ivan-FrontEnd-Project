import { useEffect, useState } from "react";
import { fetchItems, fetchCategories } from "../api";

const ReviewSearchPage = () => {
  const [listItems, setListItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoriesList, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  useEffect(() => {
    fetchItems(selectedCategory).then((items) => {
      setListItems(items);
    });
  }, [selectedCategory]);
  return (
    <section>
      <h2>Review Search Page</h2>
      <form id="category-filter">
        <label htmlFor="categorys">sort by categorys : </label>
        <select
          onChange={(event) => {
            setSelectedCategory(event.target.value);
          }}
          id="categorys"
        >
          <option value="">all</option>
          {categoriesList.map((category) => {
            return (
              <option key={category.slug} value={category.slug}>
                {category.slug}
              </option>
            );
          })}
        </select>
      </form>
      <ul>
        {listItems.map((review) => {
          const { title, owner, review_img_url, category, votes, review_id } =
            review;

          return (
            <li className="item-to-sell" key={review_id}>
              <h3>{title}</h3>
              <img
                src={review_img_url}
                alt={` ${title}`}
                className="review-img"
              />
              <p>Author: {owner}</p>
              <p>Category: {category}</p>
              <p>Votes: {votes}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ReviewSearchPage;
