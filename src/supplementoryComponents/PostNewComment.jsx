import { postNewComment } from "../api";
import { useState } from "react";

const PostCommentComponent = ({ review_id, setRelatedComments }) => {
  const [newCommentBody, setNewCommentBody] = useState("");
  const [disabledButton, setDisabledButton] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    setNewCommentBody("");
    setDisabledButton(true);
    postNewComment(review_id, "grumpy19", newCommentBody)
      .then(({ postedComment }) => {
        setRelatedComments([postedComment, ...relatedComments]);
        setDisabledButton(false);
      })
      .catch((error) => {});
  };

  return (
    <section>
      <h4>Writte a comment</h4>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="commentInput">Write a new Comment!</label>
          <textarea
            id="commentInput"
            type="text"
            value={newCommentBody}
            onChange={(event) => {
              setNewCommentBody(event.target.value);
              if (event.target.value !== "") {
                setDisabledButton(false);
              } else {
                setDisabledButton(true);
              }
            }}
          ></textarea>
        </div>
        <button type="submit" disabled={disabledButton}>
          Add a comment
        </button>
      </form>
    </section>
  );
};

export default PostCommentComponent;
