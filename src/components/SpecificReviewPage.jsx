import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviewById } from "../api";
import IsLoadingComponent from "../supplementoryComponents/isLoadingPage";
import { modifyDate } from "../api";

const SpecificReviewPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reviewToRender, setReviewToRender] = useState();
  const { review_id } = useParams();

  useEffect(() => {
    fetchReviewById(review_id).then((response) => {
      setReviewToRender(response);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <IsLoadingComponent />;
  return (
    <section>
      <h2>{reviewToRender.title}</h2>
      <p>
        <span className="bold-text">{reviewToRender.category}</span>
      </p>
      <p>Date of Posting: {modifyDate(reviewToRender.created_at)}</p>
      <img src={reviewToRender.review_img_url} alt={reviewToRender.title} />
      <p>{reviewToRender.review_body}</p>
      <p>
        <span className="bold-text">Designer:</span> {reviewToRender.designer}
      </p>
      <p>
        <span className="bold-text">Owner:</span> {reviewToRender.owner}
      </p>
    </section>
  );
};

export default SpecificReviewPage;
