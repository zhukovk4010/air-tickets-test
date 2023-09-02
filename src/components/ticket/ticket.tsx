//Компонент билета

import { FlightType } from '../../store/slices/ticketsSlice';
import FlightСard from '../flight-card/flight-card';
import styles from './ticket.module.css';

type TicketPropsType = {
    airlineName: string;
    totalPrice: number;
    startingFlight: FlightType;
    returnFlight: FlightType;
};

function Ticket({
    airlineName,
    totalPrice,
    startingFlight,
    returnFlight,
}: TicketPropsType) {
    return (
        <section className={styles.ticket}>
            <div className={styles.ticketHeader}>
                <div className={styles.companyName}>{airlineName}</div>
                <div className={styles.ticketPrice}>
                    <div className={styles.price}>{`${totalPrice} руб`}</div>
                    <div>Стоимость для одного пассажира</div>
                </div>
            </div>
            <FlightСard
                airlineName={airlineName}
                flightInformation={startingFlight}
            />
            <div className={styles.blueLine}></div>
            <FlightСard
                airlineName={airlineName}
                flightInformation={returnFlight}
            />
            <div className={styles.chooseButton}>Выбрать</div>
        </section>
    );
}

export default Ticket;
