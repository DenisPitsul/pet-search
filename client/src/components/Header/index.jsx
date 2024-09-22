import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Header.module.sass';
import logo from '../../assets/logo.png';

function Header () {
  const navLinkClassNames = ({ isActive }) =>
    classNames(styles.navLink, { [styles.activeLink]: isActive });

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link className={styles.logoLink} to='/'>
          <img src={logo} className={styles.logoImage} alt='Logo' />
          Pet Search
        </Link>
        <nav className={styles.navigation}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <NavLink className={navLinkClassNames} to='/'>
                Home
              </NavLink>
            </li>
            <li className={styles.menuItem}>
              <NavLink className={navLinkClassNames} to='/pet/create'>
                Find my pet
              </NavLink>
            </li>
            <li className={styles.menuItem}>
              <NavLink className={navLinkClassNames} to='/pets'>
                Our pets
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
