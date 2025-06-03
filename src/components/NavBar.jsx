import { useState } from 'react'
import { useNavigate } from 'react-router'
import styles from './NavBar.module.css'

import { menu_items } from '../data/menuitems'

export default function NavBar() {

    const navigate = useNavigate();

    const [openMenu, setOpenMenu] = useState(null); // which submenu is open

    const handleNavigation = (path) => (e) => {
        e.preventDefault();
        navigate(path);
    };

    const toggleSubMenu = (menu) => {
        setOpenMenu((prev) => (prev === menu ? null : menu));
    };

    return (
        <nav className={styles.mainbar} role="navigation">
            <div className={styles.mainbarcontainer}>
                <div className={styles.brand}>
                    <h3 className={styles.brandtext}>React-StoryTeller</h3>
                </div>
                <ul className={styles.navitems}>
                    <li className={styles.navitem}>
                        <a href="/" onClick={handleNavigation('/')}>Home</a>
                    </li>
                    <li className={styles.navitem}>
                        <a href="/settings" onClick={handleNavigation('/settings')}>Settings</a>
                    </li>
                    {menu_items.map(({ label, subItems }) => (
                        <li key={label} className={styles.navitem}>
                            <button
                                className={styles.navlinkButton}
                                onClick={() => toggleSubMenu(label)}
                                aria-expanded={openMenu === label}
                            >
                                {label}
                            </button>
                            {openMenu === label && (
                                <ul className={styles.submenu}>
                                    {subItems.map(({ name, path }) => (
                                        <li key={path}>
                                            <a href={path} onClick={handleNavigation(path)}>{name}</a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}