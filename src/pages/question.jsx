// third-party imports
import React, { Component, Fragment } from 'react';

// imports
import withPopup from '../components/popup';
import Header from '../components/header';
import server from '../components/server';
import Divider from '../components/divider';
import Like from '../components/like';

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

        <div className={styles.scrollable}>

          <div className={styles.panel_question}>
            <p className={styles.title}>{this.state?.question?.title}</p>
            <p className={styles.content}>{this.state?.question?.content}</p>
          </div>

          <div className={styles.panel_answers}>
            {this.state?.answers?.map((answer, index) =>
              <Fragment>
                <AnswerCard
                  data={answer}
                  onRequestRefresh={this._getAnswers} />
                {index < this.state.answers.length-1? <Divider /> : null}
              </Fragment>
            )}
          </div>
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
    server.getAnswers(this.props.match.params.id, this._getAnswersSuccessCallback);
  }
  _getAnswersSuccessCallback = (data) => {
    this.setState({ answers: data.answers });
  }

}

export default withPopup(Question);

class AnswerCard extends Component {

  render() {
    return (
      <div className={styles.answer_card_container}>
        <p className={styles.answer_card_content}>{this.props.data?.content}</p>
        <Like
          className={styles.answer_card_like}
          type="answer"
          id={this.props.data?.id}
          liked={this.props.data?.liked}
          count={this.props.data?.number_of_likes}
          onRequestRefresh={this.props.onRequestRefresh} />
      </div>
    );
  }

}
