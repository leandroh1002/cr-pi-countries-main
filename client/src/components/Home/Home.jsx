import Card from "../Card/Card";
import styles from "./Home.module.css";

export default function Home(props) {
  const { countries, onClose} = props; // Characters es un arreglo.
  return (
    <div className={styles.wrapperCards}>
      {countries.map((country) => {
        return (
          <Card
            key={country.id}
            id={country.id}
            name={country.name}
            status={country.status}
            species={country.species}
            gender={country.gender}
            origin={country.origin.name}
            image={country.image}
            onClose={onClose}
          />
        );
      })}
    </div>
  );
}