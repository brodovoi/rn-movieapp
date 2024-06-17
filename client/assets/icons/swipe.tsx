// import * as React from 'react';
// import Svg, { G, Path } from 'react-native-svg';

// function SwipeIcon(props) {
//   return (
//     <Svg
//       xmlns="http://www.w3.org/2000/svg"
//       x="0px"
//       y="0px"
//       width={64}
//       height={64}
//       viewBox="0 0 172 172"
//       fill="#26e07f"
//       {...props}>
//       <G
//         fill="none"
//         strokeMiterlimit={10}
//         fontFamily="none"
//         fontWeight="none"
//         fontSize="none"
//         textAnchor="none"
//         style={{
//           mixBlendMode: 'normal',
//         }}>
//         <Path d="M0 172V0h172v172z" />
//         <Path
//           d="M21.5 21.5v129H86v-129zM86 53.75C86 71.53 100.47 86 118.25 86s32.25-14.47 32.25-32.25-14.47-32.25-32.25-32.25S86 35.97 86 53.75zM118.25 86C100.47 86 86 100.47 86 118.25s14.47 32.25 32.25 32.25 32.25-14.47 32.25-32.25S136.03 86 118.25 86z"
//           fill="#1fb141"
//         />
//       </G>
//     </Svg>
//   );
// }

// export default SwipeIcon;

import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

function SwipeIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={64}
      height={64}
      viewBox="0 0 172 172"
      fill="#26e07f"
      {...props}>
      <G
        fill="none"
        strokeMiterlimit={10}
        fontFamily="none"
        fontWeight="none"
        fontSize="none"
        textAnchor="none"
        style={{
          mixBlendMode: 'normal',
        }}>
        <Path d="M0 172V0h172v172z" />
        <Path
          d="M21.5 21.5v129H86v-129zM86 53.75C86 71.53 100.47 86 118.25 86s32.25-14.47 32.25-32.25-14.47-32.25-32.25-32.25S86 35.97 86 53.75zM118.25 86C100.47 86 86 100.47 86 118.25s14.47 32.25 32.25 32.25 32.25-14.47 32.25-32.25S136.03 86 118.25 86z"
          fill="#1fb141"
        />
      </G>
    </Svg>
  );
}

export default SwipeIcon;
