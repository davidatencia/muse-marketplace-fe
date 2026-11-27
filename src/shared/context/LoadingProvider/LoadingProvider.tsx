import { useIsFetching } from '@tanstack/react-query';
import type { Query } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import Loader from '@shared/components/ui/Loader/Loader';
import styles from './LoadingProvider.module.css';

interface LoadingProviderProps {
  children: ReactNode;
}

function isInitialLoad(query: Query) {
  return query.state.data === undefined && query.getObserversCount() > 0;
}

function LoadingProvider({ children }: LoadingProviderProps) {
  const isLoading = useIsFetching({ predicate: isInitialLoad }) > 0;

  return (
    <>
      {children}
      {isLoading && (
        <div className={styles.overlay}>
          <Loader />
        </div>
      )}
    </>
  );
}

export default LoadingProvider;
