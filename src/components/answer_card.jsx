// third-party imports
import React, { Component } from 'react';

// imports
import Like from './like';

// style imports
import styles from './answer_card.module.css';

export default class AnswerCard extends Component {

  render() {
    return (
      <div className={styles.container}>
        
        <p className={styles.content}>{this.props.data?.content}</p>
        {this.props.showLike
        ? <Like
            className={styles.like}
            type="answer"
            id={this.props.data?.id}
            liked={this.props.data?.liked}
            count={this.props.data?.number_of_likes}
            onRequestRefresh={this.props.onRequestRefresh} />
        : null}
      </div>
    );
  }

}
