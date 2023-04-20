import { useEffect, useState } from "react";
import { fetchComments, modifyDate } from "../api";
import { postNewComment } from "../api";

const CommentsSection = ({ review_id }) => {
  const [relatedComments, setRelatedComments] = useState([]);
  const [newCommentBody, setNewCommentBody] = useState("");

  useEffect(() => {
    fetchComments(review_id).then((response) => {
      setRelatedComments(response);
    });
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    postNewComment(review_id, "grumpy19", newCommentBody)
      .then(({ postedComment }) => {
        setRelatedComments([postedComment, ...relatedComments]);
        setNewCommentBody("");
      })
      .catch((error) => {});
  };

  if (!relatedComments[0]) {
    return <p>Sorry, no comments yet</p>;
  } else {
    return (
      <div>
        <section>
          <h4>Writte a comment</h4>
          <form onSubmit={submitHandler}>
            <label htmlFor="userNameInput">Your Username: grumpy19</label>
            <div>
              <label htmlFor="commentInput">Your Comment</label>
              <input
                id="commentInput"
                type="text"
                value={newCommentBody}
                onChange={(event) => {
                  setNewCommentBody(event.target.value);
                }}
              ></input>
            </div>
            <button type="submit">Add a comment</button>
          </form>
        </section>
        <h4>Existing Comments</h4>
        <section className="comments-section">
          {relatedComments.map((comment) => {
            const { author, body, created_at, votes, comment_id } = comment;
            return (
              <section key={comment_id} className="comment-card">
                <p>
                  <span className="bold-text">{author}</span>
                </p>
                <p>Posted at: {modifyDate(created_at)}</p>
                <p>{body}</p>
                <p>Votes: {votes}</p>
              </section>
            );
          })}
        </section>
      </div>
    );
  }
};

export default CommentsSection;
