import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function DurationIcon() {
  return (
    <Svg
      width={17}
      height={17}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M8.726 1.37a7.228 7.228 0 00-7.227 7.226 7.228 7.228 0 007.227 7.227 7.228 7.228 0 007.226-7.227A7.228 7.228 0 008.726 1.37z"
        stroke="#BBB"
        strokeWidth={1.20443}
        strokeMiterlimit={10}
      />
      <Path
        d="M8.726 3.778v5.42h3.613"
        stroke="#BBB"
        strokeWidth={1.20443}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default DurationIcon;
