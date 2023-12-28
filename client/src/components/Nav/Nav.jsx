import styles from "./Nav.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import PATHROUTES from "../../helpers/PathRoutes.helper";

export default function Nav(props) {
  const { onSearch } = props;
  return (
    <div className={styles.container}>
      <Link to={PATHROUTES.LANDING} className={styles.link}>
        Inicio<span></span>
      </Link>
      <div className={styles.divbtn}>
        <Link to={PATHROUTES.HOME} className={styles.link}>
          Home<span></span>
        </Link>
        <Link to={PATHROUTES.FORM} className={styles.link}>
          Form<span></span>
        </Link>
        {location.pathname !== `${PATHROUTES.ABOUT}` &&
          location.pathname !== `${PATHROUTES.FORM}` && (
            <SearchBar onSearch={onSearch} />
          )}
      </div>
    </div>
  );
}
