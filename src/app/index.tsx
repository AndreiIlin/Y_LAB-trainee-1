import { Route, Routes } from 'react-router-dom';
import useInit from '@src/hooks/use-init';
import Main from './main/index.js';
import Article from './article';
import Login from './login';
import Profile from './profile/index.js';
import Protected from '@src/containers/protected/index.js';
import useStore from '../hooks/use-store';
import Modals from './modals';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const store = useStore();
  useInit(async () => {
    await store.actions.session.remind();
  });

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/profile'} element={<Protected redirect="/login"><Profile /></Protected>} />
      </Routes>
      <Modals />
    </>
  );
}

export default App;
