import { useEffect } from 'react';
import { useApp } from './hooks/app/appHook';
import { AppLoading } from './components/common/appLoading/appLoading';

export function StartUp({ children }: {children: any}) {
  const { loading } = useApp();

  useEffect(() => {
    console.log('App initialize');
  }, []);

  return loading ? <AppLoading /> : children;
}
