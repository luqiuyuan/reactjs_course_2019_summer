// third-party imports
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

// imports
import withPopup from '../components/popup';
import Header from '../components/header';
import server from '../components/server';
import Divider from '../components/divider';
import QuestionCard from '../components/question_card';

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
              <QuestionCard
                data={question}
                onClickTitle={this._navToQuestion}
                onRequestRefresh={this._getQuestions}
                showLike={true} />
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

  _navToQuestion = (id) => {
    this.props.history.push('/questions/' + id);
  }

}

export default withRouter(withPopup(Questions));
