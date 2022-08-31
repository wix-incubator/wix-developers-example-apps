import React from 'react';
import Lottie from 'react-lottie';
import { getLottieDefaultOptions } from '../../utils';
import * as upArrowsAnimationData from '../../lottie/up-arrows.json';

function UpArrowsAnimation({ size = 240 }) {
  return (
    <Lottie
      isClickToPauseDisabled={true}
      options={getLottieDefaultOptions(upArrowsAnimationData)}
      height={size}
      width={size}
    />
  );
}

export default UpArrowsAnimation;
