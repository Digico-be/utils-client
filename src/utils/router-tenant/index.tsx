import { useAuth } from '../auth-context'
import { useRouter } from 'next/navigation'

export const getTenantUrl = (href: string): string => {
    const { tenant } = useAuth()
    return `/${tenant.id}${href}`
}

export const useRouterWithTenant = () => {
    const { tenant } = useAuth()
    const router = useRouter()

    return {
        back: () => router.back(),
        forward: () => router.forward(),
        prefetch: (href: string) => router.prefetch(`/${tenant.id}${href}`),
        push: (href: string) => router.push(`/${tenant.id}${href}`),
        replace: (href: string) => router.replace(`/${tenant.id}${href}`),
        refresh: (href: string) => router.refresh()
    }
}
