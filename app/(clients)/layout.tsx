'use client';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
export interface IClientLayoutProps {
    children: React.ReactNode;
}

export default function ClientLayout({ children }: IClientLayoutProps) {
    // giữ client khi hot reload
    const [queryClient] = React.useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                        refetchOnReconnect: false,
                        retry: 1,
                        staleTime: 1000 * 60,
                    },
                    mutations: {
                        retry: 1,
                    },
                },
            }),
    );
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
