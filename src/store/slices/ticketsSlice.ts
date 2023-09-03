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
    airlineNameListUnDisabled: string[];
    airlineNameListToView: string[];
    sorted: string | null;
    filterTransfers: number | null;
    minPriceFilter: number;
    maxPriceFilter: number;
};

const initialState: InitialStateType = {
    //Все билеты
    allTickets: [],
    //Отфильтрованные билеты для показа пользователю
    ticketsFilter: [],
    //Количество билетов, которые отрисовываются из списка отфильтрованных
    ticketsToView: 2,
    //Список авиакомпаний
    airlineNameList: [],
    //Список авиакомпаний, который выбрал пользователь
    airlineNameListToView: [],
    //Выбранная сортировка пользователя
    sorted: null,
    //Выбранное количество пересадок
    filterTransfers: null,
    //Минимальная указанная цена в фильтре
    minPriceFilter: 0,
    //Максимальная указанная цена в фильтре
    maxPriceFilter: 0,
    //Задизейбленные авиакомпании
    airlineNameListUnDisabled: [],
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

            //Заполняем список компаний с билетами
            state.airlineNameListUnDisabled = state.airlineNameList;
        },
        //Сортировка по убыванию
        sortedByPriceDescending(state, action: PayloadAction) {
            state.ticketsFilter.sort((a, b) => {
                return a.totalPrice - b.totalPrice;
            });
            state.ticketsToView = 2;
            state.sorted = 'ByPriceDescending';
        },
        //Сортировка по возрастанию
        sortedByPriceAscending(state, action: PayloadAction) {
            state.ticketsFilter.sort((a, b) => {
                return b.totalPrice - a.totalPrice;
            });
            state.ticketsToView = 2;
            state.sorted = 'ByPriceAscending';
        },
        //Сортировка по времени
        sortedByTime(state, action: PayloadAction) {
            state.ticketsFilter.sort((a, b) => {
                return a.totalTime - b.totalTime;
            });
            state.ticketsToView = 2;
            state.sorted = 'ByTime';
        },
        //Фильтр по 1 пересадке
        //Чистим список компаний с билетами
        //Проверяем на количество выбранных компаний
        //Проверяем цену
        //Сортируем
        //Заполняем список компаний с билетами
        filterByOneTranspant(state, action: PayloadAction) {
            state.airlineNameListUnDisabled = [];
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

            if (state.minPriceFilter && state.maxPriceFilter) {
                const list = state.ticketsFilter;
                state.ticketsFilter = [];
                state.ticketsFilter = list.filter(
                    (item) =>
                        item.totalPrice >= state.minPriceFilter &&
                        item.totalPrice <= state.maxPriceFilter
                );
            }

            if (state.sorted === 'ByPriceDescending') {
                state.ticketsFilter.sort((a, b) => {
                    return a.totalPrice - b.totalPrice;
                });
            }
            if (state.sorted === 'ByPriceAscending') {
                state.ticketsFilter.sort((a, b) => {
                    return b.totalPrice - a.totalPrice;
                });
            }
            if (state.sorted === 'ByTime') {
                state.ticketsFilter.sort((a, b) => {
                    return a.totalTime - b.totalTime;
                });
            }
            let ticketsList = state.ticketsFilter.filter(
                (item, index, array) =>
                    index ===
                    array.findIndex((t) => t.airlineName === item.airlineName)
            );

            ticketsList.forEach((item) => {
                state.airlineNameListUnDisabled.push(item.airlineName);
            });

            state.ticketsToView = 2;
            state.filterTransfers = 1;
        },
        //Фильтр без пересадок
        //Чистим список компаний с билетами
        //Проверяем на количество выбранных компаний
        //Проверяем цену
        //Сортируем
        //Заполняем список компаний с билетами
        filterWithoutTranspant(state, action: PayloadAction) {
            state.airlineNameListUnDisabled = [];
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

            if (state.minPriceFilter && state.maxPriceFilter) {
                const list = state.ticketsFilter;
                state.ticketsFilter = [];
                state.ticketsFilter = list.filter(
                    (item) =>
                        item.totalPrice >= state.minPriceFilter &&
                        item.totalPrice <= state.maxPriceFilter
                );
            }

            if (state.sorted === 'ByPriceDescending') {
                state.ticketsFilter.sort((a, b) => {
                    return a.totalPrice - b.totalPrice;
                });
            }
            if (state.sorted === 'ByPriceAscending') {
                state.ticketsFilter.sort((a, b) => {
                    return b.totalPrice - a.totalPrice;
                });
            }
            if (state.sorted === 'ByTime') {
                state.ticketsFilter.sort((a, b) => {
                    return a.totalTime - b.totalTime;
                });
            }

            let ticketsList = state.ticketsFilter.filter(
                (item, index, array) =>
                    index ===
                    array.findIndex((t) => t.airlineName === item.airlineName)
            );

            ticketsList.forEach((item) => {
                state.airlineNameListUnDisabled.push(item.airlineName);
            });

            state.ticketsToView = 2;
            state.filterTransfers = 0;
        },
        //Отключение фильтра по пересадкам
        //Чистим список компаний с билетами
        //Проверяем на количество выбранных компаний
        //Проверяем цену
        //Сортируем
        //Заполняем список компаний с билетами
        defaultFilter(state, action: PayloadAction) {
            state.airlineNameListUnDisabled = [];
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

            if (state.minPriceFilter && state.maxPriceFilter) {
                const list = state.ticketsFilter;
                state.ticketsFilter = [];
                state.ticketsFilter = list.filter(
                    (item) =>
                        item.totalPrice >= state.minPriceFilter &&
                        item.totalPrice <= state.maxPriceFilter
                );
            }

            if (state.sorted === 'ByPriceDescending') {
                state.ticketsFilter.sort((a, b) => {
                    return a.totalPrice - b.totalPrice;
                });
            }
            if (state.sorted === 'ByPriceAscending') {
                state.ticketsFilter.sort((a, b) => {
                    return b.totalPrice - a.totalPrice;
                });
            }
            if (state.sorted === 'ByTime') {
                state.ticketsFilter.sort((a, b) => {
                    return a.totalTime - b.totalTime;
                });
            }

            let ticketsList = state.ticketsFilter.filter(
                (item, index, array) =>
                    index ===
                    array.findIndex((t) => t.airlineName === item.airlineName)
            );

            ticketsList.forEach((item) => {
                state.airlineNameListUnDisabled.push(item.airlineName);
            });

            state.ticketsToView = 2;
            state.filterTransfers = null;
        },
        //Колиечество отрисовываемых билетов
        showMoreTickets(state, action: PayloadAction<number>) {
            state.ticketsToView += action.payload;
        },
        //Фильтр по компаниям
        //Чистим список компаний с билетами
        //Проверяем выбрана ли компания в фильтре
        //Если активна, то выключаем ее и убираем билеты
        //Если не активна, то добавляем в активный список и добавляем ее билеты
        //Проверяем фильтр по цене и сортировке
        filterByNamedAirline(state, action: PayloadAction<string>) {
            state.airlineNameListUnDisabled = [];
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
            if (state.minPriceFilter && state.maxPriceFilter) {
                state.ticketsFilter.filter(
                    (item) =>
                        item.totalPrice >= state.minPriceFilter &&
                        item.totalPrice <= state.maxPriceFilter
                );
            }
            if (state.sorted === 'ByPriceDescending') {
                state.ticketsFilter.sort((a, b) => {
                    return a.totalPrice - b.totalPrice;
                });
            }
            if (state.sorted === 'ByPriceAscending') {
                state.ticketsFilter.sort((a, b) => {
                    return b.totalPrice - a.totalPrice;
                });
            }
            if (state.sorted === 'ByTime') {
                state.ticketsFilter.sort((a, b) => {
                    return a.totalTime - b.totalTime;
                });
            }
            let ticketsList = state.ticketsFilter.filter(
                (item, index, array) =>
                    index ===
                    array.findIndex((t) => t.airlineName === item.airlineName)
            );

            ticketsList.forEach((item) => {
                state.airlineNameListUnDisabled.push(item.airlineName);
            });
        },
        //Фильтр по цене
        //Чистим список компаний с билетами
        //Фильтруем исходный массив по цене
        //Проверяем фильтр по пересадкам
        //Проверяем сортировку
        filterByPrice(
            state,
            action: PayloadAction<{ minPrice: number; maxPrice: number }>
        ) {
            state.airlineNameListUnDisabled = [];
            state.ticketsFilter = [];
            state.allTickets.forEach((item) => {
                if (
                    action.payload.minPrice <= item.totalPrice &&
                    item.totalPrice <= action.payload.maxPrice
                ) {
                    state.ticketsFilter.push(item);
                }
            });
            if (state.filterTransfers === 1) {
                state.ticketsFilter = state.ticketsFilter.filter(
                    (item) =>
                        item.startingFlight.numberOfTransfers === 1 ||
                        item.returnFlight.numberOfTransfers === 1
                );
            }
            if (state.filterTransfers === 0) {
                state.ticketsFilter = state.ticketsFilter.filter(
                    (item) =>
                        item.startingFlight.numberOfTransfers === 0 ||
                        item.returnFlight.numberOfTransfers === 0
                );
            }
            if (
                state.airlineNameListToView.length === 0 ||
                state.airlineNameListToView.length === 9
            ) {
            } else {
                const list = state.ticketsFilter;
                state.ticketsFilter = [];
                state.airlineNameListToView.forEach((name) => {
                    list.forEach((item, i) => {
                        if (name === item.airlineName) {
                            state.ticketsFilter.push(item);
                        }
                    });
                });
            }
            if (state.sorted === 'ByPriceDescending') {
                state.ticketsFilter.sort((a, b) => {
                    return a.totalPrice - b.totalPrice;
                });
            }
            if (state.sorted === 'ByPriceAscending') {
                state.ticketsFilter.sort((a, b) => {
                    return b.totalPrice - a.totalPrice;
                });
            }
            if (state.sorted === 'ByTime') {
                state.ticketsFilter.sort((a, b) => {
                    return a.totalTime - b.totalTime;
                });
            }

            let ticketsList = state.ticketsFilter.filter(
                (item, index, array) =>
                    index ===
                    array.findIndex((t) => t.airlineName === item.airlineName)
            );

            ticketsList.forEach((item) => {
                state.airlineNameListUnDisabled.push(item.airlineName);
            });

            state.ticketsToView = 2;
            state.minPriceFilter = action.payload.minPrice;
            state.maxPriceFilter = action.payload.maxPrice;
        },
        //Отключаем фильтр по цене
        //Чистим список компаний с билетами
        //Проверяем фильтр по пересадкам
        //Проверяем сортировку
        filterOffPrice(state, action: PayloadAction) {
            state.airlineNameListUnDisabled = [];
            state.ticketsFilter = state.allTickets;
            if (state.filterTransfers === 1) {
                state.ticketsFilter = state.ticketsFilter.filter(
                    (item) =>
                        item.startingFlight.numberOfTransfers === 1 ||
                        item.returnFlight.numberOfTransfers === 1
                );
            }
            if (state.filterTransfers === 0) {
                state.ticketsFilter = state.ticketsFilter.filter(
                    (item) =>
                        item.startingFlight.numberOfTransfers === 0 ||
                        item.returnFlight.numberOfTransfers === 0
                );
            }
            if (
                state.airlineNameListToView.length === 0 ||
                state.airlineNameListToView.length === 9
            ) {
            } else {
                const list = state.ticketsFilter;
                state.ticketsFilter = [];
                state.airlineNameListToView.forEach((name) => {
                    list.forEach((item, i) => {
                        if (name === item.airlineName) {
                            state.ticketsFilter.push(item);
                        }
                    });
                });
            }
            if (state.sorted === 'ByPriceDescending') {
                state.ticketsFilter.sort((a, b) => {
                    return a.totalPrice - b.totalPrice;
                });
            }
            if (state.sorted === 'ByPriceAscending') {
                state.ticketsFilter.sort((a, b) => {
                    return b.totalPrice - a.totalPrice;
                });
            }
            if (state.sorted === 'ByTime') {
                state.ticketsFilter.sort((a, b) => {
                    return a.totalTime - b.totalTime;
                });
            }

            let ticketsList = state.ticketsFilter.filter(
                (item, index, array) =>
                    index ===
                    array.findIndex((t) => t.airlineName === item.airlineName)
            );

            ticketsList.forEach((item) => {
                state.airlineNameListUnDisabled.push(item.airlineName);
            });

            state.ticketsToView = 2;
            state.minPriceFilter = 0;
            state.maxPriceFilter = 0;
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
    filterByPrice,
    filterOffPrice,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
