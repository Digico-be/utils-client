'use client'

import { createContext } from 'react'

export const AuthContext = createContext(undefined)

export const AuthProvider = ({ children, user, tenant, modules }) => {
    return <AuthContext.Provider value={{ user, tenant, modules }}>{children}</AuthContext.Provider>
}
