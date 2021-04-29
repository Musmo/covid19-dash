  
//"Data Layer" to track the basket

import React, {createContext, useContext, useReducer} from "react";

//DATA LAYER

export const StateContext = createContext();

//PROVIDER
export const StateProvider =({reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)

export const useStateValue = () => useContext(StateContext);