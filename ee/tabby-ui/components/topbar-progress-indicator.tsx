'use client'

import React from 'react'
import TopBarProgress from 'react-topbar-progress-indicator';

interface TopbarProgressProviderProps {
  children: React.ReactNode
}

interface TopbarProgressContextValue {
  progress: boolean
  setProgress: React.Dispatch<React.SetStateAction<boolean>>
}

const TopbarProgressContext = React.createContext<TopbarProgressContextValue>(
  {} as TopbarProgressContextValue
)

const TopbarProgressProvider: React.FC<TopbarProgressProviderProps> = ({ children }) => {
  const [progress, setProgress] = React.useState(false)
  React.useEffect(() => {
    TopBarProgress.config({
      barColors: {
        // 0: theme === 'dark' ? '#4D4638' : '#54452C',
        0: '#2563eb'
      },
      shadowBlur: 5,
    })
  }, [])

  return (
    <TopbarProgressContext.Provider value={{ progress, setProgress }}>
      {progress && <TopBarProgress />}
      {children}
    </TopbarProgressContext.Provider>
  )
}

const useTopbarProgress = () => {
  return React.useContext(TopbarProgressContext)
}

export {
  TopbarProgressProvider,
  useTopbarProgress
}