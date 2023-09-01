//Компонент фильтрации билетов

import styles from './airlines-section.module.css';

function AirlinesSection() {
    return (
        <section className={styles.pricingSection}>
            <h5>Фильтрировать</h5>
            <div className={styles.pricingElement}>
                <input
                    name='checkbox'
                    type='checkbox'
                    className={styles.checkbox}
                />
                <label>Авикомпания 1</label>
            </div>
            <div className={styles.pricingElement}>
                <input
                    name='checkbox'
                    type='checkbox'
                    className={styles.checkbox}
                />
                <label>Авикомания цена</label>
            </div>
        </section>
    );
}

export default AirlinesSection;
