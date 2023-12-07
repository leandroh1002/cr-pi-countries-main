import { connect } from "react-redux";
//import { addFav, removeFav } from "../../redux/actions";
import styles from "./Card.module.css";
import { Link, useLocation } from "react-router-dom";
import PATHROUTES from "../../helpers/PathRoutes.helper";


function Card(props) {
  const {id, name, capital, poblacion, continents, flags, subregion, area} = props;
  const {pathname} = useLocation()

  return (
    <div>
      <div className={styles.cardContainer}>
      <div className={styles.header}>
      <Link to={`/detail/${id}`}><img className={styles.imgperfil} src={flags} alt={name} /></Link>
      </div>

      <div >
        <div className={styles.contenedorNombreEstado}/* className={name ? styles.name : styles.noname} */>
          <h2>{name}</h2>
        </div>
        <div className={styles.containerh2}>
          {/* <h2>{capital}</h2> */}
          <h2>{continents}</h2>
          {/* <h2>{origin}</h2> */}
        </div>
      </div>
      </div>
    </div>
  );

}



export default Card;