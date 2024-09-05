import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPagination = () => {
    const pageNumbers = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`px-3 py-1 mx-1 rounded ${currentPage === i ? "bg-primary text-[#fff]" : "bg-[#3351]"}`}
          >
            {i}
          </button>
        );
      }
    } else {
      if (currentPage > 3) {
        pageNumbers.push(
          <button
            key={1}
            onClick={() => onPageChange(1)}
            className={`px-3 py-1 mx-1 rounded ${currentPage === 1 ? "bg-primary text-[#fff]" : "bg-[#3351]"}`}
          >
            1
          </button>
        );
        pageNumbers.push(
          <button
            key="ellipsis1"
            className="px-3 py-1 mx-1 rounded bg-transparent cursor-default"
          >
            ...
          </button>
        );
      }

      if (currentPage > 3 && currentPage < totalPages - 2) {
        pageNumbers.push(
          <button
            key={currentPage - 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="px-3 py-1 mx-1 rounded bg-[#3351]"
          >
            {currentPage - 1}
          </button>
        );
      }

      pageNumbers.push(
        <button
          key={currentPage}
          onClick={() => onPageChange(currentPage)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === currentPage ? "bg-primary text-[#fff]" : "bg-[#3351]"
          }`}
        >
          {currentPage}
        </button>
      );

      if (currentPage < totalPages - 2) {
        pageNumbers.push(
          <button
            key={currentPage + 1}
            onClick={() => onPageChange(currentPage + 1)}
            className="px-3 py-1 mx-1 rounded bg-[#3351]"
          >
            {currentPage + 1}
          </button>
        );
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push(
          <button
            key="ellipsis2"
            className="px-3 py-1 mx-1 rounded bg-transparent cursor-default"
          >
            ...
          </button>
        );
        pageNumbers.push(
          <button
            key={totalPages}
            onClick={() => onPageChange(totalPages)}
            className={`px-3 py-1 mx-1 rounded ${
              currentPage === totalPages ? "bg-primary text-[#fff]" : "bg-[#3351]"
            }`}
          >
            {totalPages}
          </button>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex my-20 items-center  text-[#fff] justify-between mt-4  ">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-[#666] cursor-not-allowed" : "bg-primary text-[#fff]"}`}
      >
        Previous
      </button>

      {/* Page Numbers */}
     <div>
     {renderPagination()}

     </div>
      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-[#666] cursor-not-allowed" : "bg-primary text-[#fff]"}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
