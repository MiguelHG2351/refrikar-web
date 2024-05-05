'use client'
import { Provider as ReduxProvider } from 'react-redux'
import { AppStore, makeStore } from '@/config/redux'
import { useRef } from 'react'

export default function ClientsProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>()

  if (!storeRef.current) {
    storeRef.current = makeStore()
  }
  
  return (
    <ReduxProvider store={storeRef.current}>
      { children }
    </ReduxProvider>
  )
}

