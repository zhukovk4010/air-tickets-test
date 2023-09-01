//Компонент приложения

//Импорты
import SearchSettingsPanel from '../search-settings-panel/search-settings-panel';
import Ticket from '../ticket/ticket';
import styles from './app.module.css';

function App() {
    return (
        <main className={styles.app}>
            <SearchSettingsPanel />
            <div>
                <Ticket />
            </div>
        </main>
    );
}

export default App;
