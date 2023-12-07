import React, { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import axios from 'axios';

const AllCountries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countriesPerPage, setCountriesPerPage] = useState(10); //*Paises por pagina
  const [currentPage, setCurrentPage] = useState(1); //*pagina actual
  const totalCountries = countries.length

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      const res = await axios.get('http://localhost:3001/api/countries');
      setCountries(res.data);
      setLoading(false);
    };
    fetchCountries();
  }, []);
 
  // Get current posts
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;

  return (
    <div>
        <div>
            {countries.map(country =>(
                <div key={country.id}>
                    <div>
                        <img src={country.flags} alt={country.name} />
                    </div>
                    <h1>{country.name}</h1>
                </div>
            )).slice(indexOfFirstCountry, indexOfLastCountry)}
      </div>

      <Pagination countriesPerPage={countriesPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} totalCountries={totalCountries}/>
    </div>
  );
};

export default AllCountries;