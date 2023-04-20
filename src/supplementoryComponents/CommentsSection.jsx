import { useEffect, useState } from "react";
import { fetchComments, modifyDate } from "../api";

const CommentsSection = ({ review_id }) => {
  const [relatedComments, setRelatedComments] = useState([]);

  useEffect(() => {
    fetchComments(review_id).then((response) => {
      setRelatedComments(response);
    });
  }, []);

  if (!relatedComments[0]) {
    return <p>Sorry, no comments yet</p>;
  } else {
    return (
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
    );
  }
};

export default CommentsSection;
