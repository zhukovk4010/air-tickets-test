//Компонент карточки рейса

import clockImg from '../../images/clock.png';
import styles from './flight-card.module.css';

function FlightСard() {
    return (
        <>
            <div className={styles.route}>
                <div>Москва, ШЕРЕМЕЬЕВО</div>
                <div className={styles.airportInitials}>(SVO) - </div>
                <div>ЛОНДОН, Лондон</div>
                <div className={styles.airportInitials}>(LDN)</div>
            </div>
            <div className={styles.timeInformation}>
                <div className={styles.timeAndDate}>
                    <div className={styles.time}>14:20</div>
                    <div className={styles.date}>18 авг. вт</div>
                </div>
                <div className={styles.flightTime}>
                    <img className={styles.clockImg} src={clockImg} alt='' />
                    14 ч 15 мин
                </div>
                <div className={styles.timeAndDate}>
                    <div className={styles.date}>18 авг. вт</div>
                    <div className={styles.time}>14:20</div>
                </div>
            </div>
            <div className={styles.transplantInformationWrapper}>
                <div className={styles.line}></div>
                <div className={styles.transplantInformation}>1 Пересадка</div>
            </div>
            <div className={styles.companyInformation}>
                Рейс выполняет: Аэрофлот
            </div>
        </>
    );
}

export default FlightСard;
