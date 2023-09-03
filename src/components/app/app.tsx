//Компонент приложения

import { useAppDispatch } from '../../hooks/store-hooks';

import data from '../../utils/flights.json';

import SearchSettingsPanel from '../search-settings-panel/search-settings-panel';

import styles from './app.module.css';

import { TicketType, addTickets } from '../../store/slices/ticketsSlice';
import Tickets from '../tickets/tickets';

const App = () => {
    //База перелетов, тип any, чтобы не типизировать исходный массив
    const ticketsData: any = data;

    //Список нужных данных из базы, который диспатчится
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const ticketsList: TicketType[] = [];

    //Обход базы и занесение нужной информации в ticketsList
    ticketsData.result.flights.forEach((ticket: any, i: number) => {
        //Количество пересадок
        let numberOfTransfers = ticket.flight.legs[0].segments.length - 1;
        let numberOfTransfersReturnFlight =
            ticket.flight.legs[1].segments.length - 1;

        //Существуют пропуски в базе, сделал проверку. Запишется пустая строка в случае пропуска
        let cityName = '';
        let cityNameReturn = '';
        let departureСityReturn = '';

        if (ticket.flight.legs[0].segments[numberOfTransfers].arrivalCity) {
            cityName =
                ticket.flight.legs[0].segments[numberOfTransfers].arrivalCity
                    .caption;
        }

        if (
            ticket.flight.legs[1].segments[numberOfTransfersReturnFlight]
                .arrivalCity
        ) {
            cityNameReturn =
                ticket.flight.legs[1].segments[numberOfTransfersReturnFlight]
                    .arrivalCity.caption;
        }
        // console.log(ticket.flight.legs[1].segments[0].departureCity);
        if (ticket.flight.legs[1].segments[0].departureCity) {
            departureСityReturn =
                ticket.flight.legs[1].segments[0].departureCity.caption;
        }

        //Вычисление общего времени в пути первого перелета в минутах
        let arrivalDateMs = new Date(
            ticket.flight.legs[0].segments[numberOfTransfers].arrivalDate
        ).getTime();

        let departureDate = new Date(
            ticket.flight.legs[0].segments[0].departureDate
        ).getTime();

        let totalTimeMinutesStartingFlight =
            (arrivalDateMs - departureDate) / 1000 / 60;

        //Вычисление общего времени в пути для 2 перелета

        let arrivalDateReturnFlightMs = new Date(
            ticket.flight.legs[1].segments[
                numberOfTransfersReturnFlight
            ].arrivalDate
        ).getTime();

        let departureDateReturnFlightMs = new Date(
            ticket.flight.legs[1].segments[0].departureDate
        ).getTime();

        let totalTimeMinutesReturnFlight =
            (arrivalDateReturnFlightMs - departureDateReturnFlightMs) /
            1000 /
            60;

        //Общее время в пути
        let totalTime =
            totalTimeMinutesStartingFlight + totalTimeMinutesReturnFlight;

        //Заполняем список нужными данными
        ticketsList.push({
            //id
            id: i,
            //Название авикомпании
            airlineName: ticket.flight.carrier.caption,
            //Общая стоимость перелета
            totalPrice: ticket.flight.price.total.amount,
            //Общее время в пути
            totalTime: totalTime,
            //Полет туда
            startingFlight: {
                //Город отправления
                departureСity:
                    ticket.flight.legs[0].segments[0].departureCity.caption,
                //Аэропорт отправления
                departureAirport:
                    ticket.flight.legs[0].segments[0].departureAirport.caption,
                //Сокращение аэропорта
                idDepartureAirport:
                    ticket.flight.legs[0].segments[0].departureAirport.uid,
                //Дата вылета
                departureDate: ticket.flight.legs[0].segments[0].departureDate,
                //Город назначения
                arrivalCity:
                    ticket.flight.legs[0].segments[numberOfTransfers]
                        .arrivalAirport.caption,
                //Аэропорт назначения
                arrivalAirport: cityName,
                //Сокращение аэропорта
                idArrivalAirport:
                    ticket.flight.legs[0].segments[numberOfTransfers]
                        .arrivalAirport.uid,
                //Дата прилета
                arrivalDate:
                    ticket.flight.legs[0].segments[numberOfTransfers]
                        .arrivalDate,
                //Количество пересадок
                numberOfTransfers: numberOfTransfers,
                //Общее время от места отправления до места прибытия
                totalTimeMinutes: totalTimeMinutesStartingFlight,
            },
            //Обратный полет, те же поля что и в объекте первого полета
            returnFlight: {
                departureСity: departureСityReturn,
                departureAirport:
                    ticket.flight.legs[1].segments[0].departureAirport.caption,
                idDepartureAirport:
                    ticket.flight.legs[1].segments[0].departureAirport.uid,
                departureDate: ticket.flight.legs[1].segments[0].departureDate,
                arrivalCity: cityNameReturn,
                arrivalAirport:
                    ticket.flight.legs[1].segments[
                        numberOfTransfersReturnFlight
                    ].arrivalAirport.caption,
                idArrivalAirport:
                    ticket.flight.legs[1].segments[
                        numberOfTransfersReturnFlight
                    ].arrivalAirport.uid,
                arrivalDate:
                    ticket.flight.legs[1].segments[
                        numberOfTransfersReturnFlight
                    ].arrivalDate,
                numberOfTransfers: numberOfTransfers,
                totalTimeMinutes: totalTimeMinutesReturnFlight,
            },
        });
    });

    //Диспатчим данные в стор
    const dispatch = useAppDispatch();
    dispatch(addTickets(ticketsList));

    return (
        <main className={styles.app}>
            <SearchSettingsPanel />
            <div className={styles.ticketsList}>
                <Tickets />
            </div>
        </main>
    );
};

export default App;
