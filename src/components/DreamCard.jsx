import React from "react";
import { Link } from "react-router-dom";

const DreamCard = ({ dreamTitle }) => {
  return (
    <div className="card">
      <div className="card-body">
        <Link className="card-link text-dark" to={"/" + dreamTitle.id}>
          <h2 className="card-title">{dreamTitle.BlogTitle[2]}</h2>
          <p className="card-text">{dreamTitle.BlogTitle.slice(5)}</p>
        </Link>
      </div>
    </div>
  );
};

export default DreamCard;
