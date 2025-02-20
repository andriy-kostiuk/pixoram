import styles from './Goods.module.scss';
import { GoodsList } from '../GoodsList';
import React, { useEffect, useState } from 'react';
import { getGoods } from '../../utils/api';
import { Good } from '../../types/good';
import { Selector } from '../Selector';
import { Pagination } from '../Pagination';
import { useUpdateSearchParams } from '../../hooks';

export const Goods: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [goods, setGoods] = useState<Good[]>([]);
  const [error, setError] = useState('');

  const [searchParams, updateSearchParams] = useUpdateSearchParams();

  const PER_PAGE = 4;

  useEffect(() => {
    setLoading(true);

    getGoods()
      .then((goods) => {
        setGoods(goods);
      })
      .catch(() => {
        setError('Something went wrong, reload page.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const categoryItems = [
    'all',
    ...Array.from(new Set(goods.map((good) => good.category))),
  ];

  const refineGoods = (g: Good[]) => {
    const currentCategory = searchParams.get('category')?.toLowerCase();

    if (
      currentCategory &&
      currentCategory !== 'all' &&
      categoryItems.includes(currentCategory)
    ) {
      return g.filter((good) => good.category === currentCategory);
    }

    return g;
  };

  const refinedGoods = refineGoods(goods);

  const getCurrentPage = () => {
    let page = Number(searchParams.get('page')) ?? 1;

    if (isNaN(page) || page < 1) {
      page = 1;
    }

    const maxPages = Math.ceil(refinedGoods.length / PER_PAGE);

    return page > maxPages ? maxPages : page;
  };

  const currentPage = getCurrentPage();

  const getVisibleGoods = (g: Good[]) => {
    let startIndex = (currentPage - 1) * PER_PAGE;

    const endIndex =
      currentPage * PER_PAGE > g.length ? g.length : currentPage * PER_PAGE;

    return g.slice(startIndex, endIndex);
  };

  const visibleGoods = getVisibleGoods(refinedGoods);

  let content;

  if (error) {
    content = <p>{error}</p>;
  } else {
    content = loading ? (
      <p>Loading...</p>
    ) : (
      <>
        <div className={styles.goods__controllers}>
          <Selector title="Category" type="category" items={categoryItems} />
        </div>
        <GoodsList goods={visibleGoods} />
        <Pagination
          total={refinedGoods.length}
          perPage={PER_PAGE}
          currentPage={currentPage}
          onPageChange={(page) => updateSearchParams('page', page)}
          className={styles.goods__pagination}
        />
      </>
    );
  }

  return (
    <section className={styles.goods}>
      <div>
        <h1 className={styles.goods__title}>Goods</h1>
        {loading ? (
          ''
        ) : (
          <p className={styles.goods__count}>
            {refinedGoods.length} good{refinedGoods.length === 1 ? '' : 's'} in
            the store.
          </p>
        )}
      </div>
      {content}
    </section>
  );
};
