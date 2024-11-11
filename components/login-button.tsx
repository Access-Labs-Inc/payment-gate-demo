"use client";

import Link from "next/link";
import { useSubscription } from "@accessprotocol/payment-gate";
import { getPaymentGateUrl } from "@accessprotocol/payment-gate";

const POOL_ADDRESS = process.env.NEXT_PUBLIC_POOL_ADDRESS ?? "";
const PAYMENT_GATE_URL = process.env.NEXT_PUBLIC_PAYMENT_GATE_URL ?? "";
if (POOL_ADDRESS === "") {
  throw new Error(
    "NEXT_PUBLIC_POOL_ADDRESS or NEXT_PUBLIC_PAYMENT_GATE_URL is not set",
  );
}

interface LoginButtonProps {
  loginText?: string;
  logoutText?: string;
  callbackUrl?: string;
}

export function LoginButton({
  loginText = "Login",
  logoutText = "Logout",
  callbackUrl,
}: LoginButtonProps) {
  const { token, clearSubscription } = useSubscription();

  return token ? (
    <button
      onClick={() => {
        clearSubscription();
      }}
      className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
    >
      {logoutText}
    </button>
  ) : (
    <Link
      href={getPaymentGateUrl(
        POOL_ADDRESS,
        callbackUrl ?? window.location.href,
        PAYMENT_GATE_URL,
      )}
      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
    >
      {loginText}
    </Link>
  );
}
