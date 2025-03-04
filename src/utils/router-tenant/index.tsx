'use client'

import { useAuth } from './../auth-context/useAuth'
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
    const router = useRouter()

    const getUrl = (href: string) => (tenant ? `/${tenant.id}${href}` : href)

    return {
        back: () => router.back(),
        forward: () => router.forward(),
        prefetch: (href: string) => router.prefetch(getUrl(href)),
        push: (href: string) => router.push(getUrl(href)),
        replace: (href: string) => router.replace(getUrl(href)),
        refresh: () => router.refresh()
    }
}
