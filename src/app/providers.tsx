"use client";

import { QueryClient, QueryClientProvider } from "react-query"
import { Toaster } from 'react-hot-toast';
import { AppContext } from "@/context/AppContext";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppContext>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster />
      </QueryClientProvider>
    </AppContext>
  )
}