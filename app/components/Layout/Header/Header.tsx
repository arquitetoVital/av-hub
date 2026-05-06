'use client';

import { CiSearch } from "react-icons/ci";
import styles from "./style.module.css";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
    const session = useSession()
    return (
        <header className={styles.header}>
            <h1>Aços Hub</h1>
            <div className={styles.search}>
                <CiSearch />
                <input type="text" className={styles.searchInput} placeholder="Buscar..." />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <p>{session.data?.user?.name}</p>
                <button onClick={() => signOut({
                    callbackUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/logout",
                })}>
                    Sair
                </button>
            </div>
        </header>
    )
}

export default Header;