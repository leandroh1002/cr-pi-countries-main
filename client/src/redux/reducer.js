import { FILTER_CONTINENT, FILTER_ACTIVITIES, ORDER, ORDER_POBLACION } from "./actionstypes";

const initialState = {
    allCountries: [],
    filteredCountries: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case FILTER_CONTINENT:
            let copy3 = state.allCountries.filter((country) => {
                return country.continents === payload;
            });
            return {
                ...state,
                filteredCountries: copy3, // Almacena los países filtrados en el nuevo campo
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

            case ORDER_POBLACION:
                let copy1;
                switch (payload) {
                    case "A":
                        // Ordenar por población ascendente
                        copy1 = state.allCountries.slice().sort((a, b) => a.poblacion - b.poblacion);
                        break;
                    case "D":
                        // Ordenar por población descendente
                        copy1 = state.allCountries.slice().sort((a, b) => b.poblacion - a.poblacion);
                        break;
                    default:
                        copy1 = [];
                }
                return {
                    ...state,
                    filteredCountries: copy1,
                };
        default:
            return {
                ...state,
            };
    }
};

export default rootReducer;
