'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'brand' as 'brand' | 'influencer',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: API call
    console.log(formData);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-sm">
        <Link href="/" className="text-2xl font-bold text-primary block text-center mb-8">Collabsta</Link>
        
        <h1 className="text-2xl font-bold text-center mb-2">Create your account</h1>
        <p className="text-gray-500 text-center mb-8">Join India's influencer marketplace</p>

        {/* Role Selection */}
        <div className="flex gap-4 mb-6">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: 'brand' })}
            className={`flex-1 py-3 rounded-lg border-2 transition ${
              formData.role === 'brand' ? 'border-primary bg-primary/5' : 'border-gray-200'
            }`}
          >
            <span className="block font-medium">I'm a Brand</span>
            <span className="text-sm text-gray-500">Hire influencers</span>
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: 'influencer' })}
            className={`flex-1 py-3 rounded-lg border-2 transition ${
              formData.role === 'influencer' ? 'border-primary bg-primary/5' : 'border-gray-200'
            }`}
          >
            <span className="block font-medium">I'm an Influencer</span>
            <span className="text-sm text-gray-500">Get hired</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Min 8 characters"
              minLength={8}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:underline">Sign in</Link>
        </p>

        <p className="text-center mt-4 text-xs text-gray-400">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
