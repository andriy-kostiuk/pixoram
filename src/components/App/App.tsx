import styles from './App.module.scss';

import { Header } from '../Header';
import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
