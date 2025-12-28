'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Package, MessageCircle, Settings, Plus } from 'lucide-react';
import { redirect } from 'next/navigation';

// Mock orders
const MOCK_ORDERS = [
  { id: '1', influencer: 'Priya Sharma', service: 'Instagram Reel', status: 'in_progress', amount: 15000, date: '2025-01-20' },
  { id: '2', influencer: 'Rahul Verma', service: 'YouTube Video', status: 'completed', amount: 50000, date: '2025-01-15' },
];

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  accepted: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-purple-100 text-purple-800',
  delivered: 'bg-indigo-100 text-indigo-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function DashboardPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  
  if (!user?.unsafeMetadata?.role) {
    redirect('/select-role');
  }

  const role = user.unsafeMetadata.role as string;
  const isBrand = role === 'brand';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 w-64 h-full bg-white border-r p-6">
        <Link href="/" className="text-2xl font-bold text-primary block mb-8">Collabsta</Link>
        
        <nav className="space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-lg">
            <Package size={20} /> Orders
          </Link>
          <Link href="/dashboard/messages" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg">
            <MessageCircle size={20} /> Messages
          </Link>
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg">
            <Settings size={20} /> Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Welcome, {user.firstName || 'there'}</h1>
            <p className="text-gray-500">{isBrand ? 'Brand Dashboard' : 'Creator Dashboard'}</p>
          </div>
          {isBrand ? (
            <Link href="/influencers" className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg">
              <Plus size={18} /> Find Creators
            </Link>
          ) : (
            <Link href="/dashboard/services" className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg">
              <Plus size={18} /> Add Service
            </Link>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl">
            <p className="text-gray-500 text-sm">Total Orders</p>
            <p className="text-3xl font-bold">12</p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <p className="text-gray-500 text-sm">In Progress</p>
            <p className="text-3xl font-bold">3</p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <p className="text-gray-500 text-sm">Completed</p>
            <p className="text-3xl font-bold">9</p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <p className="text-gray-500 text-sm">{isBrand ? 'Total Spent' : 'Total Earned'}</p>
            <p className="text-3xl font-bold">₹2.5L</p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Order</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">{isBrand ? 'Creator' : 'Brand'}</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Service</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Status</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Amount</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Date</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ORDERS.map((order) => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">#{order.id}</td>
                  <td className="px-6 py-4">{order.influencer}</td>
                  <td className="px-6 py-4">{order.service}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${STATUS_COLORS[order.status]}`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">₹{order.amount.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4 text-gray-500">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
