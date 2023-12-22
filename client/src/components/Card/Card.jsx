import styles from "./Card.module.css";
import { Link, useLocation } from "react-router-dom";


function Card(props) {
  const {id, name, capital, poblacion, continents, flags, subregion, area, countriesToMap} = props;
  const {pathname} = useLocation()

  return (
    <div>
      {countriesToMap.map(country => ( 
      <div className={styles.container} key={country.id}>
            <div className={styles.header}>
              <Link to={`/detail/${country.id}`}>
                <img className={styles.imgperfil} src={country.flags} alt={country.name} />
              </Link>
            </div>
            <h1>{country.name}</h1>
            <h2>{country.continents}</h2>
          </div>
          )).slice((currentPage - 1) * countriesPerPage, currentPage * countriesPerPage)}
    </div>
  );

}



export default Card;