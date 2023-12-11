import { FILTER, ORDER } from "./actionstypes";

export const filterCards =(gender) =>{
    return{
        type: FILTER,
        payload: gender,
    }
}

export const orderCards =(orden) =>{
    return{
        type: ORDER,
        payload: orden,
    }
}