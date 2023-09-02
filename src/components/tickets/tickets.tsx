//Компонент списка билетов

import { useState } from 'react';
import { useAppSelector } from '../../hooks/store-hooks';
import Ticket from '../ticket/ticket';

import styles from './tickets.module.css';

const Tickets = () => {
    const { ticketsList } = useAppSelector((state) => ({
        ticketsList: state.tickets.allTickets,
    }));

    //Количество отображаемых билетов
    const [numberOfDisplayedTickets, setNumberOfDisplayedTickets] = useState(2);

    const ticketLictComponents = ticketsList.filter(
        (item, index) => index < numberOfDisplayedTickets
    );

    const onButtonClick = () => {
        setNumberOfDisplayedTickets(numberOfDisplayedTickets + 2);
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
