import { NavLink } from 'react-router';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>      
      <nav className={styles.nav}>
        <NavLink to="/" className={({isActive}) => isActive ? styles.active : styles.link} end>
          Calculator
        </NavLink>

        <NavLink to="/calculations" className={({isActive}) => isActive ? styles.active : styles.link}>
          History
        </NavLink>

        <NavLink to="/stats" className={({isActive}) => isActive ? styles.active : styles.link}>
          Stats
        </NavLink>

        <NavLink to="/examples" className={({isActive}) => isActive ? styles.active : styles.link}>
          Examples
        </NavLink>

        <NavLink to="/info" className={({isActive}) => isActive ? styles.active : styles.link}>
          Info
        </NavLink>

        <NavLink to="/healthcheck" className={({isActive}) => isActive ? styles.active : styles.link}>
          System
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;