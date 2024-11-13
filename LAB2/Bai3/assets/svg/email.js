// EmailIcon.js
import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

const EmailIcon = ({ fill = '#000000', width = 20, height = 20 }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"
      stroke={fill}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Rect
      x="3"
      y="5"
      width="18"
      height="14"
      rx="2"
      stroke={fill}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

export default EmailIcon;
