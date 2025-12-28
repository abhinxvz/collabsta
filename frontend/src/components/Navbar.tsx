'use client';

import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b sticky top-0 z-50">
      <Link href="/" className="text-2xl font-bold text-primary">Collabsta</Link>
      
      <div className="flex items-center gap-6">
        <Link href="/influencers" className="hover:text-primary">Find Creators</Link>
        
        <SignedIn>
          <Link href="/dashboard" className="hover:text-primary">Dashboard</Link>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        <SignedOut>
          <Link href="/sign-in" className="px-4 py-2 border rounded-lg hover:bg-gray-50">Login</Link>
          <Link href="/sign-up" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
            Sign Up
          </Link>
        </SignedOut>
      </div>
    </nav>
  );
}
