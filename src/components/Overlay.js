import React from "react";

export default function Overlay({ title, message, children }) {
  return (
    <div className="overlayWrapper" onClick={()=>{}}>
      <div className="overlay">
        <h2>{title}</h2>
        <p>{message}</p>
        <div>{children}</div>
      </div>
    </div>
  );
}
