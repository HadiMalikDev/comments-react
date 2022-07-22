import React from "react";

export default function CommentorDescription({
  imageUrl,
  username,
  commentedAt,
  isSelf
}) {
  return (
    <div className="userDetails">
      <img className="profilePicture" alt="Profile" src={`${imageUrl}`}></img>
      <p className="username">{username}</p>
      {isSelf && <p className="tag">you</p>}
      <p className="commentDate">{commentedAt}</p>
    </div>
  );
}
