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
    ticketsFilter: TicketType[];
    ticketsToView: number;
};

const initialState: InitialStateType = {
    allTickets: [],
    ticketsFilter: [],
    ticketsToView: 2,
};

const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        //Добавление списка билетов в стор
        addTickets(state, action: PayloadAction<TicketType[]>) {
            state.allTickets = action.payload;
            state.ticketsFilter = state.allTickets;
        },
        //Сортировка по убыванию
        sortedByPriceDescending(state, action: PayloadAction) {
            state.allTickets.sort((a, b) => {
                return a.totalPrice - b.totalPrice;
            });
            state.ticketsFilter.sort((a, b) => {
                return a.totalPrice - b.totalPrice;
            });
            state.ticketsToView = 2;
        },
        //Сортировка по возрастанию
        sortedByPriceAscending(state, action: PayloadAction) {
            state.allTickets.sort((a, b) => {
                return b.totalPrice - a.totalPrice;
            });
            state.ticketsFilter.sort((a, b) => {
                return b.totalPrice - a.totalPrice;
            });
            state.ticketsToView = 2;
        },
        //Сортировка по времени
        sortedByTime(state, action: PayloadAction) {
            state.allTickets.sort((a, b) => {
                return a.totalTime - b.totalTime;
            });
            state.ticketsFilter.sort((a, b) => {
                return a.totalTime - b.totalTime;
            });
            state.ticketsToView = 2;
        },
        //Фильтр по 1 пересадке
        filterByOneTranspant(state, action: PayloadAction) {
            state.ticketsFilter = state.allTickets.filter(
                (item) =>
                    item.startingFlight.numberOfTransfers === 1 ||
                    item.returnFlight.numberOfTransfers === 1
            );
        },
        //Фильтр без пересадок
        filterWithoutTranspant(state, action: PayloadAction) {
            state.ticketsFilter = state.allTickets.filter(
                (item) =>
                    item.startingFlight.numberOfTransfers === 0 ||
                    item.returnFlight.numberOfTransfers === 0
            );
        },
        //Показываем все билеты
        defaultFilter(state, action: PayloadAction) {
            state.ticketsFilter = state.allTickets;
        },
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
    defaultFilter,
    showMoreTickets,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
