import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function LikeIcon() {
  return (
    <Svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M7.004 12.383L1.53 7.424c-2.975-2.975 1.398-8.688 5.474-4.066 4.076-4.622 8.43 1.11 5.475 4.066l-5.475 4.959z"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default LikeIcon;
