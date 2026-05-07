'use client'
import { SessionProvider } from "next-auth/react";
import Header from "./Header/Header";
import Menu from "./Menu/Menu";
import styles from "./Layout.module.css";
const Layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <SessionProvider>
      <div className={styles.container}>
        <Menu />
        <div className={styles.content}>
          <Header />
          <main className={styles.mainContent}>
            {children}
          </main>
        </div>
      </div>

    </SessionProvider>
  )
}

export default Layout;