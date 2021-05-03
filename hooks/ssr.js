import { useSelector } from 'react-redux';

export const useSSR = () => {
  const ssrData = useSelector(({ ssr }) => ssr);

  const getSSRData = (key) => {
    return ssrData[key] || null;
  };

  return {
    getSSRData,
    ssrData,
  };
};
