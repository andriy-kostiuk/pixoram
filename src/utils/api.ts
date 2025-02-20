import { Good } from '../types/good';

const URL = 'https://fakestoreapi.com/products';

export const getGoods = async (): Promise<Good[]> => {
  const res = await fetch(URL);

  return res.json();
};
