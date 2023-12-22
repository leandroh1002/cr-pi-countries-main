import styles from "./Nav.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import PATHROUTES from "../../helpers/PathRoutes.helper";


export default function Nav(props) {
  const {onSearch} = props;
  return (
    <div>
      <div className={styles.divbtn}>
      <Link to={PATHROUTES.LANDING}><button className={styles.btn}>About</button></Link>
      <Link to={PATHROUTES.HOME}><button className={styles.btn}>Home</button></Link>
      <Link to={PATHROUTES.FORM}><button className={styles.btn}>Form</button></Link>
      </div>
      {location.pathname !== `${PATHROUTES.ABOUT}` && location.pathname !== `${PATHROUTES.FORM}` && <SearchBar onSearch={onSearch} /> }
    </div>
  )
} 