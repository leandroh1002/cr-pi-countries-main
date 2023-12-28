import React, { useState, useEffect } from 'react';
import Pagination from '../Pagination/Pagination';
import styles from "./Home.module.css";
import axios from 'axios';
import SearchBar from '../SearchBar/SearchBar';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { orderCards, filterByContinent, orderPoblacion, filterByActivities } from "../../redux/actions";
import FUNCTIONS from "../../helpers/Functions.helper";
import Card from '../Card/Card';



const Home = (props) => {
  const {country} = props;
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

  const handleFilterActivities = (e) => {
    dispatch(filterByActivities(e.target.value));
  }

  const extractContinents = () => {
    const uniqueContinents = [...new Set(allCountries.map(country => country.continents))];
    return uniqueContinents;
  }

  const extractActivities = () => {
    const uniqueActivitiesSet = new Set();
  
    allCountries.forEach(country => {
      country.Activities.forEach(activity => {
        uniqueActivitiesSet.add(activity.Nombre);
      });
    });
  
    return uniqueActivitiesSet;
  }
  


  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      const url = 'http://localhost:3001/api/countries';
      const res = await axios.get(url);
      setCountries(res.data);

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


  const renderActivitiesFilter = () => {
    const activities = extractActivities();

    if (activities.size === 1) {
      const activityName = activities.values().next().value;
      return (
        <button onClick={() => handleFilterActivities(activityName)}>
          {activityName}
        </button>
      );
    }

    return (
      <select onChange={(e) => handleFilterActivities(e.target.value)}>
        {[...activities].map((activity, index) => (
          <option key={index} value={activity}>{activity}</option>
        ))}
      </select>
    );
  }

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
          {extractContinents().map((continent, index) => (
            <option key={index} value={continent}>{continent}</option>
          ))}
        </select>
           
        {  renderActivitiesFilter()}
      </div>

      <div className={styles.cardContainer}>
        {countriesToMap.map(country => {
          return(
          <Card
          key={country.id}
          id={country.id}
          name={country.name}
          continents={country.continents}
          flags={country.flags}
          />
          )


      }).slice((currentPage - 1) * countriesPerPage, currentPage * countriesPerPage)}
      </div>

      <Pagination countriesPerPage={countriesPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} totalCountries={countriesToMap.length} />
    </div>
  );
};

export default Home;