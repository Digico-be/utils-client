import cookies from 'js-cookie'

interface User {
    id: number
    firstname: string
    lastname: string
    email: string
}

interface Tenant {
    id: string
    name: string
}

export const useAuth = () => {
    const user = JSON.parse(cookies.get('user') ?? '') as User
    const tenant = JSON.parse(cookies.get('tenant') ?? '') as Tenant
    return { user, tenant }
}
