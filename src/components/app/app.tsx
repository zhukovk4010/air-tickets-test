//Компонент приложения

//Импорты
import SearchSettingsPanel from '../search-settings-panel/search-settings-panel';
import styles from './app.module.css';

function App() {
    return (
        <main className={styles.app}>
            <SearchSettingsPanel />
            <div>Билеты</div>
        </main>
    );
}

export default App;
