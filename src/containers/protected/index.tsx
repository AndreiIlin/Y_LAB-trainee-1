import useSelector from '@src/hooks/use-selector';
import { memo, ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface ProtectedProps {
  redirect: string;
  children: ReactNode;
}

function Protected({ children, redirect }: ProtectedProps) {

  const select = useSelector(state => ({
    exists: state.session.exists,
    waiting: state.session.waiting,
  }));

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!select.exists && !select.waiting) {
      navigate(redirect, { state: { back: location.pathname } });
    }
  }, [select.exists, select.waiting]);

  if (!select.exists || select.waiting) {
    return <div>Ждём...</div>;
  } else {
    return children;
  }
}

export default memo(Protected);
