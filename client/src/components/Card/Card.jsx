import styles from "./Card.module.css";
import { Link } from "react-router-dom";


function Card(props) {
  const {id, name, continents, flags} = props;
  return (
    <div>
      <div className={styles.container} key={id}>
            <div className={styles.cointainerimage}>
              <Link to={`/detail/${id}`}>
                <img src={flags} alt={name} />
              </Link>
            </div>
            <h1>{name}</h1>
            <h2>{continents}</h2>
          </div>
    </div>
  );
}

export default Card;