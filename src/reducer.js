export const initialState = {
    countryData: {}, // at the start the basket is an empty array
}

// Selector 


function reducer(state, action){
    console.log(action);
    console.log(state);
// we manipulate the data layer with actions (add item, remove item...)
    switch(action.type){
        case 'SET':
            return{ ...state,
                countryData: action.data
                
            };         
        default:
            return state; // if don't know what to do return the state
    }
}
export default reducer;