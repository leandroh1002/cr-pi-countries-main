// AllCountries.jsx
import React, { useState, useEffect } from 'react';
import Pagination from '../Pagination/Pagination';
import styles from "./AllCountries.module.css";
import axios from 'axios';
import SearchBar from '../SearchBar/SearchBar';
import { connect, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';

const AllCountries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countriesPerPage, setCountriesPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [aux, setAux] = useState(false);

  const dispatch = useDispatch();

  const handleOrder=(e) =>{
    setAux(!aux);
    dispatch(orderCards(e.target.value))
  }

  const handleFilter = (e) =>{
    dispatch(filterCards(e.target.value))
  }

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      const url = search ? `http://localhost:3001/api/countries/search?name=${search}` : 'http://localhost:3001/api/countries';
      const res = await axios.get(url);
      setCountries(res.data);
      setLoading(false);
    };
    
    fetchCountries();
  }, [search]);

  const onSearchChange = (value) => {
    setCurrentPage(1);
    setSearch(value);
  }

  return (
    <div>
            <div className={styles.divfilter}>
        <select onChange={handleOrder}>
        <option value="A" >Ascendente</option>
        <option value="D">Descendente</option>
        </select>
        <select onChange={handleFilter}>
          <option value="Male" >Male</option>
          <option value="Female">Female</option>
          <option value="Genderless">Genderless</option>
          <option value="unknown">unknown</option>
        </select></div>
      <SearchBar onSearch={onSearchChange} />
      <div className={styles.cardContainer}>
        {countries.map(country => (
          <div className={styles.container} key={country.id}>
            <div className={styles.header}>
              <Link to={`/detail/${country.id}`}>
                <img className={styles.imgperfil} src={country.flags} alt={country.name} />
              </Link>
            </div>
            <h1>{country.name}</h1>
            <h2>{country.capital}</h2>
          </div>
        )).slice((currentPage - 1) * countriesPerPage, currentPage * countriesPerPage)}
      </div>
      <Pagination countriesPerPage={countriesPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} totalCountries={countries.length} />
    </div>
  );
};

export default connect()(AllCountries);;
