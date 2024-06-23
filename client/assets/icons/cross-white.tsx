import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';

function CrossIcon() {
  return (
    <Svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <G
        clipPath="url(#clip0_1_7008)"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round">
        <Path d="M13.5.5l-13 13M.5.5l13 13" />
      </G>
      <Defs>
        <ClipPath id="clip0_1_7008">
          <Path fill="#fff" d="M0 0H14V14H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default CrossIcon;
