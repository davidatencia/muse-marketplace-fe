import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import Loader from '@shared/components/ui/Loader/Loader'
import { LoadingContext } from './LoadingContext'
import { registerLoadingHandlers } from './loadingBridge'
import styles from './LoadingProvider.module.css'

interface LoadingProviderProps {
  children: ReactNode
}

function LoadingProvider({ children }: LoadingProviderProps) {
  const [pendingCount, setPendingCount] = useState(0)

  const startLoading = useCallback(() => {
    setPendingCount((count) => count + 1)
  }, [])

  const stopLoading = useCallback(() => {
    setPendingCount((count) => Math.max(0, count - 1))
  }, [])

  const isLoading = pendingCount > 0

  useEffect(() => {
    registerLoadingHandlers({ start: startLoading, stop: stopLoading })
    return () => registerLoadingHandlers(null)
  }, [startLoading, stopLoading])

  const value = useMemo(
    () => ({ isLoading, startLoading, stopLoading }),
    [isLoading, startLoading, stopLoading],
  )

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {isLoading && (
        <div className={styles.overlay}>
          <Loader />
        </div>
      )}
    </LoadingContext.Provider>
  )
}

export default LoadingProvider
