import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';

function PlayIcon() {
  return (
    <Svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <G clipPath="url(#clip0_1_11604)">
        <Path
          d="M1.436 12.33a1.14 1.14 0 00.63 1 1.24 1.24 0 001.22 0l8.65-5.35a1.11 1.11 0 000-2L3.286.67a1.24 1.24 0 00-1.22 0 1.14 1.14 0 00-.63 1v10.66z"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_11604">
          <Path fill="#fff" d="M0 0H14V14H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default PlayIcon;
