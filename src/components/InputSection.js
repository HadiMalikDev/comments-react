import React from "react";

export default function InputSection() {
  return (
    <div className="inputSection">
      <textarea placeholder="Add a comment.."></textarea>
      <div className="inputSectionActions">
        <img src="images/avatars/image-juliusomo.png" alt="profile"></img>
        <button className="sendMessage">SEND</button>
      </div>
    </div>
  );
}
