import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import styles from './Navigation.css';

const Navigation = (props, context) => {
  return (
    <div className={styles.container}>
       <Link to="/" className={styles.link}><FormattedMessage id="home"/></Link>
       <Link to="/list" className={styles.link}><FormattedMessage id="list"/></Link>
       <Link to="/about" className={styles.link}><FormattedMessage id="about"/></Link>
    </div>
  );
}

Navigation.propTypes = {
};

export default Navigation;