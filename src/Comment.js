import React from "react";
import CommentorInfo from "./components/CommentorInfo";
import RateComment from "./components/RateComment";
import MapReplyToComment from "./utils/MapReplyToComment";

export default function Comment({ commentProps, replies }) {
  const { imageUrl, username, commentedAt, description, score, replyingTo } =
    commentProps;

  const [isSelf, setIsSelf] = React.useState(false);
  React.useEffect(
    function () {
      setIsSelf(localStorage.getItem("username") === username);
    },
    [username]
  );
  return (
    <div>
      <div className="comment">
        <div className="staticCommentSection">
          <CommentorInfo
            imageUrl={imageUrl}
            username={username}
            commentedAt={commentedAt}
            isSelf={isSelf}
          />
          <p className="commentDescription">
            {replyingTo && (
              <span className="parentCommentName">@{replyingTo}</span>
            )}{" "}
            {description}
          </p>
        </div>
        <div className="interactCommentSection">
          <RateComment score={score} />
          {isSelf ? (
            <div className="selfActions">
              <div className="delete">
                <img src="images/icon-delete.svg" alt="delete"></img>
                <p>Delete</p>
              </div>
              <div className="edit">
                <img src="images/icon-edit.svg" alt="edit"></img>
                <p>Edit</p>
              </div>
            </div>
          ) : (
            <div className="reply">
              <img src="images/icon-reply.svg" alt=""></img>
              <p>Reply</p>
            </div>
          )}
        </div>
      </div>
      {replies && (
        <div className="commentChildren">
          {replies.map((reply) => MapReplyToComment(reply))}
        </div>
      )}
    </div>
  );
}
