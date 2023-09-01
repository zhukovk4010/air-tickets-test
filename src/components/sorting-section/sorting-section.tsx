//Компонент сортировки по времени и цене

import styles from './sorting-section.module.css';

function SortingSection() {
    return (
        <section className={styles.sortingSection}>
            <h5>Сортировать</h5>
            <div>
                <input
                    name='radio'
                    type='radio'
                    id='ascending'
                    className={styles.radio}
                />
                <label htmlFor='ascending'>- По возрастанию цены</label>
            </div>
            <div>
                <input
                    name='radio'
                    type='radio'
                    id='descending'
                    className={styles.radio}
                />
                <label htmlFor='descending'>- По убыванию цены</label>
            </div>
            <div>
                <input
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
