// third-party imports
import React, { Component, Fragment } from 'react';

// imports
import withPopup from '../components/popup';
import Header from '../components/header';
import server from '../components/server';
import Divider from '../components/divider';
import Like from '../components/like';

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
          {this.state?.questions.map(question =>
            <Fragment key={question.id}>
              <Question
                data={question}
                onRequestRefresh={this._getQuestions} />
              <Divider />
            </Fragment>
          )}
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

class Question extends Component {

  render() {
    return (
      <div className={styles.question_container}>
        <p className={styles.question_title}>{this.props.data?.title}</p>
        <p className={styles.question_content}>{this.props.data?.content}</p>
        <Like
          className={styles.question_like}
          type="question"
          id={this.props.data?.id}
          liked={this.props.data?.liked}
          count={this.props.data?.number_of_likes}
          onRequestRefresh={this.props.onRequestRefresh} />
      </div>
    );
  }

}
