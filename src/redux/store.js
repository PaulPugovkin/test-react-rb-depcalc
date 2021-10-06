import { configureStore } from '@reduxjs/toolkit';
import depositReducer from './deposit/deposit-reducer';

export const store = configureStore({
    reducer: {
        depositCalc: depositReducer,
    },
    devTools: process.env.NODE_ENV === 'development',
});
