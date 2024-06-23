import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function ArrowBackIcon() {
  return (
    <Svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M13.5 7H.5M4 3.5L.5 7 4 10.5"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default ArrowBackIcon;
