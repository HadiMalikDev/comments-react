import React from "react";

export default function RateComment({ score:commentScore }) {
  const [score, setScore] = React.useState(commentScore);
  return (
    <div className="rateComment">
      <p className="voteSymbol" onClick={()=>setScore(prev=>++prev)}>+</p>
      <p className="upvotes">{score}</p>
      <p className="voteSymbol" onClick={()=>setScore(prev=>--prev)}>-</p>
    </div>
  );
}
