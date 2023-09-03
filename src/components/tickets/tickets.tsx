//Компонент списка билетов

import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import Ticket from '../ticket/ticket';

import styles from './tickets.module.css';
import { showMoreTickets } from '../../store/slices/ticketsSlice';

const Tickets = () => {
    const { ticketsList, ticketsToView } = useAppSelector((state) => ({
        ticketsList: state.tickets.ticketsFilter,
        ticketsToView: state.tickets.ticketsToView,
    }));

    const dispatch = useAppDispatch();

    const ticketLictComponents = ticketsList.filter(
        (item, index) => index < ticketsToView
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
