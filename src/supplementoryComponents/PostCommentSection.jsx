import { useState } from "react";
import { postNewComment } from "../api";

const PostCommentSection = ({ review_id }) => {
  const [newCommentAuthor, setNewCommentAuthor] = useState("");
  const [newCommentBody, setNewCommentBody] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    postNewComment(review_id, newCommentAuthor, newCommentBody).then(
      (response) => {
        console.log("comment posted succsessfully");
      }
    );
  };

  return (
    <section>
      <h4>Writte a comment</h4>
      <form onSubmit={submitHandler}>
        <label htmlFor="userNameInput">Your Username</label>
        <input
          id="userNameInput"
          type="text"
          value={newCommentAuthor}
          onChange={(event) => {
            setNewCommentAuthor(event.target.value);
          }}
        ></input>
        <label htmlFor="commentInput">Your Comment</label>
        <input
          id="commentInput"
          type="text"
          value={newCommentBody}
          onChange={(event) => {
            setNewCommentBody(event.target.value);
          }}
        ></input>
        <button type="submit">Add a comment</button>
      </form>
    </section>
  );
};

export default PostCommentSection;
