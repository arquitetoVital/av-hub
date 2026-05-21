'use client'
import { SessionProvider } from "next-auth/react";
import Header from "./Header/Header";
import Menu from "./Menu/Menu";
import styles from "./Layout.module.css";
const Layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <SessionProvider>
      <div className={styles.app}>
        <Menu />
        <div className={styles.shell}>
          <Header />
          <main className={styles.mainArea}>
            {children}
          </main>
        </div>
      </div>

    </SessionProvider>
  )
}

export default Layout;