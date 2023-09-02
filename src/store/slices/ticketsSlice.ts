//Слайс билетов

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FlightType = {
    departureСity: string;
    departureAirport: string;
    idDepartureAirport: string;
    departureDate: Date;
    arrivalCity: string;
    arrivalAirport: string;
    idArrivalAirport: string;
    arrivalDate: string;
    numberOfTransfers: number;
    totalTimeMinutes: number;
};

export type TicketType = {
    id: number;
    airlineName: string;
    totalPrice: number;
    totalTime: number;
    startingFlight: FlightType;
    returnFlight: FlightType;
};

type InitialStateType = {
    allTickets: TicketType[];
    ticketsToDisplay: TicketType[];
    ticketsToView: number;
};

const initialState: InitialStateType = {
    allTickets: [],
    ticketsToDisplay: [],
    ticketsToView: 2,
};

const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        addTickets(state, action: PayloadAction<TicketType[]>) {
            state.allTickets = action.payload;
        },
        sortedByPriceDescending(state, action: PayloadAction) {
            state.allTickets.sort((a, b) => {
                return a.totalPrice - b.totalPrice;
            });
            state.ticketsToView = 2;
        },
        sortedByPriceAscending(state, action: PayloadAction) {
            state.allTickets.sort((a, b) => {
                return b.totalPrice - a.totalPrice;
            });
            state.ticketsToView = 2;
        },
        sortedByTime(state, action: PayloadAction) {
            state.allTickets.sort((a, b) => {
                return a.totalTime - b.totalTime;
            });
            state.ticketsToView = 2;
        },
        filterByOneTranspant(state, action) {},
        filterWithoutTranspant(state, action) {},
        showMoreTickets(state, action: PayloadAction<number>) {
            state.ticketsToView += action.payload;
        },
    },
});

export const {
    addTickets,
    sortedByPriceDescending,
    sortedByPriceAscending,
    sortedByTime,
    filterByOneTranspant,
    filterWithoutTranspant,
    showMoreTickets,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
