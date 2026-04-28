import { CiSearch } from "react-icons/ci";
import styles from "./style.module.css";
const Header = () => {
    return (
        <header className={styles.header}>
            <h1>Titulo</h1>
            <div className={styles.search}>
                <CiSearch />
                <input type="text" className={styles.searchInput} placeholder="Buscar..." />
            </div>
            <div>
                <p>login</p>
            </div>
        </header>
    )
}

export default Header;