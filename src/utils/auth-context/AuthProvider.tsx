'use client'

import { createContext } from 'react'

export const AuthContext = createContext(undefined)

export const AuthProvider = ({ children, user, tenant }) => {
    return <AuthContext.Provider value={{ user, tenant }}>{children}</AuthContext.Provider>
}
