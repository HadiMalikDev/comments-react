import React from "react";
import MapReplyToComment from "./utils/MapReplyToComment";
import InputSection from "./components/InputSection";
const commentsData = require("./data.json");

export default function App() {
  return (
    <div className="main">
      <div className="comments">
        {commentsData.comments.map((comment) => MapReplyToComment(comment))}
      </div>
      <InputSection />
    </div>
  );
}
