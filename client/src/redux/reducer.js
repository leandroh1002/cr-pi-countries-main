import { ADD_FAV, REMOVE_FAV, FILTER, ORDER } from "./actionstypes";

const initialState = {
    myFavorites: [],
    allCharacters: [],
}

const rootReducer = (state= initialState, {type, payload}) =>{
switch(type){
    case ADD_FAV:
        return { ...state, myFavorites: payload, allCharacters: payload };
    case REMOVE_FAV:
        return { ...state, myFavorites: payload };
    case FILTER:
        let copy3 = state.allCharacters.filter((genero) =>{
            return genero.gender === payload;
        })
        return {
            ...state, myFavorites: copy3,
        }
    case ORDER:
        let copy4;
        if (payload === "A") {
            copy4 = state.allCharacters.sort((a, b) => a.id - b.id); // Ordenar de menor a mayor por ID.
          } else if (payload === "D") {
            copy4 = state.allCharacters.sort((a, b) => b.id - a.id); // Ordenar de mayor a menor por ID.
          }
        return{
            ...state, myFavorites: copy4,
        }

    default: 
        return{
            ...state
        };
    }   
}

export default rootReducer;