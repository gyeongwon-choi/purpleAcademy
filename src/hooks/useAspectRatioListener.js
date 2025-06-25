import { useEffect } from 'react';
import { throttle } from 'lodash';
import useAspectRatioStore from '@/store/useAspectRatioStore';

// 전역 상태(store)에 200ms 단위로 업데이트
const useAspectRatioListener = () => {
  const setAspectRatio = useAspectRatioStore((state) => state.setAspectRatio);

  useEffect(() => {
    const handleResize = throttle(() => {
      setAspectRatio(window.innerWidth / window.innerHeight);
    }, 200); // 200ms마다 한 번

    window.addEventListener('resize', handleResize);
    handleResize(); // 초기 설정

    return () => {
      window.removeEventListener('resize', handleResize);
      handleResize.cancel?.(); // cleanup (lodash 지원 시)
    };
  }, [setAspectRatio]);
};

export default useAspectRatioListener;
