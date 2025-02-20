import cn from 'classnames';
import { scrollToTop } from '../../utils/utility';
import { Button } from '../Button';
import styles from './PaginationItem.module.scss';

interface Props {
  page: number;
  onPageChange: (page: number) => void;
  isCurrent: boolean;
  className?: string;
}

export const PaginationItem: React.FC<Props> = ({
  page,
  onPageChange,
  isCurrent,
  className,
}) => {
  const onBtnClickHandler = () => {
    if (!isCurrent) {
      onPageChange(page);
      scrollToTop();
    }
  };

  return (
    <div className={cn(styles['pagination-item'], className)}>
      <Button
        className={cn(styles['pagination-item__btn'], {
          [styles['pagination-item__btn--active']]: isCurrent,
        })}
        onClick={onBtnClickHandler}
      >
        {page}
      </Button>
    </div>
  );
};
