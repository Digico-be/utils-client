'use client'

import { createContext, ReactNode, useContext } from 'react'

interface UserType {
    firstname: string
    lastname: string
    email: string
}

interface TenantType {
    id: string
    name: string
}

const AuthContext = createContext<
    | {
          user: UserType
          tenant: TenantType
      }
    | undefined
>(undefined)

const initAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth doit être utilisé dans AuthProvider')
    }
    return context
}

if (typeof globalThis !== 'undefined') {
    globalThis.__DIGICO_USE_AUTH__ = initAuth
}

export const AuthProvider = ({ children, user, tenant }: { children: ReactNode; tenant: TenantType; user: UserType }) => {
    return <AuthContext.Provider value={{ user, tenant }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    if (typeof globalThis !== 'undefined' && globalThis.__DIGICO_USE_AUTH__) {
        return globalThis.__DIGICO_USE_AUTH__
    }
    throw new Error('useAuth must be provided. Assurez-vous que `AuthProvider` est bien chargé dans votre projet.')
}
