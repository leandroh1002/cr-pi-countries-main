import React from 'react';
import styles from "./Pagination.module.css";


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
    <div className={styles.container}>
      <button onClick={onPrevPage} disabled={currentPage === 1}>Anterior</button>

        {pageNumbers.map((noPage) => (
          <div key={noPage}>
            <button onClick={() => onSpeficPage(noPage)}>
              {noPage}
            </button>
          </div>
        ))}
        
        <button onClick={onNextPage} disabled={currentPage >= pageNumbers.length}>Siguiente</button>
    </div>
  );
};

export default Pagination;
