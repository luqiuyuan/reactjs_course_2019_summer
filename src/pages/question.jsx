// third-party imports
import React, { Component, Fragment } from 'react';

// imports
import withPopup from '../components/popup';
import Header from '../components/header';
import server from '../components/server';
import Divider from '../components/divider';
import QuestionCard from '../components/question_card';

// style imports
import styles from './question.module.css';

class Question extends Component {

  constructor(props) {
    super(props);

    this._getQuestion();
    this._getAnswers();
  }

  render() {
    return (
      <div className={styles.container}>

        <Header />

        <div className={styles.panel_question}>
          <QuestionCard
            data={this.state?.question} />
        </div>

        <div className={styles.panel_answers}>

        </div>

      </div>
    );
  }

  _getQuestion = () => {
    server.getQuestion(this.props.match.params.id, this._getQuestionSuccessCallback);
  }
  _getQuestionSuccessCallback = (data) => {
    this.setState({ question: data.question });
  }

  _getAnswers = () => {
    server.getAnswers(this.props.match.params.id);
  }
  _getAnswersSuccessCallback = (data) => {
    this.setState({ answers: data.answers });
  }

}

export default withPopup(Question);
