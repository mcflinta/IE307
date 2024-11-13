// PasswordIcon.js
import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

const PasswordIcon = ({ fill = '#000000', width = 20, height = 20 }) => (
  <Svg width={width} height={height} viewBox="0 0 48 48" fill="none">
    <Path
      className="a"
      d="M24,25.28a3.26,3.26,0,0,0-1.64,6.07V36h3.32V31.35a3.28,3.28,0,0,0,1.61-2.8v0A3.27,3.27,0,0,0,24,25.28Z"
      stroke={fill}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Rect
      className="a"
      x="7.38"
      y="17.77"
      width="33.23"
      height="25.73"
      rx="4.32"
      stroke={fill}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Path
      className="a"
      d="M13.35,17.77V15.16a10.66,10.66,0,0,1,21.32,0v2.61"
      stroke={fill}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default PasswordIcon;
