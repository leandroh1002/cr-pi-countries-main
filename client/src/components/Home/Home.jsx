import Card from "../Card/Card";
import styles from "./Home.module.css";

export default function Home(props) {
  const { countries, onClose} = props; // Characters es un arreglo.
  return (
    <div className={styles.wrapperCards}>
      {countries.map((country) => {
        return (
          <div>
          <Card
            key={country.id}
            id={country.id}
            name={country.name}
            capital={country.capital}
            continents={country.continents}
            subregion={country.subregion}
            area={country.area}
            poblacion={country.poblacion}
            flags={country.flags}
            onClose={onClose}
          />
          </div>
        );
      })}
    </div>
  );
}