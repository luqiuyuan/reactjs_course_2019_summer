import React from 'react';

export default function WhiteBlank({ w, h }) {
  return <div style={{ width: w, height: h }} />
}

WhiteBlank.defaultProps = {
  h: 0,
  w: 0
}
