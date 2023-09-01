//Компонент фильтрации билетов

import styles from './pricing-section.module.css';

function PricingSection() {
    return (
        <section className={styles.pricingSection}>
            <h5>Цена</h5>
            <div className={styles.pricingElement}>
                <label htmlFor='from'>От</label>
                <input
                    name='number'
                    type='number'
                    id='from'
                    className={styles.numberImput}
                />
            </div>
            <div className={styles.pricingElement}>
                <label htmlFor='to'>До</label>
                <input
                    name='number'
                    type='number'
                    id='to'
                    className={styles.numberImput}
                />
            </div>
        </section>
    );
}

export default PricingSection;
