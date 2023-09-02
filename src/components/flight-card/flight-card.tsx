//Компонент карточки рейса

import clockImg from '../../images/clock.png';
import { FlightType } from '../../store/slices/ticketsSlice';
import styles from './flight-card.module.css';

type FlightСardPropsType = {
    flightInformation: FlightType;
    airlineName: string;
};

const FlightСard = ({
    flightInformation,
    airlineName,
}: FlightСardPropsType) => {
    const monthList = [
        'янв',
        'фев',
        'мар',
        'апр',
        'мая',
        'июн',
        'июл',
        'авг',
        'сен',
        'окт',
        'ноб',
        'дек',
    ];

    const daysList = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

    return (
        <>
            <div className={styles.route}>
                <div>{`${flightInformation?.departureСity}${
                    flightInformation?.departureСity ? ',' : ''
                } ${flightInformation?.departureAirport}`}</div>
                <div className={styles.airportInitials}>
                    {` (${flightInformation?.idDepartureAirport}) `} &rarr;
                </div>
                <div>{` ${flightInformation?.arrivalAirport}, ${flightInformation?.arrivalCity}`}</div>
                <div
                    className={styles.airportInitials}
                >{` (${flightInformation?.idArrivalAirport})`}</div>
            </div>
            <div className={styles.timeInformation}>
                <div className={styles.timeAndDate}>
                    <div className={styles.time}>{`${
                        new Date(flightInformation.departureDate).getHours() <
                        10
                            ? '0'
                            : ''
                    }${new Date(
                        flightInformation.departureDate
                    ).getHours()}:${new Date(
                        flightInformation.departureDate
                    ).getMinutes()}${
                        new Date(
                            flightInformation.departureDate
                        ).getMinutes() === 0
                            ? '0'
                            : ''
                    }`}</div>
                    <div className={styles.date}>{`${new Date(
                        flightInformation.departureDate
                    ).getDate()} ${
                        monthList[
                            new Date(
                                flightInformation.departureDate
                            ).getMonth() - 1
                        ]
                    }. ${
                        daysList[
                            new Date(flightInformation.departureDate).getDay() -
                                1
                        ]
                    }`}</div>
                </div>
                <div className={styles.flightTime}>
                    <img className={styles.clockImg} src={clockImg} alt='' />
                    {`${Math.trunc(
                        flightInformation.totalTimeMinutes / 60
                    )} ч ${flightInformation.totalTimeMinutes % 60} мин`}
                </div>
                <div className={styles.timeAndDate}>
                    <div className={styles.date}>{`${new Date(
                        flightInformation.arrivalDate
                    ).getDate()} ${
                        monthList[
                            new Date(flightInformation.arrivalDate).getMonth() -
                                1
                        ]
                    }. ${
                        daysList[
                            new Date(flightInformation.arrivalDate).getDay() - 1
                        ]
                    }`}</div>
                    <div className={styles.time}>{`${
                        new Date(flightInformation.arrivalDate).getHours() < 10
                            ? '0'
                            : ''
                    }${new Date(
                        flightInformation.arrivalDate
                    ).getHours()}:${new Date(
                        flightInformation.arrivalDate
                    ).getMinutes()}${
                        new Date(flightInformation.arrivalDate).getMinutes() ===
                        0
                            ? '0'
                            : ''
                    }`}</div>
                </div>
            </div>
            <div className={styles.transplantInformationWrapper}>
                <div className={styles.line}></div>
                {flightInformation.numberOfTransfers !== 0 ? (
                    <div
                        className={styles.transplantInformation}
                    >{`${flightInformation.numberOfTransfers} пересадка`}</div>
                ) : (
                    ''
                )}
            </div>
            <div className={styles.companyInformation}>
                {`Рейс выполняет: ${airlineName}`}
            </div>
        </>
    );
};

export default FlightСard;
