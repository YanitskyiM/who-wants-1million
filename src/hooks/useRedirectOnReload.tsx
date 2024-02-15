import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Routes from '@/constants/router';
import IS_RELOADED from '@/constants/storage';

const useRedirectOnReload = () => {
  const router = useRouter();

  useEffect(() => {
    const handlePageReload = () => {
      if (sessionStorage.getItem(IS_RELOADED)) {
        router.push(Routes.HOME);
      } else {
        sessionStorage.setItem(IS_RELOADED, 'true');
      }
    };

    handlePageReload();

    return () => {
      sessionStorage.removeItem(IS_RELOADED);
    };
  }, [router]);
};

export default useRedirectOnReload;
