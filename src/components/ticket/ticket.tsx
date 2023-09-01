//Компонент билета

import FlightСard from '../flight-card/flight-card';
import styles from './ticket.module.css';

function Ticket() {
    return (
        <section className={styles.ticket}>
            <div className={styles.ticketHeader}>
                <div className={styles.companyName}>Название компании</div>
                <div className={styles.ticketPrice}>
                    <div className={styles.price}>Цена</div>
                    <div>Стоимость для одного пассажира</div>
                </div>
            </div>
            <FlightСard />
            <div className={styles.blueLine}></div>
            <FlightСard />
            <div className={styles.chooseButton}>Выбрать</div>
        </section>
    );
}

export default Ticket;
