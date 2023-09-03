//Компонент фильтрации билетов

import { useState } from 'react';
import styles from './pricing-section.module.css';
import { useAppDispatch } from '../../hooks/store-hooks';
import { filterByPrice, filterOffPrice } from '../../store/slices/ticketsSlice';

function PricingSection() {
    const dispatch = useAppDispatch();
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    const onButtonFilterClick = () => {
        dispatch(filterByPrice({ minPrice: minPrice, maxPrice: maxPrice }));
    };

    const onButtonOffFilterClick = () => {
        dispatch(filterOffPrice());
        setMinPrice(0);
        setMaxPrice(0);
    };

    return (
        <section className={styles.pricingSection}>
            <h5>Цена</h5>
            <div className={styles.pricingElement}>
                <label htmlFor='from'>От</label>
                <input
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    value={minPrice}
                    name='text'
                    type='text'
                    id='from'
                    className={styles.numberImput}
                />
            </div>
            <div className={styles.pricingElement}>
                <label htmlFor='to'>До</label>
                <input
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    value={maxPrice}
                    name='text'
                    type='text'
                    id='to'
                    className={styles.numberImput}
                />
            </div>
            <div className={styles.buttonWrapper}>
                <button onClick={onButtonFilterClick}>Искать</button>
                <button onClick={onButtonOffFilterClick}>
                    Убрать фильтр цены
                </button>
            </div>
        </section>
    );
}

export default PricingSection;
