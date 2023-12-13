import { FILTER, ORDER } from "./actionstypes";

const initialState = {
  allCountries: [], // Renombré allCharacters a allCountries para que sea más claro.
};

const filterCountries = (countries, filter) => {
  if (filter.continent) {
    countries = countries.filter((country) => country.continent === filter.continent);
  }
  if (filter.activity) {
    countries = countries.filter((country) => country.activity === filter.activity);
  }
  return countries;
};

const orderCountries = (countries, order) => {
  if (order === "A") {
    return countries.sort((a, b) => a.name.localeCompare(b.name)); // Ordenar alfabéticamente de A a Z.
  } else if (order === "D") {
    return countries.sort((a, b) => b.name.localeCompare(a.name)); // Ordenar alfabéticamente de Z a A.
  }
  return countries;
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FILTER:
      const filteredCountries = filterCountries(state.allCountries, payload);
      return {
        ...state,
        allCountries: filteredCountries,
      };
    case ORDER:
      const orderedCountries = orderCountries(state.allCountries, payload);
      return {
        ...state,
        allCountries: orderedCountries,
      };
    default:
      return state; // Devolver el estado sin cambios por defecto.
  }
};

export default rootReducer;
