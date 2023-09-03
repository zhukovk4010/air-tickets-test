//Компонент списка билетов

import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import Ticket from '../ticket/ticket';

import styles from './tickets.module.css';
import { showMoreTickets } from '../../store/slices/ticketsSlice';
import { useMemo } from 'react';

const Tickets = () => {
    const ticketsList = useAppSelector((state) => state.tickets.ticketsFilter);
    const ticketsToView = useAppSelector(
        (state) => state.tickets.ticketsToView
    );

    const dispatch = useAppDispatch();

    //Количество отрисованных билетов
    const ticketLictComponents = useMemo(
        () => ticketsList.filter((item, index) => index < ticketsToView),
        [ticketsList, ticketsToView]
    );

    const onButtonClick = () => {
        dispatch(showMoreTickets(2));
    };

    const FooterPanel = () => {
        if (ticketsList.length === 0) {
            return <div>Нет билетов по заданным условиям</div>;
        } else if (
            ticketsList.length === ticketsToView ||
            ticketsList.length - 1 === ticketsToView
        ) {
            return '';
        } else {
            return <button onClick={onButtonClick}>Показать еще</button>;
        }
    };

    return (
        <>
            {ticketLictComponents.map((ticket) => {
                return (
                    <Ticket
                        key={ticket.id}
                        airlineName={ticket.airlineName}
                        totalPrice={ticket.totalPrice}
                        startingFlight={ticket.startingFlight}
                        returnFlight={ticket.returnFlight}
                    />
                );
            })}
            {ticketsList.length === ticketsToView ? (
                <div className={styles.hidden}></div>
            ) : (
                ''
            )}
            <div className={styles.buttonContainer}>{FooterPanel()}</div>
        </>
    );
};

export default Tickets;
