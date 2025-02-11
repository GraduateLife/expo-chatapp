import { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';

export function useVisibilityWatcher(ref: React.RefObject<View>) {
  const [isVisible, setIsVisible] = useState(false);
  const windowHeight = Dimensions.get('window').height;
  const checkVisibility = () => {
    if (!ref.current) return;

    ref.current.measure((x, y, width, height, pageX, pageY) => {
      const isCurrentlyVisible =
        pageY >= 0 &&
        pageY <= windowHeight &&
        pageY + height >= 0 &&
        pageY + height <= windowHeight;
      setIsVisible(isCurrentlyVisible);
    });
  };
  useEffect(() => {
    // Check visibility on mount and when layout changes
    checkVisibility();

    return () => {
      setIsVisible(false);
    };
  }, [windowHeight]);

  return { isVisible, onLayout: checkVisibility };
}
