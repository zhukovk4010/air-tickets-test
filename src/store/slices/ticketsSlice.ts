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
    airlineNameList: string[];
    airlineNameListToView: string[];
    filter: string | null;
    filterTransfers: number | null;
};

const initialState: InitialStateType = {
    allTickets: [],
    ticketsFilter: [],
    ticketsToView: 2,
    airlineNameList: [],
    airlineNameListToView: [],
    filter: null,
    filterTransfers: null,
};

const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        //Добавление списка билетов в стор
        addTickets(state, action: PayloadAction<TicketType[]>) {
            state.allTickets = action.payload;
            state.ticketsFilter = state.allTickets;

            //Поиск уникальный названий авиакомпаний
            let ticketsList = state.allTickets.filter(
                (item, index, array) =>
                    index ===
                    array.findIndex((t) => t.airlineName === item.airlineName)
            );

            ticketsList.forEach((item) => {
                state.airlineNameList.push(item.airlineName);
            });
        },
        //Сортировка по убыванию
        sortedByPriceDescending(state, action: PayloadAction) {
            state.ticketsFilter.sort((a, b) => {
                return a.totalPrice - b.totalPrice;
            });
            state.ticketsToView = 2;
            state.filter = 'ByPriceDescending';
        },
        //Сортировка по возрастанию
        sortedByPriceAscending(state, action: PayloadAction) {
            state.ticketsFilter.sort((a, b) => {
                return b.totalPrice - a.totalPrice;
            });
            state.ticketsToView = 2;
            state.filter = 'ByPriceAscending';
        },
        //Сортировка по времени
        sortedByTime(state, action: PayloadAction) {
            state.ticketsFilter.sort((a, b) => {
                return a.totalTime - b.totalTime;
            });
            state.ticketsToView = 2;
            state.filter = 'ByTime';
        },
        //Фильтр по 1 пересадке
        filterByOneTranspant(state, action: PayloadAction) {
            if (
                state.airlineNameListToView.length === 0 ||
                state.airlineNameListToView.length === 9
            ) {
                state.ticketsFilter = state.allTickets.filter(
                    (item) =>
                        item.startingFlight.numberOfTransfers === 1 ||
                        item.returnFlight.numberOfTransfers === 1
                );
            } else {
                state.ticketsFilter = state.ticketsFilter.filter(
                    (item) =>
                        item.startingFlight.numberOfTransfers === 1 ||
                        item.returnFlight.numberOfTransfers === 1
                );
            }

            if (state.filter === 'ByPriceDescending') {
                state.ticketsFilter.sort((a, b) => {
                    return a.totalPrice - b.totalPrice;
                });
            }
            if (state.filter === 'ByPriceAscending') {
                state.ticketsFilter.sort((a, b) => {
                    return b.totalPrice - a.totalPrice;
                });
            }
            if (state.filter === 'ByTime') {
                state.ticketsFilter.sort((a, b) => {
                    return a.totalTime - b.totalTime;
                });
            }
            state.ticketsToView = 2;
            state.filterTransfers = 1;
        },
        //Фильтр без пересадок
        filterWithoutTranspant(state, action: PayloadAction) {
            if (
                state.airlineNameListToView.length === 0 ||
                state.airlineNameListToView.length === 9
            ) {
                state.ticketsFilter = state.allTickets.filter(
                    (item) =>
                        item.startingFlight.numberOfTransfers === 0 ||
                        item.returnFlight.numberOfTransfers === 0
                );
            } else {
                state.ticketsFilter = state.ticketsFilter.filter(
                    (item) =>
                        item.startingFlight.numberOfTransfers === 0 ||
                        item.returnFlight.numberOfTransfers === 0
                );
            }

            if (state.filter === 'ByPriceDescending') {
                state.ticketsFilter.sort((a, b) => {
                    return a.totalPrice - b.totalPrice;
                });
            }
            if (state.filter === 'ByPriceAscending') {
                state.ticketsFilter.sort((a, b) => {
                    return b.totalPrice - a.totalPrice;
                });
            }
            if (state.filter === 'ByTime') {
                state.ticketsFilter.sort((a, b) => {
                    return a.totalTime - b.totalTime;
                });
            }
            state.ticketsToView = 2;
            state.filterTransfers = 0;
        },
        //Показываем все билеты
        defaultFilter(state, action: PayloadAction) {
            if (
                state.airlineNameListToView.length === 0 ||
                state.airlineNameListToView.length === 9
            ) {
                state.ticketsFilter = state.allTickets;
            } else {
                state.ticketsFilter = [];
                state.airlineNameListToView.forEach((name) => {
                    state.allTickets.forEach((item) => {
                        if (name === item.airlineName) {
                            state.ticketsFilter.push(item);
                        }
                    });
                });
            }

            if (state.filter === 'ByPriceDescending') {
                state.ticketsFilter.sort((a, b) => {
                    return a.totalPrice - b.totalPrice;
                });
            }
            if (state.filter === 'ByPriceAscending') {
                state.ticketsFilter.sort((a, b) => {
                    return b.totalPrice - a.totalPrice;
                });
            }
            if (state.filter === 'ByTime') {
                state.ticketsFilter.sort((a, b) => {
                    return a.totalTime - b.totalTime;
                });
            }
            state.ticketsToView = 2;
            state.filterTransfers = null;
        },
        showMoreTickets(state, action: PayloadAction<number>) {
            state.ticketsToView += action.payload;
        },
        filterByNamedAirline(state, action: PayloadAction<string>) {
            state.ticketsFilter = [];
            state.ticketsToView = 2;
            //Если нажали по активной фильтрации, то выключаем данный фильтр и убираем билеты
            if (state.airlineNameListToView.includes(action.payload)) {
                const position = state.airlineNameListToView.indexOf(
                    action.payload
                );
                state.airlineNameListToView.splice(position, 1);
                if (state.airlineNameListToView.length === 0) {
                    //Если после удаления фильтра, активных фильтров не остается, тогда показываем весь список
                    state.ticketsFilter = state.allTickets;
                } else {
                    state.airlineNameListToView.forEach((name) => {
                        state.allTickets.forEach((item) => {
                            if (name === item.airlineName) {
                                state.ticketsFilter.push(item);
                            }
                        });
                    });
                }
            } else {
                //Добавляем фильтр по нужной компании и показываем нужные билеты
                state.airlineNameListToView.push(action.payload);
                state.airlineNameListToView.forEach((name) => {
                    state.allTickets.forEach((item) => {
                        if (name === item.airlineName) {
                            state.ticketsFilter.push(item);
                        }
                    });
                });
            }
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
    filterByNamedAirline,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
