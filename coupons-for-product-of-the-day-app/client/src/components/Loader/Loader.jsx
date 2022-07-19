import React from 'react';
import Lottie from 'react-lottie';
import { getLottieDefaultOptions } from '../../utils';
import * as loaderAnimationData from '../../lottie/loader.json';

function Loader({ size = 240 }) {
  return (
    <Lottie
      options={getLottieDefaultOptions(loaderAnimationData)}
      height={size}
      width={size}
    />
  );
}

export default Loader;
