import cn from 'classnames';
import styles from './Header.module.scss';
import { SvgIcon } from '../SvgIcon';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { StateContext } from '../../context/State';

export const Header = () => {
  const goodsInCart = useContext(StateContext);

  const count = goodsInCart.reduce((sum, item) => sum + item.count, 0);

  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <Link
          className={cn(styles.header__link, styles['header__link--logo'])}
          to="/"
        >
          ReactShop
        </Link>
        <Link
          className={cn(styles.header__link, styles['header__link--cart'])}
          to="/cart"
        >
          <SvgIcon type="cart" />
          {!!count && <p className={styles['header__cart-count']}>{count}</p>}
        </Link>
      </nav>
    </header>
  );
};
