// UserIcon.js (or a name of your choice)
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const UserIcon = ({ fill = '#000000', width = 20, height = 20 }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12.1992 12C14.9606 12 17.1992 9.76142 17.1992 7C17.1992 4.23858 14.9606 2 12.1992 2C9.43779 2 7.19922 4.23858 7.19922 7C7.19922 9.76142 9.43779 12 12.1992 12Z"
      stroke={fill}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3 22C3.57038 20.0332 4.74796 18.2971 6.3644 17.0399C7.98083 15.7827 9.95335 15.0687 12 15C16.12 15 19.63 17.91 21 22"
      stroke={fill}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default UserIcon;
