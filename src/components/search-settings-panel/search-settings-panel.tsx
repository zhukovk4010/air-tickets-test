//Компонент панели настроек поиска билетов

import AirlinesSection from '../airlines-section/airlines-section';
import FiltrationSection from '../filtration-section/filtration-section';
import PricingSection from '../pricing-section/pricing-section';
import SortingSection from '../sorting-section/sorting-section';
import styles from './search-settings-panel.module.css';

function SearchSettingsPanel() {
    return (
        <aside className={styles.searchSettingsPanel}>
            <SortingSection />
            <FiltrationSection />
            <PricingSection />
            <AirlinesSection />
        </aside>
    );
}

export default SearchSettingsPanel;
