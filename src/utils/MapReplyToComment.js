import React from "react";
import Comment from "../Comment";
export default function MapReplyToComment(comment) {
  return (
    <Comment
      key={comment.id}
      commentProps={{
        imageUrl: comment.user.image.png,
        username: comment.user.username,
        commentedAt: comment.createdAt,
        description: comment.content,
        score: comment.score,
        replyingTo:comment.replyingTo
      }}
      replies= {comment.replies}
    />
  );
}
