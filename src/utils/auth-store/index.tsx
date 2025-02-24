import { create } from 'zustand'

interface UserType {
    firstname: string
    lastname: string
    email: string
}

interface TenantType {
    id: string
    name: string
}

interface AuthState {
    user: UserType | null
    tenant: TenantType | null
    setAuth: (user: UserType, tenant: TenantType) => void
    getAuth: () => { user: UserType | null; tenant: TenantType | null }
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    tenant: null,

    setAuth: (user, tenant) => set(() => ({ user, tenant })),

    getAuth: () => {
        const { user, tenant } = get()
        return { user, tenant }
    }
}))
