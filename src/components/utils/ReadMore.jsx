/* eslint-disable react/prop-types */
import { useState } from "react";

const ReadMore = ({ description }) => {
  const [isReadMore, setIsReadMore] = useState(true);
  return (
    <div className="inline">
      {isReadMore ? description.slice(0, 50) : description}{" "}
      {description.length > 100 && (
        <span
          onClick={() => setIsReadMore(!isReadMore)}
          className="text-blue-400 cursor-pointer"
        >
          {isReadMore ? "...read more" : "less"}
        </span>
      )}
    </div>
  );
};

export default ReadMore;
