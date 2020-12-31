// third-party imports
import React, { Component } from 'react';

// imports
import withPopup from '../components/popup';
import Header from '../components/header';
import server from '../components/server';

// style imports
import styles from './questions.module.css';

class Questions extends Component {

  constructor(props) {
    super(props);

    this._getQuestions();
  }

  render() {
    return (
      <div className={styles.container}>

        <Header />

        <div className={styles.panel}>
        </div>

      </div>
    );
  }

  _getQuestions = () => {
    server.getQuestions(this._getQuestionsSuccessCallback);
  }
  _getQuestionsSuccessCallback = (data) => {
    this.setState({ questions: data.questions });
  }

}

export default withPopup(Questions);
