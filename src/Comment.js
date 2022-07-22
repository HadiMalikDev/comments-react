import React from "react";
import CommentorInfo from "./components/CommentorInfo";
import Overlay from "./components/Overlay";
import RateComment from "./components/RateComment";
import MapReplyToComment from "./utils/MapReplyToComment";
export default function Comment({ commentProps, replies }) {
  const { imageUrl, username, commentedAt, description, score, replyingTo } =
    commentProps;

  const [isSelf, setIsSelf] = React.useState(false);
  const [isEdit, setEdit] = React.useState(false);

  const [showModal, setShowModal] = React.useState(false);
  React.useEffect(
    function () {
      setIsSelf(localStorage.getItem("username") === username);
    },
    [username]
  );
  return (
    <div>
      {showModal && (
        <Overlay
          title="Delete comment"
          message="Are you sure you want to delete this comment? This will remove the comment and can’t be undone."
        >
          <button
            className="cancelOverlayButton"
            onClick={() => {
              setShowModal(false);
            }}
          >
            NO,CANCEL
          </button>
          <button
            className="deleteOverlayButton"
            onClick={() => {
              setShowModal(false);
            }}
          >
            YES,DELETE
          </button>
        </Overlay>
      )}
      <div className="comment">
        <CommentorInfo
          imageUrl={imageUrl}
          username={username}
          commentedAt={commentedAt}
          isSelf={isSelf}
        />
        <div className="content">
          {isEdit ? (
            <textarea>{description}</textarea>
          ) : (
            <p>
              {replyingTo && (
                <span className="parentCommentName">@{replyingTo}</span>
              )}{" "}
              {description}
            </p>
          )}
        </div>
        <RateComment score={score} />
        <div className="actions">
          {isSelf ? (
            <>
              <div className="delete" onClick={() => setShowModal(true)}>
                <img src="images/icon-delete.svg" alt="delete"></img>
                <p>Delete</p>
              </div>
              <div className="edit" onClick={() => setEdit((prev) => !prev)}>
                <img src="images/icon-edit.svg" alt="edit"></img>
                <p>Edit</p>
              </div>
            </>
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
