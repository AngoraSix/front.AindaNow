import { useSelector } from 'react-redux';

export const useBrands = () => {
  const brands = useSelector(({ brands }) => brands);
  return brands;
};
