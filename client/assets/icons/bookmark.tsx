import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function BookmarkIcon(props) {
  return (
    <Svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M11 13.5l-4-4-4 4v-12a1 1 0 011-1h6a1 1 0 011 1v12z"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default BookmarkIcon;
