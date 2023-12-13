import { FILTER_CONTINENT, FILTER_ACTIVITIES, ORDER, ORDER_POBLACION } from "./actionstypes";

export const filterByContinent =(continente) =>{
    return{
        type: FILTER_CONTINENT,
        payload: continente,
    }
}
export const filterByActivities =(activity) =>{
    return{
        type: FILTER_ACTIVITIES,
        payload: activity,
    }
}

export const orderCards =(orden) =>{
    return{
        type: ORDER,
        payload: orden,
    }
}
export const orderPoblacion =(orden) =>{
    return{
        type: ORDER_POBLACION,
        payload: orden,
    }
}