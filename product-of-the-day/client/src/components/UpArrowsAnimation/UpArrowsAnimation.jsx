import React from 'react';
import upArrowsGif from '../../assets/up-arrow-animation.gif';

function UpArrowsAnimation({ size = 240 }) {
  return (
    <img
      src={upArrowsGif}
      height={size}
      width={size}
    />
  );
}

export default UpArrowsAnimation;
