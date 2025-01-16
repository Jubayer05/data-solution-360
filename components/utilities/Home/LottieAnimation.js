import lottie from 'lottie-web';
import React, { useEffect, useRef } from 'react';

const LottieAnimation = ({
  animationData,
  loop = true,
  autoplay = true,
  style = {},
  className = '',
  rendererSettings = {
    preserveAspectRatio: 'xMidYMid slice',
  },
}) => {
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    animationRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop,
      autoplay,
      animationData,
      rendererSettings,
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
      }
    };
  }, [animationData, loop, autoplay, rendererSettings]);

  return <div ref={containerRef} style={style} className={className} />;
};

export default LottieAnimation;
