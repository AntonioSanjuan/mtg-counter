import { useEffect } from 'react';
import { Loading } from './components/common/loading/loading';
import { useApp } from './hooks/app/appHook';

export function StartUp({ children }: {children: any}) {
  const { loading } = useApp();

  useEffect(() => {
    console.log('App initialize');
  }, []);

  return loading ? <Loading /> : children;
}
