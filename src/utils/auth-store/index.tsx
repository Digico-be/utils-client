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

export const authStore = create((set, get) => ({
    user: null as UserType | null,
    tenant: null as TenantType | null,

    setAuth(user: UserType, tenant: TenantType) {
        this.user = user
        this.tenant = tenant
    },

    getAuth() {
        return { user: this.user, tenant: this.tenant }
    }
}))
