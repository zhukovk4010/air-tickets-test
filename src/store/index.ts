//Инициализация стора

import { configureStore } from '@reduxjs/toolkit';
import ticketsReducer from './slices/ticketsSlice';

export const store = configureStore({
    reducer: {
        tickets: ticketsReducer,
    },
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
