import { useCallback, useState } from 'react';
import { useEvent } from 'react-use';

const useVisibility = (initialState = true): boolean => {
  const [isVisible, setIsVisible] = useState<boolean>(initialState);

  useEvent(
    'visibilitychange',
    useCallback(() => {
      setIsVisible(!document.hidden);
    }, []),
  );

  return isVisible;
};

export default useVisibility;
