import { useRef } from 'react';

import { useEffect } from 'react';

export const useHasStayedInViewForSeconds = (
  isVisibleNow: boolean,
  seconds: number,
  callback: () => void,
  deps: any[]
) => {
  const visibilityTimer = useRef<NodeJS.Timeout>();
  useEffect(() => {
    if (isVisibleNow) {
      // Start timer when message becomes visible
      visibilityTimer.current = setTimeout(() => {
        callback();
      }, seconds * 1000);
    } else if (visibilityTimer.current) {
      // Clear timer if message goes out of view before 3 seconds
      clearTimeout(visibilityTimer.current);
    }

    return () => {
      if (visibilityTimer.current) {
        clearTimeout(visibilityTimer.current);
      }
    };
  }, [isVisibleNow, ...deps]);
};
