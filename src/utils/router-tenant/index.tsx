'use client'

import { useAuth } from '../auth-context'
import { useRouter } from 'next/navigation'

export const getTenantUrl = (href: string): string => {
    const { tenant } = useAuth()

    if (!tenant) {
        return href
    }

    return `/${tenant.id}${href}`
}

export const useRouterWithTenant = () => {
    const { tenant } = useAuth()

    if (!tenant) {
        return {
            back: () => router.back(),
            forward: () => router.forward(),
            prefetch: (href: string) => router.prefetch(`${href}`),
            push: (href: string) => router.push(`${href}`),
            replace: (href: string) => router.replace(`${href}`),
            refresh: (href: string) => router.refresh()
        }
    }

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
