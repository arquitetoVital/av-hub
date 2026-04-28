"use client"
import styles from "./style.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdExpandMore } from "react-icons/md";
import { useState } from "react";
import menuItems from "./MenuItem/MenuItem";
import Link from "next/link";

const Menu = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const handleMenuItemClick = (menuId: string) => {    
    setExpandedMenu(expandedMenu === menuId ? null : menuId);
  };

  return (
    <aside className={isMinimized ? styles.minimized : styles.expanded}>
      <div className={styles.logo}>
        <Link href="/" className={styles.link}>
          <img src="./logo.png" alt="Aços Vital" className={isMinimized ? styles.hidden : styles.logoImg} />
        </Link>
        <GiHamburgerMenu
          className={styles.hamburger}
          onClick={() => setIsMinimized(!isMinimized)}
          title={isMinimized ? "Expandir" : "Minimizar"}
        />
      </div>
      <ul className={styles.menuContainer}>
        {menuItems.map((item) => (
          <li key={item.id} className={styles.menuWrapper}>
            <div
              className={styles.menuCard}
              onClick={() => {
                if (isMinimized) setIsMinimized(!isMinimized);
                if (item.submenu) {
                  handleMenuItemClick(item.id);
                }
              }}
            >
              {item.icon}
              <p className={isMinimized ? styles.hidden : ""}>
                {item.label}
              </p>
              {item.submenu && (
                <MdExpandMore
                  className={`${styles.expandIcon} ${expandedMenu === item.id ? styles.rotated : ""} ${isMinimized ? styles.hidden : ""}`}
                />
              )}
            </div>
            {item.submenu && expandedMenu === item.id && !isMinimized && (
              <ul className={styles.submenu}>
                {item.submenu.map((subitem) => (
                  <Link key={subitem.id} href={`/${item.id}/${subitem.id}` || "#"} className={styles.link}>
                    <li key={subitem.id} className={styles.submenuItem}>
                      {subitem.label}
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Menu;