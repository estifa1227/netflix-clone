import { useState, useEffect, useRef } from 'react';

export const useLazyImage = (src) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    setLoaded(false);
    setError(false);

    if (!src) {
      setError(true);
      return;
    }

    const img = new Image();
    imgRef.current = img;

    img.onload = () => {
      setLoaded(true);
      setError(false);
    };

    img.onerror = () => {
      setError(true);
      setLoaded(true);
    };

    img.src = src;

    return () => {
      if (imgRef.current) {
        imgRef.current.onload = null;
        imgRef.current.onerror = null;
      }
    };
  }, [src]);

  return { loaded, error, imgRef };
};
