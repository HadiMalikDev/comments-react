import React from "react";

export default function RateComment({score}) {
  return (
    <div className="rateComment">
      <p className="voteSymbol">+</p>
      <p className="upvotes">{score}</p>
      <p className="voteSymbol">-</p>
    </div>
  );
}
