import { FILTER_CONTINENT, FILTER_ACTIVITIES, ORDER, ORDER_POBLACION } from "./actionstypes";

const initialState = {
  allCountries: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FILTER_CONTINENT:
      let copy3 = state.allCountries.filter((country) => {
        return country.continente === payload;
      });
      return {
        ...state,
        allCountries: copy3,
      };
    case FILTER_ACTIVITIES:
      let copy2 = state.allCountries.filter((country) => {
        return country.actividad === payload;
      });
      return {
        ...state,
        allCountries: copy2,
      };
    case ORDER:
      let copy4;
      if (payload === "A") {
        copy4 = state.allCountries.sort((a, b) => a.name.localeCompare(b.name));
      } else if (payload === "D") {
        copy4 = state.allCountries.sort((a, b) => b.name.localeCompare(a.name));
      }
      return {
        ...state,
        myFavorites: copy4,
      };

    case ORDER_POBLACION:
      let copy1;
      if (payload === "A") {
        copy1 = state.allCountries.sort((a, b) => a.population - b.population);
      } else if (payload === "D") {
        copy1 = state.allCountries.sort((a, b) => b.population - a.population);
      }
      return {
        ...state,
        myFavorites: copy1,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
