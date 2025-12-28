'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/auth';
import { User, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuthStore();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b sticky top-0 z-50">
      <Link href="/" className="text-2xl font-bold text-primary">Collabsta</Link>
      
      <div className="flex items-center gap-6">
        <Link href="/influencers" className="hover:text-primary">Find Influencers</Link>
        
        {isAuthenticated() ? (
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2 hover:text-primary">
              <User size={18} />
              {user?.fullName}
            </Link>
            <button onClick={logout} className="p-2 hover:bg-gray-100 rounded-lg">
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link href="/login" className="px-4 py-2 border rounded-lg hover:bg-gray-50">Login</Link>
            <Link href="/register" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
