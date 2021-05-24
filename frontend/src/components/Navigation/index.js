import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
// import './Navigation.css';
import styles from './Navigation.module.css'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <NavLink to="/create">Create</NavLink>
      <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className={styles.navMain}>
      <div className={styles.navContainer}>

        <div className={styles.navContainer}>
        <NavLink exact to="/cocktails">Cocktails</NavLink>
        {isLoaded && sessionLinks}
        </div>

    </div>
    </div>
  );
}

export default Navigation;