import Header from "./Header/Header";
import Menu from "./Menu/Menu";
import styles from "./style.module.css";
const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <body className={styles.container}>
            <Menu />
            <div className={styles.content}>
                <Header />
                <main className={styles.mainContent}>
                    {children}
                </main>
            </div>
        </body>
    )
}

export default Layout;