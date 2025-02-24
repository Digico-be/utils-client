import cookies from 'js-cookie'
export const useAuth = () => {
    const user = JSON.parse(cookies.get('user'))
    const tenant = JSON.parse(cookies.get('user'))
    return { user, tenant }
}
