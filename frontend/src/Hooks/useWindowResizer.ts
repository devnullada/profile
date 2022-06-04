import { useCallback, useEffect, useRef } from 'react';

export interface IUseWindowResizer {
  (e: Event): void;
}

const useWindowResizer = (callback: IUseWindowResizer | undefined) => {
  const resizeTimer = useRef(0);

  const windowResizeHandler = useCallback(
    (e: Event) => {
      if (callback) callback(e);
    },
    [callback]
  );
  const windowResizeDebounce = useCallback(
    (e: Event) => {
      clearTimeout(resizeTimer.current);
      resizeTimer.current = window.setTimeout(windowResizeHandler, 10, e);
    },
    [windowResizeHandler]
  );

  useEffect(() => {
    if (!callback) return;
    window.addEventListener('resize', windowResizeDebounce);
    return () => {
      window.removeEventListener('resize', windowResizeDebounce);
    };
  }, [windowResizeDebounce, callback]);
};

export default useWindowResizer;
