'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Users, Briefcase } from 'lucide-react';

export default function SelectRolePage() {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const selectRole = async (role: 'creator' | 'brand') => {
    if (!user) return;
    setLoading(true);

    try {
      await user.update({
        unsafeMetadata: { role },
      });

      // Redirect based on role
      if (role === 'creator') {
        router.push('/onboarding/creator');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Failed to set role:', error);
      setLoading(false);
    }
  };

  // If user already has a role, redirect
  if (user?.unsafeMetadata?.role) {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Welcome to Collabsta!</h1>
        <p className="text-gray-500 text-center mb-8">How would you like to use the platform?</p>

        <div className="grid grid-cols-2 gap-6">
          <button
            onClick={() => selectRole('creator')}
            disabled={loading}
            className="p-8 bg-white rounded-xl border-2 border-gray-200 hover:border-primary hover:shadow-lg transition flex flex-col items-center gap-4 disabled:opacity-50"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Users className="text-primary" size={32} />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-1">I'm a Creator</h2>
              <p className="text-sm text-gray-500">Get hired by brands for collaborations</p>
            </div>
          </button>

          <button
            onClick={() => selectRole('brand')}
            disabled={loading}
            className="p-8 bg-white rounded-xl border-2 border-gray-200 hover:border-secondary hover:shadow-lg transition flex flex-col items-center gap-4 disabled:opacity-50"
          >
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
              <Briefcase className="text-secondary" size={32} />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-1">I'm a Brand</h2>
              <p className="text-sm text-gray-500">Find and hire influencers</p>
            </div>
          </button>
        </div>

        {loading && (
          <p className="text-center mt-6 text-gray-500">Setting up your account...</p>
        )}
      </div>
    </div>
  );
}
