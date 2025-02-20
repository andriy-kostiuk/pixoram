import { Route, Routes } from 'react-router-dom';
import { App } from './components/App';
import { Goods } from './components/Goods';

export const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Goods />} />
      </Route>
    </Routes>
  );
};
