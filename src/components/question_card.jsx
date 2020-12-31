// third-party imports
import React, { Component } from 'react';

// imports
import Like from './like';

// style imports
import styles from './question_card.module.css';

export default class QuestionCard extends Component {

  render() {
    return (
      <div className={styles.container}>
        <p onClick={this._onClickTitle} className={styles.title}>{this.props.data?.title}</p>
        <p className={styles.content}>{this.props.data?.content}</p>
        {this.props.showLike
        ? <Like
            className={styles.like}
            type="question"
            id={this.props.data?.id}
            liked={this.props.data?.liked}
            count={this.props.data?.number_of_likes}
            onRequestRefresh={this.props.onRequestRefresh} />
        : null}
      </div>
    );
  }

  _onClickTitle = () => {
    this.props.onClickTitle && this.props.onClickTitle(this.props.data?.id);
  }

}
