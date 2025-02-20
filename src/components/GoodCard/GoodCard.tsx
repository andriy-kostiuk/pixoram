import React, { useContext } from 'react';
import styles from './GoodCard.module.scss';
import { Good } from '../../types/good';
import { Link } from 'react-router-dom';
import { DispatchContext } from '../../context/State';
import classNames from 'classnames';

interface Props {
  good: Good;
  isInCart: boolean;
}

export const GoodCard: React.FC<Props> = React.memo(({ good, isInCart }) => {
  const { title, price, image, category, id } = good;

  const dispatch = useContext(DispatchContext);

  const onBtnClickHandler = () => {
    if (isInCart) {
      dispatch({ type: 'delete', payload: id });
    } else {
      dispatch({ type: 'add', payload: good });
    }
  };

  return (
    <div className={styles['good-card']}>
      <div className={styles['good-card__image-wrapper']}>
        <img src={image} alt={title} className={styles['good-card__image']} />
      </div>
      <div className={styles['good-card__content']}>
        <Link to={`/good/${id}`} className={styles['good-card__link']}>
          <h3 className={styles['good-card__title']}>{title}</h3>
        </Link>
        <div className={styles['good-card__category-wrapper']}>
          <span className={styles['good-card__category-label']}>Category:</span>
          <span className={styles['good-card__category']}>{category}</span>
        </div>
        <p className={styles['good-card__price']}>${price.toFixed(2)}</p>{' '}
        <button
          className={classNames(styles['good-card__btn'], {
            [styles['good-card__btn--remove']]: isInCart,
          })}
          onClick={onBtnClickHandler}
        >
          {isInCart ? 'Remove from cart' : 'Add to cart'}
        </button>
      </div>
    </div>
  );
});
