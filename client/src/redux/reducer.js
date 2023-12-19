import { FILTER_CONTINENT, FILTER_ACTIVITIES, ORDER, ORDER_POBLACION } from "./actionstypes";

const initialState = {
    allCountries: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case FILTER_CONTINENT: //orden por continente
            let copy3 = state.allCountries.filter((country) => {
                return country.continente === payload;
            });
            return {
                ...state,
                allCountries: copy3,
            };

        case FILTER_ACTIVITIES: //ordena por actividad
            let copy2 = state.allCountries.filter((country) => {
                return country.actividad === payload;
            });
            return {
                ...state,
                allCountries: copy2,
            };
        case ORDER:
            let copy4;
            if (Array.isArray(payload.countries)) {
                if (payload.orden === "A") {
                    copy4 = payload.countries.slice().sort((a, b) => a.name.localeCompare(b.name));
                } else if (payload.orden === "D") {
                    copy4 = payload.countries.slice().sort((a, b) => b.name.localeCompare(a.name));
                }
            } else {
                // Si payload.countries no es un array, asignar un array vacío
                copy4 = [];
            }
            return {
                ...state,
                allCountries: copy4,
            };

        case ORDER_POBLACION: //ordena por cantidad de pobalcion
            let copy1;
            if (payload === "A") {
                copy1 = state.allCountries.sort((a, b) => a.population - b.population);
            } else if (payload === "D") {
                copy1 = state.allCountries.sort((a, b) => b.population - a.population);
            }
            return {
                ...state,
                allCountries: copy1,
            };
        default:
            return {
                ...state,
            };
    }
};

export default rootReducer;
