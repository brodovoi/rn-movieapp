import * as React from 'react';
import Svg, { Circle, G, Path, Defs } from 'react-native-svg';

const RatingIcon = () => (
  <Svg
    width={17}
    height={16}
    viewBox="0 0 16 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Circle cx={8.19143} cy={7.59609} r={3.6133} fill="#FFD700" />
    <G filter="url(#filter0_b_149_182)">
      <Path
        d="M14.95 5.238l-4.333-.631L8.68.674a.548.548 0 00-.98 0L5.765 4.607l-4.333.63a.545.545 0 00-.467.549.548.548 0 00.165.385l3.135 3.061-.74 4.323a.547.547 0 00.791.576l3.875-2.04 3.876 2.04a.546.546 0 00.792-.576l-.74-4.323 3.134-3.061a.547.547 0 00-.302-.933z"
        fill="#FFD700"
      />
    </G>
    <Defs></Defs>
  </Svg>
);

export default RatingIcon;
