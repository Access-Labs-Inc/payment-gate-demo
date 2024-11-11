"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { AccessSubscriptionProvider } from "@accessprotocol/payment-gate/dist/context";

const POOL_ADDRESS = process.env.NEXT_PUBLIC_POOL_ADDRESS ?? "";
const ACCESS_API_URL = process.env.NEXT_PUBLIC_ACCESS_API_URL;
if (POOL_ADDRESS === "") {
  throw new Error("NEXT_PUBLIC_POOL_ADDRESS is not set");
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <AccessSubscriptionProvider
        poolAddress={POOL_ADDRESS}
        accessApiUrl={ACCESS_API_URL}
      >
        {children}
      </AccessSubscriptionProvider>
    </QueryClientProvider>
  );
}
