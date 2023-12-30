import React, { useState, useEffect } from 'react';
import Pagination from '../Pagination/Pagination';
import styles from "./Home.module.css";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { orderCards, filterByContinent, orderPoblacion, filterByActivities, getCountries } from "../../redux/actions";
import FUNCTIONS from "../../helpers/Functions.helper";
import Card from '../Card/Card';

const Home = (props) => {
  const { country } = props;
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countriesPerPage, setCountriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [aux, setAux] = useState(false);
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.allCountries);
  const filteredCountries = useSelector((state) => state.filteredCountries);
  const filteredActivities = useSelector((state) => state.filteredActivities);

  const handleOrder = (e) => {
    dispatch(orderCards(e.target.value, countries));
    setCurrentPage(1);
  }

  const handleOrderPoblation = (e) => {
    setAux(!aux);
    dispatch(orderPoblacion(e.target.value));
    setCurrentPage(1);
  }

  const handleFilter = (e) => {
    dispatch(filterByContinent(e.target.value));
    setCurrentPage(1);
  }

  const handleFilterActivities = (e) => {
    dispatch(filterByActivities(e.target.value));
    setCurrentPage(1);
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
    if (country && Object.keys(country).length !== 0) {
      setCountries([country]);
    } else if (filteredCountries.length > 0) {
      setCountries(filteredCountries);
    } else if (filteredActivities.length > 0) {
      setCountries(filteredActivities);
    } else {
      setCountries(allCountries);
    }
    setCurrentPage(1);
  }, [allCountries, filteredCountries, country, filteredActivities]);


  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      const url = 'http://localhost:3001/api/countries';
      const res = await axios.get(url);
      dispatch(getCountries(res.data));
      setLoading(false);
    };
    fetchCountries();
  }, []);

  
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
      <select onChange={(e) => handleFilterActivities(e)}>
        {[...activities].map((activity, index) => (
          <option key={index} value={activity}>
            {activity}
          </option>
        ))}
      </select>
    );
  }


  console.log("country",country)
  console.log("countries",countries)
  console.log("allCountries",allCountries)
  console.log("filteredCountries",filteredCountries)

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

        {renderActivitiesFilter()}
      </div>

      <div className={styles.cardContainer}>
        {countries.map(country => (
          <Card
            key={country.id}
            id={country.id}
            name={country.name}
            continents={country.continents}
            flags={country.flags}
          />
        )).slice((currentPage - 1) * countriesPerPage, currentPage * countriesPerPage)}
      </div>

      <Pagination countriesPerPage={countriesPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} totalCountries={countries.length} />
    </div>
  );
};

export default Home;
