'use client'

import { createContext, ReactNode, useContext } from 'react'

const AuthContext = createContext<
    | {
          user: any
          tenant: any
      }
    | undefined
>(undefined)

export const AuthProvider = ({ children, user, tenant }: { children: ReactNode; tenant: any; user: any }) => {
    return <AuthContext.Provider value={{ user, tenant }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth need used inside AuthProvider')
    }
    return context
}
