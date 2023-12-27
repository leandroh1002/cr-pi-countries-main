import styles from "./Nav.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import PATHROUTES from "../../helpers/PathRoutes.helper";


export default function Nav(props) {
  const {onSearch} = props;
  return (
    <div className={styles.container}>
      <Link to={PATHROUTES.LANDING}><a className={styles}>Inicio<span></span></a></Link>
      <div className={styles.divbtn}>
      <Link to={PATHROUTES.HOME}><a className={styles}>Home<span></span></a></Link>
      <Link to={PATHROUTES.FORM}><a className={styles}>Form<span></span></a></Link>
      {location.pathname !== `${PATHROUTES.ABOUT}` && location.pathname !== `${PATHROUTES.FORM}` && <SearchBar onSearch={onSearch} /> }
      </div>
    </div>
  )
} 