// third-party imports
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

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

        <div className={styles.scrollable}>
          <div className={styles.panel}>
            {this.state?.questions?.map((question, index) =>
              <Fragment key={question.id}>
                <QuestionCard
                  data={question}
                  onClickTitle={this._navToQuestion}
                  onRequestRefresh={this._getQuestions} />
                {index < this.state.questions.length-1? <Divider /> : null}
              </Fragment>
            )}
          </div>
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

  _navToQuestion = (id) => {
    this.props.history.push('/questions/' + id);
  }

}

export default withRouter(withPopup(Questions));

class QuestionCard extends Component {

  render() {
    return (
      <div className={styles.question_card_container}>
        <p onClick={this._onClickTitle} className={styles.question_card_title}>{this.props.data?.title}</p>
        <p className={styles.question_card_content}>{this.props.data?.content}</p>
        <Like
          className={styles.question_card_like}
          type="question"
          id={this.props.data?.id}
          liked={this.props.data?.liked}
          count={this.props.data?.number_of_likes}
          onRequestRefresh={this.props.onRequestRefresh} />
      </div>
    );
  }

  _onClickTitle = () => {
    this.props.onClickTitle && this.props.onClickTitle(this.props.data?.id);
  }

}
