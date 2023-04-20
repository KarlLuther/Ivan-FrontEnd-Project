import { useEffect, useState } from "react";
import { fetchComments, modifyDate } from "../api";
import PostCommentComponent from "../supplementoryComponents/PostNewComment";

const CommentsSection = ({ review_id }) => {
  const [relatedComments, setRelatedComments] = useState([]);

  useEffect(() => {
    fetchComments(review_id).then((response) => {
      setRelatedComments(response);
    });
  }, [relatedComments]);

  if (!relatedComments[0]) {
    return (
      <div>
        <PostCommentComponent
          review_id={review_id}
          setRelatedComments={setRelatedComments}
        />
        <p>Sorry, no comments yet</p>
      </div>
    );
  } else {
    return (
      <div>
        <PostCommentComponent
          review_id={review_id}
          setRelatedComments={setRelatedComments}
        />
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
