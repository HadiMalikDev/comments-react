import React from "react";
import CommentorInfo from "./components/CommentorInfo";
import InputSection from "./components/InputSection";
import Overlay from "./components/Overlay";
import RateComment from "./components/RateComment";
export default function Comment({
  commentProps,
  children,
  deleteComment,
  updateComment,
  replyToComment,
}) {
  const { imageUrl, username, commentedAt, description, score, replyingTo } =
    commentProps;

  const [isSelf, setIsSelf] = React.useState(false);
  const [isEdit, setEdit] = React.useState(false);
  const [isReplying, setReply] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  React.useEffect(
    function () {
      setIsSelf(localStorage.getItem("username") === username);
    },
    [username]
  );
  const [contentText, setContentText] = React.useState(description);

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
              deleteComment();
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
            <textarea
              value={contentText}
              onChange={(event) => setContentText(event.target.value)}
            >
              {description}
            </textarea>
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
        {isEdit && (
          <div className="updateComment">
            <button
              onClick={() => {
                updateComment(contentText);
                setEdit(false);
              }}
            >
              UPDATE
            </button>
          </div>
        )}
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
            <div className="reply" onClick={() => setReply((prev) => !prev)}>
              <img src="images/icon-reply.svg" alt=""></img>
              <p>Reply</p>
            </div>
          )}
        </div>
      </div>
      {isReplying && (
        <InputSection
          isReplying={true}
          uploadComment={(content) => {
            replyToComment(content);
            setReply(false);
          }}
        />
      )}
      {children && <div className="commentChildren">{children}</div>}
    </div>
  );
}
