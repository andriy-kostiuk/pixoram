import { useContext } from 'react';
import { StateContext } from '../../context/State';
import { Good } from '../../types/good';
import { GoodCard } from '../GoodCard';
import styles from './GoodsList.module.scss';

interface Props {
  goods: Good[];
}

export const GoodsList: React.FC<Props> = ({ goods }) => {
  const goodsInCart = useContext(StateContext);

  return (
    <ul className={styles['goods-list']}>
      {goods.map((good) => {
        const isInCart = goodsInCart.some((item) => item.good.id === good.id);

        return <GoodCard key={good.id} good={good} isInCart={isInCart} />;
      })}
    </ul>
  );
};
