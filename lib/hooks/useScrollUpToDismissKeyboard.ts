import { useCallback, useRef } from 'react';
import { Keyboard } from 'react-native';

export const useScrollUpToDismissKeyboard = (
  keyboardCtrl: boolean,
  setKeyboardCtrl: (focused: boolean) => void
) => {
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const handleScroll = useCallback(
    (event: any) => {
      const currentY = event.nativeEvent.contentOffset.y;
      const currentTime = Date.now();
      const deltaY = currentY - lastScrollY.current;
      const deltaTime = currentTime - lastScrollTime.current;

      // Calculate velocity (pixels per millisecond)
      const velocity = deltaTime > 0 ? deltaY / deltaTime : 0;
      // If scrolling up (positive velocity) and input is focused, unfocus it
      // Adjust the threshold value (0.5) as needed
      if (velocity < -0.3 && keyboardCtrl) {
        setKeyboardCtrl(false);
        Keyboard.dismiss();
      }

      lastScrollY.current = currentY;
      lastScrollTime.current = currentTime;
    },
    [keyboardCtrl, setKeyboardCtrl]
  );
  return { handleScroll };
};
