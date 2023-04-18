import { useEffect, useState } from "react";
import { fetchItems, fetchCategories } from "../api";
import IsLoadingComponent from "../supplementoryComponents/isLoadingPage";
import { useNavigate } from "react-router-dom";

const ReviewSearchPage = () => {
  const navigate = useNavigate();
  const [listItems, setListItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoriesList, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCategories().then((categories) => {
      setCategories(categories);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchItems().then((items) => {
      setListItems(items);
    });
  }, [selectedCategory]);

  const clickHandler = (event) => {
    const buttonElem = event.target;
    const desiredId = buttonElem.getAttribute("review_id");
    navigate(`/Reviews/${desiredId}`);
  };

  if (isLoading) return <IsLoadingComponent />;
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
              <button onClick={clickHandler} review_id={review_id}>
                See this review
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ReviewSearchPage;
