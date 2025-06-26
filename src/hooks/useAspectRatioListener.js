import { useEffect } from 'react';
import { throttle } from 'lodash';
import useAspectRatioStore from '@/store/useAspectRatioStore';

// 반응형 화면 조절
const useAspectRatioListener = () => {
  const setAspectRatio = useAspectRatioStore((state) => state.setAspectRatio);

  useEffect(() => {
    const handleResize = throttle(() => {
      setAspectRatio(window.innerWidth / window.innerHeight);
    }, 200);

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      handleResize.cancel?.();
    };
  }, [setAspectRatio]);
};

export default useAspectRatioListener;
