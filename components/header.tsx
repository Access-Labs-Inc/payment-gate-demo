import Link from "next/link";
import { LoginButton } from "./login-button";

export function Header() {
  return (
    <header className="fixed top-0 w-full bg-gray-800 shadow-lg z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-white">
          Blockchain News
        </Link>
        <LoginButton />
      </div>
    </header>
  );
}
