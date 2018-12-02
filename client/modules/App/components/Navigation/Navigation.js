import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import styles from './Navigation.css';

const Navigation = (props, context) => {
  return (
    <div className={styles.container}>
       <Link to="/home" className={styles.link}>Home</Link>
       <Link to="/" className={styles.link}>Posts</Link>
       <Link to="/about" className={styles.link}>About</Link>
    </div>
  );
}

Navigation.propTypes = {
};

export default Navigation;