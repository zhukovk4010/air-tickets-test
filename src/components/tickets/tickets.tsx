//Компонент списка билетов

import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import Ticket from '../ticket/ticket';

import styles from './tickets.module.css';
import { showMoreTickets } from '../../store/slices/ticketsSlice';

const Tickets = () => {
    const { ticketsList, ticketsToView } = useAppSelector((state) => ({
        ticketsList: state.tickets.allTickets,
        ticketsToView: state.tickets.ticketsToView,
    }));

    const dispatch = useAppDispatch();

    const ticketLictComponents = ticketsList.filter(
        (item, index) => index < ticketsToView
    );

    const onButtonClick = () => {
        dispatch(showMoreTickets(2));
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
            <div className={styles.buttonContainer}>
                <button onClick={onButtonClick}>Показать еще</button>
            </div>
        </>
    );
};

export default Tickets;
