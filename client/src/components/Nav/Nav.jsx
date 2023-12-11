import styles from "./Nav.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import PATHROUTES from "../../helpers/PathRoutes.helper";


export default function Nav(props) {
  const {onSearch} = props;
  return (
    <div>
      <div className={styles.divbtn}>
      <Link to={PATHROUTES.ABOUT}><button className={styles.btn}>About</button></Link>
      <Link to={PATHROUTES.FORM}><button className={styles.btn}>Form</button></Link>
      <Link to={PATHROUTES.HOME}><button className={styles.btn}>Home</button></Link>
      </div>
      {location.pathname !== "/about" && <SearchBar onSearch={onSearch} /> }
    </div>
  )
} 