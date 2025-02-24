'use client'

import { useQuery } from '@tanstack/react-query'
import { cookiesNext } from '@utils/cookies-next'
import { HttpRequestBuilder } from '@utils/http-service'

const api = new HttpRequestBuilder(process.env.NEXT_PUBLIC_API_URL)

export const useAuth = () => {
    const auth = useQuery({
        queryFn: async () => {
            const tenant = (await cookiesNext()).get('X-tenant')
            return api.setHeader({ 'X-Tenant': `${tenant}` }).get(`/auth/user`)
        },
        queryKey: ['auth'],
        staleTime: Infinity,
        gcTime: Infinity
    })

    return auth.data
}
