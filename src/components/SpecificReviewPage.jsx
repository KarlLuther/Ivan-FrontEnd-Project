import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviewById, patchReviewVotes, modifyDate } from "../api";
import IsLoadingComponent from "../supplementoryComponents/isLoadingPage";
import CommentsSection from "../supplementoryComponents/CommentsSection";

const SpecificReviewPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reviewToRender, setReviewToRender] = useState();
  const { review_id } = useParams();

  const [dislikeActive, setDislikeActive] = useState(false);
  const [likeActive, setLikeActive] = useState(false);

  useEffect(() => {
    fetchReviewById(review_id).then((response) => {
      setReviewToRender(response);
      setIsLoading(false);
    });
  }, []);

  const reviewLikeHandler = () => {
    patchReviewVotes(review_id, 1).then((response) => {
      setReviewToRender(response);
    });
  };

  const reviewDislikeHandler = () => {
    patchReviewVotes(review_id, -1).then((response) => {
      setReviewToRender(response);
    });
  };

  if (isLoading) return <IsLoadingComponent />;
  return (
    <div>
      <section className="review-section">
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
        <div>
          <p>Votes: {reviewToRender.votes}</p>
          <button onClick={reviewLikeHandler} clicked="false" id="like-review">
            Like it!
          </button>
          <button
            onClick={reviewDislikeHandler}
            clicked="false"
            id="dislike-review"
          >
            Dislike it!
          </button>
        </div>
      </section>
      <CommentsSection review_id={review_id} />
    </div>
  );
};

export default SpecificReviewPage;
