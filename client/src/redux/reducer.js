import { FILTER_CONTINENT, FILTER_ACTIVITIES, ORDER, ORDER_POBLACION, GET_COUNTRIES, GET_MILLION} from "./actionstypes";

const initialState = {
    allCountries: [],
    filteredCountries: [],
    filteredActivities: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {


        case GET_COUNTRIES:
            return {...state,
            allCountries: payload,
        }

        case FILTER_CONTINENT:
            let copy3 = state.allCountries.filter((country) => {
                return country.continents === payload;
            });
            return {
                ...state,
                filteredCountries: copy3,
            };
        

        case FILTER_ACTIVITIES:
        let copy2 = state.allCountries.filter((country) => {
            return country.Activities.some(activity => activity.Nombre === payload);
        });
        return {
            ...state,
            filteredActivities: copy2,
        };




        case ORDER:
            let copy4;
            if (state.filteredCountries && state.filteredCountries.length > 0) {
                if (payload.orden === "A") {
                    copy4 = state.filteredCountries.slice().sort((a, b) => a.name.localeCompare(b.name));
                } else if (payload.orden === "D") {
                    copy4 = state.filteredCountries.slice().sort((a, b) => b.name.localeCompare(a.name));
                }
            } else if (state.filteredActivities && state.filteredActivities.length > 0) {
                if (payload.orden === "A") {
                    copy4 = state.filteredActivities.slice().sort((a, b) => a.name.localeCompare(b.name));
                } else if (payload.orden === "D") {
                    copy4 = state.filteredActivities.slice().sort((a, b) => b.name.localeCompare(a.name));
                }
            } else if (Array.isArray(payload.countries)) {
                if (payload.orden === "A") {
                    copy4 = payload.countries.slice().sort((a, b) => a.name.localeCompare(b.name));
                } else if (payload.orden === "D") {
                    copy4 = payload.countries.slice().sort((a, b) => b.name.localeCompare(a.name));
                }
            } else {
                copy4 = [];
            }
            return {
                ...state,
                filteredCountries: copy4,
            };


        case ORDER_POBLACION:
                let copy1;
                switch (payload) {
                    case "A":
                        copy1 = state.allCountries.slice().sort((a, b) => a.poblacion - b.poblacion);
                        break;
                    case "D":
                        copy1 = state.allCountries.slice().sort((a, b) => b.poblacion - a.poblacion);
                        break;
                    default:
                        copy1 = [];
                }
                return {
                    ...state,
                filteredCountries: copy1,
            };

        case GET_MILLION:
            let copy6 = state.allCountries.filter((pob) => {
                return pob.poblacion < 1000000;
            });
            return {
                ...state,
                filteredCountries: copy6,
            };
        default:
            return {
                ...state,
            };
    }
};

export default rootReducer;
