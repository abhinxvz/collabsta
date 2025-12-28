'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Filter, Star } from 'lucide-react';

const PLATFORMS = ['All', 'Instagram', 'YouTube', 'X'];
const CATEGORIES = ['All', 'Fashion', 'Beauty', 'Tech', 'Food', 'Fitness', 'Travel', 'Gaming'];

// Mock data - will be replaced with API
const MOCK_INFLUENCERS = [
  { id: '1', name: 'Priya Sharma', city: 'Mumbai', platform: 'Instagram', followers: '250K', category: 'Fashion', rating: 4.9, price: 15000, avatar: '' },
  { id: '2', name: 'Rahul Verma', city: 'Delhi', platform: 'YouTube', followers: '1.2M', category: 'Tech', rating: 4.8, price: 50000, avatar: '' },
  { id: '3', name: 'Ananya Patel', city: 'Bangalore', platform: 'Instagram', followers: '500K', category: 'Beauty', rating: 5.0, price: 25000, avatar: '' },
  { id: '4', name: 'Vikram Singh', city: 'Jaipur', platform: 'Moj', followers: '800K', category: 'Comedy', rating: 4.7, price: 20000, avatar: '' },
];

export default function InfluencersPage() {
  const [platform, setPlatform] = useState('All');
  const [category, setCategory] = useState('All');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b">
        <Link href="/" className="text-2xl font-bold text-primary">Collabsta</Link>
        <div className="flex items-center gap-4">
          <Link href="/login" className="px-4 py-2 border rounded-lg">Login</Link>
          <Link href="/register" className="px-4 py-2 bg-primary text-white rounded-lg">Sign Up</Link>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar Filters */}
        <aside className="w-64 p-6 bg-white border-r min-h-screen">
          <div className="flex items-center gap-2 mb-6">
            <Filter size={20} />
            <h2 className="font-semibold">Filters</h2>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-3">Platform</h3>
            <div className="space-y-2">
              {PLATFORMS.map((p) => (
                <label key={p} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="platform"
                    checked={platform === p}
                    onChange={() => setPlatform(p)}
                    className="text-primary"
                  />
                  {p}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-3">Category</h3>
            <div className="space-y-2">
              {CATEGORIES.map((c) => (
                <label key={c} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={category === c}
                    onChange={() => setCategory(c)}
                    className="text-primary"
                  />
                  {c}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-3">Price Range (₹)</h3>
            <input type="range" min="0" max="100000" className="w-full" />
            <div className="flex justify-between text-sm text-gray-500">
              <span>₹0</span>
              <span>₹1,00,000</span>
            </div>
          </div>
        </aside>

        {/* Influencer Grid */}
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Find Influencers</h1>
            <select className="px-4 py-2 border rounded-lg">
              <option>Sort by: Relevance</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
              <option>Followers</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {MOCK_INFLUENCERS.map((influencer) => (
              <Link
                key={influencer.id}
                href={`/influencers/${influencer.id}`}
                className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition"
              >
                <div className="h-48 bg-gradient-to-br from-primary to-secondary" />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{influencer.name}</h3>
                      <p className="text-sm text-gray-500">{influencer.city}</p>
                    </div>
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">{influencer.platform}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{influencer.rating}</span>
                    <span className="text-sm text-gray-400">• {influencer.followers} followers</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{influencer.category}</span>
                    <span className="font-semibold">₹{influencer.price.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
