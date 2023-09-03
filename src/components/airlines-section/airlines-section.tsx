//Компонент фильтрации билетов

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { filterByNamedAirline } from '../../store/slices/ticketsSlice';
import styles from './airlines-section.module.css';

function AirlinesSection() {
    const { airlineNameList, airLineNameListUnDisabled } = useAppSelector(
        (state) => ({
            airlineNameList: state.tickets.airlineNameList,
            airLineNameListUnDisabled: state.tickets.airlineNameListUnDisabled,
        })
    );

    const dispatch = useAppDispatch();

    const onAirlineClick = (item: string) => {
        dispatch(filterByNamedAirline(item));
    };

    return (
        <section className={styles.pricingSection}>
            <h5>Авикомпании</h5>
            {airlineNameList.map((item, i) => {
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
}

export default AirlinesSection;
