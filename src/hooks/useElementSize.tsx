"use client"

import { useState, useEffect, useCallback } from 'react';

const useElementSize = (elementId: string) => {
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  const updateSize = useCallback(() => {
    const element = document.getElementById(elementId);
    if (element) {
      setSize({
        width: element.offsetWidth,
        height: element.offsetHeight,
      });
    }
  }, [elementId]);

  useEffect(() => {
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, [updateSize]);

  return size;
};

export default useElementSize;
