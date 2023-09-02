//Компонент списка билетов

import { useAppSelector } from '../../hooks/store-hooks';
import Ticket from '../ticket/ticket';

const Tickets = () => {
    const { ticketsList } = useAppSelector((state) => ({
        ticketsList: state.tickets.allTickets,
    }));

    return (
        <>
            {ticketsList.map((ticket) => {
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
        </>
    );
};

export default Tickets;
