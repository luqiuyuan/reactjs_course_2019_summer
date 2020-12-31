// third-party imports
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';

// imports
import withPopup from '../components/popup';
import Header from '../components/header';
import server from '../components/server';
import Divider from '../components/divider';
import Like from '../components/like';
import Input from '../components/input';
import {
  ButtonSquare,
  ButtonRoundPlus,
} from '../components/buttons';
import {
  validateExistence,
  validateMaxLength,
} from '../components/validation_rules';
import Avatar from '../components/avatar';

// style imports
import styles from './question.module.css';

class Question extends Component {

  state = {
    creating_answer: false,
  }

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

          {this.state.creating_answer
          ? <WrappedCreatePanel
              afterCreate={() => {
                this.setState({ creating_answer: false });
                this._getAnswers();
              }} />
          : null}

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

        <ButtonRoundPlus
          className={styles.create_button}
          onClick={() => this.setState({ creating_answer: true })} />

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

  constructor(props) {
    super(props);

    this._getUser();
  }

  render() {
    return (
      <div className={styles.answer_card_container}>
        <div className={styles.answer_card_user_container}>
          <Avatar
            userID={this.props.data?.user_id}
            src={this.state?.user?.avatar_url} />
          <div className={styles.answer_card_text_container}>
            <p className={styles.answer_card_name}>{this.state?.user?.name}</p>
            <p className={styles.answer_card_time}>{this.props.data?.created_at}</p>
          </div>
        </div>
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

  _getUser = () => {
    server.getUser(this.props.data?.user_id, this._getUserSuccessCallback);
  }
  _getUserSuccessCallback = (data) => {
    this.setState({ user: data.user });
  }

}

class CreatePanel extends Component {

  state = {
    content: "",
  }

  render() {
    return (
      <div className={styles.create_panel_container}>
        <Input
          ref={ref => this._content_input = ref}
          placeholder="Write your answer..."
          multiLine
          validationRules={[ validateExistence, str => validateMaxLength(str, 65535) ]}
          text={this.state.content}
          onTextChange={this._onContentTextChange} />
        <ButtonSquare
          className={styles.create_panel_button}
          label="Answer"
          onClick={this._onCreate} />
      </div>
    );
  }

  _onContentTextChange = (content) => {
    this.setState({ content });
  }

  _onCreate = () => {
    let is_content_valid = this._content_input && this._content_input.isValid();
    if (is_content_valid) {
      server.createAnswer(this.props.match.params.id, { content: this.state.content }, this._onCreateSuccessCallback);
    }
  }
  _onCreateSuccessCallback = () => {
    this.setState({ content: "" });
    this.props.afterCreate && this.props.afterCreate();
  }

}

const WrappedCreatePanel = withRouter(CreatePanel);
