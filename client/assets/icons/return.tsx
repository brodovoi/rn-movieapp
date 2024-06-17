import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function ReturnIcon() {
  return (
    <Svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M4.75.5L2.25 3l2.5 2.5"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.75 8.25A5.25 5.25 0 107 3H2.25"
        stroke="#ffff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default ReturnIcon;
