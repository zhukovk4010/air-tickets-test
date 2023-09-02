//Компонент сортировки по времени и цене

import { useAppDispatch } from '../../hooks/store-hooks';
import {
    sortedByPriceAscending,
    sortedByPriceDescending,
    sortedByTime,
} from '../../store/slices/ticketsSlice';
import styles from './sorting-section.module.css';

function SortingSection() {
    const dispatch = useAppDispatch();

    const onRadioClick = (id: string) => {
        if (id === 'ascending') {
            dispatch(sortedByPriceDescending());
        }
        if (id === 'descending') {
            dispatch(sortedByPriceAscending());
        }
        if (id === 'byTime') {
            dispatch(sortedByTime());
        }
    };

    return (
        <section className={styles.sortingSection}>
            <h5>Сортировать</h5>
            <div>
                <input
                    onClick={() => {
                        onRadioClick('ascending');
                    }}
                    name='radio'
                    type='radio'
                    id='ascending'
                    className={styles.radio}
                />
                <label htmlFor='ascending'>- По возрастанию цены</label>
            </div>
            <div>
                <input
                    onClick={() => {
                        onRadioClick('descending');
                    }}
                    name='radio'
                    type='radio'
                    id='descending'
                    className={styles.radio}
                />
                <label htmlFor='descending'>- По убыванию цены</label>
            </div>
            <div>
                <input
                    onClick={() => {
                        onRadioClick('byTime');
                    }}
                    name='radio'
                    type='radio'
                    id='byTime'
                    className={styles.radio}
                />
                <label htmlFor='byTime'>- По времени в пути</label>
            </div>
        </section>
    );
}

export default SortingSection;
