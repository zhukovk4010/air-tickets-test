//Компонент фильтрации билетов

import { useRef } from 'react';
import { useAppDispatch } from '../../hooks/store-hooks';
import {
    defaultFilter,
    filterByOneTranspant,
    filterWithoutTranspant,
} from '../../store/slices/ticketsSlice';
import styles from './filtration-section.module.css';

function FiltrationSection() {
    const dispatch = useAppDispatch();

    const onCheckboxClickWrapper = () => {
        let isOneChangeCheckboxActive = false;
        let isNonStopCheckboxActive = false;
        return (id: string) => {
            if (
                id === 'oneChange' &&
                isOneChangeCheckboxActive &&
                isNonStopCheckboxActive
            ) {
                dispatch(filterWithoutTranspant());
                isOneChangeCheckboxActive = false;
                return;
            }
            if (
                id === 'oneChange' &&
                isOneChangeCheckboxActive &&
                !isNonStopCheckboxActive
            ) {
                dispatch(defaultFilter());
                isOneChangeCheckboxActive = false;
                return;
            }
            if (
                id === 'oneChange' &&
                !isOneChangeCheckboxActive &&
                isNonStopCheckboxActive
            ) {
                dispatch(defaultFilter());
                isOneChangeCheckboxActive = true;
                return;
            }
            if (
                id === 'oneChange' &&
                !isOneChangeCheckboxActive &&
                !isNonStopCheckboxActive
            ) {
                dispatch(filterByOneTranspant());
                isOneChangeCheckboxActive = true;
                return;
            }
            if (
                id === 'nonStop' &&
                isNonStopCheckboxActive &&
                isOneChangeCheckboxActive
            ) {
                dispatch(filterByOneTranspant());
                isNonStopCheckboxActive = false;
                return;
            }
            if (
                id === 'nonStop' &&
                isNonStopCheckboxActive &&
                !isOneChangeCheckboxActive
            ) {
                dispatch(defaultFilter());
                isNonStopCheckboxActive = false;
                return;
            }
            if (
                id === 'nonStop' &&
                !isNonStopCheckboxActive &&
                isOneChangeCheckboxActive
            ) {
                dispatch(defaultFilter());
                isNonStopCheckboxActive = true;
                return;
            }
            if (
                id === 'nonStop' &&
                !isNonStopCheckboxActive &&
                !isOneChangeCheckboxActive
            ) {
                dispatch(filterWithoutTranspant());
                isNonStopCheckboxActive = true;
                return;
            }
        };
    };

    const onCheckboxClick = onCheckboxClickWrapper();

    return (
        <section className={styles.filtrationSection}>
            <h5>Фильтровать</h5>
            <div>
                <input
                    onClick={() => onCheckboxClick('oneChange')}
                    name='checkbox'
                    type='checkbox'
                    id='oneChange'
                    className={styles.checkbox}
                />
                <label htmlFor='oneChange'>- 1 пересадка</label>
            </div>
            <div>
                <input
                    onChange={() => onCheckboxClick('nonStop')}
                    name='checkbox'
                    type='checkbox'
                    id='nonStop'
                    className={styles.checkbox}
                />
                <label htmlFor='nonStop'>- без пересадок</label>
            </div>
        </section>
    );
}

export default FiltrationSection;
