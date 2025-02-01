import { useLocation, Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {

    const location = useLocation();

    const isActive = (path) => location.pathname === path;
    return (
        <div className={styles.leftPanel}>

            <ul className={styles.navBar}>
                <Link to="/dashboard" className={`${styles.navLink} ${isActive('/dashboard') ? styles.active : ''}`}>

                    <li className={styles.navItem}>
                        <img src='../icons/Icons.svg' alt='dashboard' className={styles.iconImage} />
                        Dashboard
                    </li>
                </ Link>
                <Link to="/links" className={`${styles.navLink} ${isActive('/links') ? styles.active : ''}`}>
                    <li className={styles.navItem} >
                        <img src='../icons/Icons-1.svg' alt='dashboard' className={styles.iconImage} />
                        Links
                    </li>
                </ Link>

                <Link to="/analytics" className={`${styles.navLink} ${isActive('/analytics') ? styles.active : ''}`}>

                    <li className={styles.navItem} >
                        <img src='../icons/Icons-2.svg' alt='dashboard' className={styles.iconImage} />
                        Analytics
                    </li>
                </Link>

            </ul>

            <hr className={styles.line}></hr>

            <Link to="/settings" className={`${styles.navLink} ${isActive('/settings') ? styles.active : ''}`}>

                <div className={styles.navItem}>
                    <img src='../icons/Icons-3.svg' alt='dashboard' className={styles.iconImage} />
                    Settings
                </div>
            </ Link>


            <hr className={styles.line}></hr>
        </div>

    )
}

export default Navbar;