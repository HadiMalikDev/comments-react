import React from "react";
import Comment from "./Comment";
import InputSection from "./components/InputSection";
const commentsData = require("./data.json");
export default function App() {
  const [comments, setComments] = React.useState(commentsData.comments);

  function deleteComment(parentCommentIndex, commentIdIndex) {
    //Check if user deleting parent comment.
    //If comment has no parent, then it is parent comment
    if (!parentCommentIndex) {
      return setComments((prev) => {
        const newArray = [...prev];
        newArray.splice(commentIdIndex, 1);
        return newArray;
      });
    }
    return setComments((prev) => {
      const newArray = [...prev];
      newArray[parentCommentIndex].replies.splice(commentIdIndex, 1);
      return newArray;
    });
  }
  function updateComment(parentCommentIndex, commentIdIndex, newDescription) {
    //Check if user deleting parent comment.
    //If comment has no parent, then it is parent comment
    if (!parentCommentIndex) {
      return setComments((prev) => {
        const newArray = [...prev];
        newArray[commentIdIndex].content = newDescription;
        return newArray;
      });
    }
    return setComments((prev) => {
      const newArray = [...prev];
      newArray[parentCommentIndex].replies[commentIdIndex].content =
        newDescription;
      return newArray;
    });
  }

  function MapComments(comments) {
    return comments.map((comment, parentIndex) => (
      <Comment
        key={comment.id}
        commentProps={{
          imageUrl: comment.user.image.png,
          username: comment.user.username,
          commentedAt: comment.createdAt,
          description: comment.content,
          score: comment.score,
          replyingTo: comment.replyingTo,
        }}
        deleteComment={() => deleteComment(null, parentIndex)}
        updateComment={(newDescription) =>
          updateComment(null, parentIndex, newDescription)
        }
        replyToComment={(content) => {
          replyToComment(parentIndex, null, comment.user.username, content);
        }}
      >
        {comment.replies.map((replyComment, childIndex) => (
          <Comment
            key={replyComment.id}
            commentProps={{
              imageUrl: replyComment.user.image.png,
              username: replyComment.user.username,
              commentedAt: replyComment.createdAt,
              description: replyComment.content,
              score: replyComment.score,
              replyingTo: replyComment.replyingTo,
            }}
            deleteComment={() => deleteComment(parentIndex, childIndex)}
            updateComment={(newDescription) =>
              updateComment(parentIndex, childIndex, newDescription)
            }
            replyToComment={(content) => {
              replyToComment(
                parentIndex,
                childIndex,
                comment.user.username,
                content
              );
            }}
          />
        ))}
      </Comment>
    ));
  }
  //parentCommentIndex needed if replying to top-level comment
  //childCommentIndex needed if replying to a child comment
  function replyToComment(
    parentCommentIndex,
    childCommentIndex,
    replyingTo,
    content
  ) {
    const id = Math.random(0, 1) * 10000;
    const comment = {
      id,
      content,
      createdAt: "now",
      score: 0,
      user: commentsData.currentUser,
      replyingTo,
    };
    if (childCommentIndex === null) {
      return setComments((prev) => {
        const newArray = [...prev];
        newArray[parentCommentIndex].replies.push(comment);
        return newArray;
      });
    }
    return setComments((prev) => {
      const newArray = [...prev];
      newArray[parentCommentIndex].replies.splice(
        childCommentIndex+1,
        0,
        comment
      );
      return newArray;
    });
  }
  function addComment(content) {
    const id = Math.random(0, 1) * 10000;
    const comment = {
      id,
      content,
      createdAt: "now",
      score: 0,
      user: commentsData.currentUser,
      replies: [],
    };
    setComments((prev) => [...prev, comment]);
  }
  return (
    <div>
      <div className="main">
        <div className="comments">{MapComments(comments)}</div>
        <InputSection uploadComment={(content) => addComment(content)} />
      </div>
    </div>
  );
}
