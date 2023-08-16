import React from "react";
const Pagination = ({ pageNum, onNext, onPrev }) => {
  return (
    <div
      className="flex
      justify-center my-4"
    >
      <div
        className="border-2
      p-2
      border-r-0
      rounded-l-xl
      border-red-700 cursor-pointer"
        onClick={onPrev}
      >
        Previous
      </div>
      <div
        className="border-2
      p-2
      border-r-0
      border-red-700"
      >
        {pageNum}
      </div>
      <div
        className="border-2
      p-2
      rounded-r-xl
      border-red-700 cursor-pointer"
        onClick={onNext}
      >
        Next
      </div>
    </div>
  );
};

export default Pagination;
