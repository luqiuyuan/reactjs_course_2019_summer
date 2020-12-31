// third-party imports
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// style imports
import styles from './avatar.module.css';

class Avatar extends Component {

  render() {
    return (
      <img
        className={`${styles.image} ${this.props.className}`}
        src="https://i.nextmedia.com.au/Utils/ImageResizer.ashx?n=http%3a%2f%2fi.nextmedia.com.au%2fNews%2f20100804084556_funny-cat.jpg&w=480&c=0&s=1" />
    );
  }

}

export default withRouter(Avatar);
