
import React, { createContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
    orders: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ORDER':
            return { ...state, orders: [...state.orders, action.payload] };
        default:
            return state;
    }
};

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
