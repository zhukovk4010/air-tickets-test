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
    startingFlight: FlightType;
    returnFlight: FlightType;
};

type InitialStateType = {
    allTickets: TicketType[];
    ticketsToDisplay: TicketType[];
};

const initialState: InitialStateType = {
    allTickets: [],
    ticketsToDisplay: [],
};

const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        addTickets(state, action: PayloadAction<TicketType[]>) {
            state.allTickets = action.payload;
        },
        sortedByPriceDescending(state, action) {},
        sortedByPriceAscending(state, action) {},
        sortedByTime(state, action) {},
        filterByOneTranspant(state, action) {},
        filterWithoutTranspant(state, action) {},
    },
});

export const {
    addTickets,
    sortedByPriceDescending,
    sortedByPriceAscending,
    sortedByTime,
    filterByOneTranspant,
    filterWithoutTranspant,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
