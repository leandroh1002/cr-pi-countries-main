import { FILTER_CONTINENT, FILTER_ACTIVITIES, ORDER, ORDER_POBLACION, GET_COUNTRIES } from "./actionstypes";

export const filterByContinent = (continents) => {
    return {
        type: FILTER_CONTINENT,
        payload: continents,
    }
}

export const filterByActivities = (Activities) => {
    return {
        type: FILTER_ACTIVITIES,
        payload: Activities,
    }
}

export const orderCards = (orden, countries) => {
    return {
        type: ORDER,
        payload: { orden, countries },
    }
}

export const orderPoblacion = (orden, countries) => {
    return {
        type: ORDER_POBLACION,
        payload: orden,
    }
}

export const getCountries = (countries) =>{
    return{
        type: GET_COUNTRIES,
        payload: countries,
    }
}