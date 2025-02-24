import Cookies from 'js-cookie'

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
    const userCookie = Cookies.get('user')
    const tenantCookie = Cookies.get('tenant')

    const user = userCookie ? (JSON.parse(userCookie) as User) : null
    const tenant = tenantCookie ? (JSON.parse(tenantCookie) as Tenant) : null

    return { user, tenant }
}
