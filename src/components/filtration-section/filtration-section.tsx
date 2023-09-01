//Компонент фильтрации билетов

import styles from './filtration-section.module.css';

function FiltrationSection() {
    return (
        <section className={styles.filtrationSection}>
            <h5>Фильтровать</h5>
            <div>
                <input
                    name='checkbox'
                    type='checkbox'
                    id='oneChange'
                    className={styles.checkbox}
                />
                <label htmlFor='oneChange'>- 1 пересадка</label>
            </div>
            <div>
                <input
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
