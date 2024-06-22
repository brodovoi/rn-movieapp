import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';

function SearchIcon() {
  return (
    <Svg
      width={17}
      height={17}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <G
        clipPath="url(#clip0_1_7446)"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round">
        <Path d="M6 11.5a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13.5 13.5L10 10" />
      </G>
      <Defs>
        <ClipPath id="clip0_1_7446">
          <Path fill="#fff" d="M0 0H14V14H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SearchIcon;
