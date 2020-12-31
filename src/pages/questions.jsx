// third-party imports
import React, { Component } from 'react';

// imports
import withPopup from '../components/popup';
import Header from '../components/header';

// style imports
import styles from './questions.module.css';

class Questions extends Component {

  render() {
    return (
      <div className={styles.container}>
        <Header />
      </div>
    );
  }

}

export default withPopup(Questions);
