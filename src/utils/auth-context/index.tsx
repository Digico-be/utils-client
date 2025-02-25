'use client'

import { useQuery } from '@tanstack/react-query'
import { cookiesNext } from '../cookies-next'
import { HttpRequestBuilder } from '../http-service'

const api = new HttpRequestBuilder(process.env.NEXT_PUBLIC_API_URL)

export const useAuth = () => {
    const auth = useQuery({
        queryFn: async () => {
            const tenant = (await cookiesNext()).get('X-tenant')
            return api
                .setHeader({ 'X-Tenant': `${tenant}` })
                .get<{
                    data: {
                        user: {
                            id: number
                            firstname: string
                            lastname: string
                            email: string
                        }
                        tenant: {
                            id: string
                            name: string
                        }
                    }
                }>(`/api/auth/user`)
                .then((response) => response.data)
        },
        queryKey: ['auth'],
        staleTime: Infinity,
        gcTime: Infinity
    })

    return {
        ...auth.data
    }
}
