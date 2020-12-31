// third-party imports
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

// imports
import withPopup from '../components/popup';
import Header from '../components/header';
import server from '../components/server';
import Divider from '../components/divider';
import Like from '../components/like';
import {
  ButtonRoundPlus,
  ButtonSquare,
} from '../components/buttons';
import Input from '../components/input';
import {
  validateExistence,
  validateMaxLength,
} from '../components/validation_rules';

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

        <ButtonRoundPlus
          className={styles.create_button}
          onClick={this._showCreatePopup} />

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

  _showCreatePopup = () => {
    this.props.popup.open(CreatePopup, { afterCreate: this._getQuestions });
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

class CreatePopup extends Component {
  
  state = {
    title: "",
    content: "",
  }

  render() {
    return (
      <div className={styles.create_popup_container}>
        <Input
          ref={ref => this._title_input = ref}
          placeholder="Title"
          validationRules={[ validateExistence, str => validateMaxLength(str, 255) ]}
          text={this.state.title}
          onTextChange={this._onTitleTextChange} />
        <Input
          ref={ref => this._content_input = ref}
          className={styles.create_popup_content}
          placeholder="Content"
          multiLine
          validationRules={[ str => validateMaxLength(str, 65535) ]}
          text={this.state.content}
          onTextChange={this._onContentTextChange} />
        <ButtonSquare
          className={styles.create_popup_button}
          label="Ask"
          onClick={this._onCreate} />
      </div>
    );
  }

  _onTitleTextChange = (title) => {
    this.setState({ title });
  }
  _onContentTextChange = (content) => {
    this.setState({ content });
  }

  _onCreate = () => {
    let is_title_valid = this._title_input && this._title_input.isValid();
    let is_content_valid = this._content_input && this._content_input.isValid();
    if (is_title_valid && is_content_valid) {
      server.createQuestion({
        title: this.state.title,
        content: this.state.content,
      }, this._onCreateSuccessCallbacl);
    }
  }
  _onCreateSuccessCallbacl = () => {
    this.props.closePopup();
    this.props.afterCreate();
  }

}
