import { useState } from "react";
import { patchReviewVotes } from "../api";

const VoteSection = ({ reviewToRender, review_id, setReviewToRender }) => {
  // const [amountOfVotes, setAmountOfVotes] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);
  const [initialVotes, setInitialVotes] = useState(reviewToRender.votes);
  const [isLoading, setIsLoading] = useState("");

  const voteChangeHandler = (event) => {
    setIsLoading("Sending your precious opinion");
    const diff = event.target.getAttribute("meta") === "like-button" ? 1 : -1;
    setInitialVotes(initialVotes + diff);
    setDisabledButton(true);
    patchReviewVotes(review_id, diff)
      .then((Response) => {
        setReviewToRender(Response);
        setDisabledButton(false);
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
          disabled={disabledButton}
          meta="like-button"
        >
          Like it!
        </button>
        <button
          id="dislike-review"
          onClick={voteChangeHandler}
          disabled={disabledButton}
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

// const reviewDislikeHandler = () => {
//   if (!dislikeActive) {
//     patchReviewVotes(review_id, -1)
//       .then((response) => {
//         setReviewToRender(response);
//       })
//       .finally(() => {
//         if (!dislikeActive) {
//           setDislikeActive(true);
//         }
//         if (likeActive) {
//           setLikeActive(false);
//         }
//       });
//   }
// };
