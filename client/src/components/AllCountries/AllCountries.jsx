// AllCountries.jsx
import React, { useState, useEffect } from 'react';
import Pagination from '../Pagination/Pagination';
import styles from "./AllCountries.module.css";
import axios from 'axios';
import SearchBar from '../SearchBar/SearchBar';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { orderCards, filterByContinent, orderPoblacion } from "../../redux/actions";

const AllCountries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countriesPerPage, setCountriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [aux, setAux] = useState(false);
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.allCountries);
  const filteredCountries = useSelector((state) => state.filteredCountries);

  const handleOrder = (e) => {
    setAux(!aux);
    dispatch(orderCards(e.target.value));
  }
  const handleOrderPoblation = (e) => {
    setAux(!aux);
    dispatch(orderPoblacion(e.target.value));
  }

  const handleFilter = (e) => {
    dispatch(filterByContinent(e.target.value));
  }

  const extractContinents = () => {
    // Extraer los continentes únicos de allCountries
    const uniqueContinents = [...new Set(allCountries.map(country => country.continents))];
    return uniqueContinents;
  }

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      const url = search ? `http://localhost:3001/api/countries/?name=${search}` : 'http://localhost:3001/api/countries';
      const res = await axios.get(url);
      setCountries(res.data);

      // Despachar la acción con los países obtenidos
      dispatch(orderCards(aux ? 'D' : 'A', res.data || []));

      setLoading(false);
    };

    fetchCountries();
  }, [search, aux, dispatch]);

  const onSearchChange = (value) => {
    setCurrentPage(1);
    setSearch(value);
  }

  const countriesToMap = filteredCountries.length > 0 ? filteredCountries : allCountries;

  return (
    <div>
      <div className={styles.divfilter}>
        <select onChange={handleOrder}>
          <option value="A">Ascendente</option>
          <option value="D">Descendente</option>
        </select>
        <select onChange={handleOrderPoblation}>
          <option value="D">Mayor</option>
          <option value="A">Menor</option>
        </select>
        <select onChange={handleFilter}>
          {/* Generar opciones de continentes sin duplicados */}
          {extractContinents().map((continent, index) => (
            <option key={index} value={continent}>{continent}</option>
          ))}
        </select>
      </div>
    //*************************************************/
      <SearchBar onSearch={onSearchChange} />
      <div className={styles.cardContainer}>
        {countriesToMap.map(country => (
          <div className={styles.container} key={country.id}>
            <div className={styles.cointainerimage}>
              <Link to={`/detail/${country.id}`}>
                <img className={styles.imgperfil} src={country.flags} alt={country.name} />
              </Link>
            </div>
            <h1>{country.name}</h1>
            <h2>{country.continents}</h2>
          </div>
        )).slice((currentPage - 1) * countriesPerPage, currentPage * countriesPerPage)}
      </div>

      <Pagination countriesPerPage={countriesPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} totalCountries={countriesToMap.length} />
    </div>
  );
};

export default AllCountries;
