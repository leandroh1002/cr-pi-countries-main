import React from 'react';

const Pagination = ({ countriesPerPage, totalCountries, currentPage, setCurrentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++) {
    pageNumbers.push(i);
  }

  const onPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const onSpeficPage = (n) => {
    setCurrentPage(n);
  };

  return (
    <div>
      <button onClick={onPrevPage} disabled={currentPage === 1}>Anterior</button>
      <button onClick={onNextPage} disabled={currentPage >= pageNumbers.length}>Siguiente</button>

        {pageNumbers.map((noPage) => (
          <div key={noPage}>
            <button onClick={() => onSpeficPage(noPage)}>
              {noPage}
            </button>
          </div>
        ))}
    </div>
  );
};

export default Pagination;
