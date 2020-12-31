// third-party imports
import React, { Component } from 'react';

// imports
import server from './server';

// asset imports
import icon_triangle_orange from '../assets/images/icons/triangle-orange.svg';
import icon_tirangle_white from '../assets/images/icons/triangle-white.svg';

// style imports
import styles from './like.module.css';

export default class Like extends Component {

  render() {
    return (
      <div
        className={`${styles.container} ${this.props.liked? styles.container_liked : styles.container_unliked} ${this.props.className}`}
        onClick={this._handleClick}>

        <img
          alt="triangle icon"
          src={this.props.liked? icon_tirangle_white : icon_triangle_orange} />

        <p className={`${styles.label} ${this.props.liked? styles.label_liked : styles.label_unliked}`}>Agree</p>

        <p className={`${styles.label} ${this.props.liked? styles.label_liked : styles.label_unliked}`}>{this.props.count}</p>
        
      </div>
    );
  }

  _handleClick = () => {
    if (this.props.id) {
      if (this.props.type === 'question') {
        if (this.props.liked) {
          server.deleteLikeForQuestion(this.props.id, this._handleClickSuccessCallback);
        } else {
          server.createLikeForQuestion(this.props.id, this._handleClickSuccessCallback);
        }
      } else {
        if (this.props.liked) {
          server.deleteLikeForAnswer(this.props.id, this._handleClickSuccessCallback);
        } else {
          server.createLikeForAnswer(this.props.id, this._handleClickSuccessCallback);
        }
      }
    }
  }
  _handleClickSuccessCallback = () => {
    this.props.onRequestRefresh && this.props.onRequestRefresh();
  }

}
