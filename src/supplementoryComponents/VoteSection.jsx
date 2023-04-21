import { useState } from "react";
import { patchReviewVotes } from "../api";

const VoteSection = ({ reviewToRender, review_id, setReviewToRender }) => {
  const [initialVotes, setInitialVotes] = useState(reviewToRender.votes);
  const [isLoading, setIsLoading] = useState("");
  const [disableLikeButton, setDisableLikeButton] = useState(false);
  const [disableDisLikeButton, setDisableDisLikeButton] = useState(false);

  const voteChangeHandler = (event) => {
    setIsLoading("Sending your precious opinion");
    const diff = event.target.getAttribute("meta") === "like-button" ? 1 : -1;
    setInitialVotes(initialVotes + diff);
    setDisableLikeButton(true);
    setDisableDisLikeButton(true);
    patchReviewVotes(review_id, diff)
      .then((Response) => {
        setReviewToRender(Response);
        if (diff === 1) {
          setDisableDisLikeButton(false);
        } else {
          setDisableLikeButton(false);
        }
        setIsLoading("");
      })
      .catch(() => {
        setIsLoading(
          "Sorry, you are offline, so we couldn't record your precious opinion. Please check your network connection"
        );
      });
  };

  return (
    <div>
      <div>
        <p>Votes: {initialVotes}</p>
        <button
          id="like-review"
          onClick={voteChangeHandler}
          disabled={disableLikeButton}
          meta="like-button"
        >
          Like it!
        </button>
        <button
          id="dislike-review"
          onClick={voteChangeHandler}
          disabled={disableDisLikeButton}
          meta="dislike-button"
        >
          Dislike it!
        </button>
      </div>
      <p>{isLoading}</p>
    </div>
  );
};

export default VoteSection;
