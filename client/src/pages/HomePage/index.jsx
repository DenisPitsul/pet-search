import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.sass';

function HomePage () {
  return (
    <div className='container'>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Your search service for lost animals</h1>
        <p className={styles.subtitle}>
          We'll help you to find your pet or find an owner
        </p>
        <p className={styles.text}>
          Welcome to our lost pet search service! Whether you've lost a beloved
          pet or found an animal that needs to reunite with its owner, we're
          here to help.
        </p>
        <p className={styles.text}>
          Use our platform to post details of your lost pet, and we’ll spread
          the word to local communities and rescue organizations. If you've
          found an animal, create a post to help the rightful owner find their
          missing companion.
        </p>
        <p className={styles.text}>
          Our service is dedicated to reuniting lost pets with their families as
          quickly as possible. Together, we can help bring more pets home.
        </p>
        <div className={styles.searchLinksWrapper}>
          <Link className={styles.searchLink} to='/pet/create'>
            I am searching for my pet
          </Link>
          <Link className={styles.searchLink} to='/pets'>
            I am searching for an owner
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
