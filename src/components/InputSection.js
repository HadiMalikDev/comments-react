import React from "react";

export default function InputSection({ uploadComment, isReplying }) {
  const [content, setContent] = React.useState("");
  return (
    <div className="inputSection">
      <textarea
        value={content}
        placeholder="Add a comment.."
        onChange={(event) => setContent(event.target.value)}
      ></textarea>
      <img src="images/avatars/image-juliusomo.png" alt="profile"></img>
      <button
        className="sendMessage"
        onClick={() => {
          uploadComment(content);
          setContent("");
        }}
      >
        {isReplying ? "REPLY" : "SEND"}
      </button>
    </div>
  );
}
