import React from 'react';
import './styles/Text.css';

export default function Text({ type, children, ...rest }) {
  return <p {...rest} className={'text-base ' + type}>{children}</p>
}
