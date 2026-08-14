import { createContext } from 'react'

export interface LoadingContextValue {
  isLoading: boolean
  startLoading: () => void
  stopLoading: () => void
}

export const LoadingContext = createContext<LoadingContextValue | undefined>(undefined)
