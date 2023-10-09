import React from "react";
import { Link } from "react-router-dom";

const DreamCard = ({ dreamTitle }) => {
  return (
    <Link className="link-text" to={"/" + dreamTitle.id}>
      <div className="dream-card">
        <h2 className="title">{dreamTitle.BlogTitle[2]}</h2>
        {/* <h5 className="title-detail">{dreamTitle.BlogTitle.slice(5)}</h5> */}
      </div>
    </Link>
  );
};

export default DreamCard;
