'use client'

import { PropsWithChildren } from 'react'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from './query-client'

type QueryClientProps = PropsWithChildren

export const QueryProvider = ({ children }: QueryClientProps) => (
    <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
)

export { queryClient }
