// account.svg
import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const AccountIcon = ({ fill, width, height }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="8" r="4" stroke={fill} strokeWidth="2" fill="none" />
    <Path
      d="M4 20C4 16 8 14 12 14C16 14 20 16 20 20"
      stroke={fill}
      strokeWidth="2"
      fill="none"
    />
  </Svg>
);

export default AccountIcon;