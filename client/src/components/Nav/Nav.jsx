import styles from "./Nav.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import PATHROUTES from "../../helpers/PathRoutes.helper";


export default function Nav(props) {
  const {onSearch} = props;
  return (
    <div className={styles.container}>
      <Link to={PATHROUTES.LANDING}><button className={styles.btn}>Inicio</button></Link>
      <div className={styles.divbtn}>
      <Link to={PATHROUTES.HOME}><button className={styles.btn}>Home</button></Link>
      <Link to={PATHROUTES.FORM}><button className={styles.btn}>Form</button></Link>
      {location.pathname !== `${PATHROUTES.ABOUT}` && location.pathname !== `${PATHROUTES.FORM}` && <SearchBar onSearch={onSearch} /> }
      </div>
    </div>
  )
} 