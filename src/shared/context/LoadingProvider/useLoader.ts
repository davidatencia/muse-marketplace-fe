import { useContext } from 'react'
import { LoadingContext } from './LoadingContext'

export function useLoader() {
  const context = useContext(LoadingContext)

  if (!context) {
    throw new Error('useLoader must be used within a LoadingProvider')
  }

  return context
}
