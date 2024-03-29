import React, { useState, useEffect } from 'react';
import Pagination from '../Pagination/Pagination';
import styles from "./Home.module.css";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { orderCards, filterByContinent, orderPoblacion, filterByActivities, getCountries, Million } from "../../redux/actions";
import Card from '../Card/Card';

const Home = (props) => {
  const { country } = props;
  const [countries, setCountries] = useState([]);
  const [countriesPerPage, setCountriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.allCountries);
  const filteredCountries = useSelector((state) => state.filteredCountries);
  const filteredActivities = useSelector((state) => state.filteredActivities);

  const handleOrder = (e) => {
    dispatch(orderCards(e.target.value, countries));
    setCurrentPage(1);
  }

  const handleOrderPoblation = (e) => {
    dispatch(orderPoblacion(e.target.value, countries));
    setCurrentPage(1);
  }

  const handleFilter = (e) => {
    dispatch(filterByContinent(e.target.value));
  }

  const handleFilterActivities = (e) => {
    dispatch(filterByActivities(e.target.value));
    setCurrentPage(1);
  }

  const hadleMillion = (e) => {
    dispatch(Million());
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
    const actArray = Array.from(uniqueActivitiesSet);

    return actArray;
  };


  const fetchCountries = async () => {
    const url = '/api/countries';
    const res = await axios.get(url);
    dispatch(getCountries(res.data));
    setCountries(res.data);
  };

  useEffect(() => {
    if (country && Object.keys(country).length !== 0) {
      setCountries(country);
    } else if (filteredCountries.length > 0) {
      setCountries(filteredCountries);
      setCurrentPage(1);
    } else if (filteredActivities.length > 0) {
      setCountries(filteredActivities);
      setCurrentPage(1);
    } else {
      setCountries(allCountries);
    }
  }, [allCountries, filteredCountries, filteredActivities, country]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const renderActivitiesFilter = () => {
    const activities = extractActivities();
    if (activities.length === 1) {
      const activityName = activities[0];
      return (
        <button onClick={() => handleFilterActivities(activityName)}>
          {activityName}
        </button>
      );
    }

    return (
      <select onChange={(e) => handleFilterActivities(e)}>
        {activities.map((activity, index) => (
          <option key={index} value={activity}>
            {activity}
          </option>
        ))}
      </select>
    );
  }




  return (
    <div>
      <div className={styles.divfilter}>
        <div className={styles.filters}>
          <p>Orden Alfabetico</p>
          <select onChange={handleOrder}>
            <option value="A"> A-Z</option>
            <option value="D"> Z-A</option>
          </select>
          <p>Orden por Poblacion</p>
          <select onChange={handleOrderPoblation}>
            
            <option value="D">Mayor</option>
            <option value="A">Menor</option>
          </select>
        </div>
        <div className={styles.filters}>
          <p>Filtro por continente</p>
          <select onChange={handleFilter}>
            {extractContinents().map((continent, index) => (
              <option key={index} value={continent}>{continent}</option>
            ))}
          </select>
          <p>Filtro por Actividad</p>
          {renderActivitiesFilter()}
        </div>

        <div>
          <button onClick={hadleMillion}>Filtro 1millon</button>
        </div>
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
