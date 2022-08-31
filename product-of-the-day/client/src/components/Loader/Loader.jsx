import React from 'react';
import loaderGif from '../../assets/loader.gif';

function Loader({ size = 240 }) {
  return (
    <img
      src={loaderGif}
      height={size}
      width={size}
    />
  );
}

export default Loader;
