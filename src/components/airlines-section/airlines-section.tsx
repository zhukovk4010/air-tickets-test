//Компонент фильтрации билетов по авиакомпаниям

import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { filterByNamedAirline } from '../../store/slices/ticketsSlice';
import styles from './airlines-section.module.css';

const AirlinesSection = () => {
    const airlineNameList = useAppSelector(
        (state) => state.tickets.airlineNameList
    );
    const airLineNameListUnDisabled = useAppSelector(
        (state) => state.tickets.airlineNameListUnDisabled
    );

    const dispatch = useAppDispatch();

    const onAirlineClick = (item: string) => {
        dispatch(filterByNamedAirline(item));
    };

    return (
        <section className={styles.pricingSection}>
            <h5>Авикомпании</h5>
            {airlineNameList.map((item, i) => {
                //Проверяем у каких компаний есть билеты и отключаем кнопки если необходимо
                let disabled = false;

                airLineNameListUnDisabled.includes(item)
                    ? (disabled = false)
                    : (disabled = true);

                return (
                    <div key={i} className={styles.pricingElement}>
                        <input
                            disabled={disabled}
                            onClick={() => onAirlineClick(item)}
                            id={item}
                            name='checkbox'
                            type='checkbox'
                            className={styles.checkbox}
                        />
                        <label htmlFor={item}>{item}</label>
                    </div>
                );
            })}
        </section>
    );
};

export default AirlinesSection;
