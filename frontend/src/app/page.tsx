import { Search } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b">
        <Link href="/" className="text-2xl font-bold text-primary">Collabsta</Link>
        <div className="flex items-center gap-4">
          <Link href="/influencers" className="hover:text-primary">Find Influencers</Link>
          <Link href="/login" className="px-4 py-2 border rounded-lg hover:bg-gray-50">Login</Link>
          <Link href="/register" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-20 text-center bg-gradient-to-b from-indigo-50 to-white">
        <h1 className="text-5xl font-bold mb-4">
          Find Indian Influencers <br /> for Your Brand
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Connect with top creators on Instagram, YouTube, Moj, ShareChat and more. 
          Pay in INR, work with verified influencers.
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by category, platform, or city..."
              className="w-full pl-12 pr-4 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button className="px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary-dark">
            Search
          </button>
        </div>
      </section>

      {/* Platforms */}
      <section className="px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-8">Platforms We Support</h2>
        <div className="flex justify-center gap-8 flex-wrap">
          {['Instagram', 'YouTube', 'TikTok', 'Moj', 'ShareChat', 'Josh'].map((platform) => (
            <div key={platform} className="px-6 py-3 bg-gray-100 rounded-full font-medium">
              {platform}
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 py-16 bg-gray-50">
        <h2 className="text-2xl font-bold text-center mb-8">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {['Fashion', 'Beauty', 'Tech', 'Food', 'Fitness', 'Travel', 'Gaming', 'Finance', 'Education', 'Comedy', 'Music', 'Lifestyle'].map((cat) => (
            <Link
              key={cat}
              href={`/influencers?category=${cat.toLowerCase()}`}
              className="p-4 bg-white rounded-xl text-center hover:shadow-md transition"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t text-center text-gray-600">
        <p>© 2025 Collabsta. Made for Indian creators and brands.</p>
      </footer>
    </main>
  );
}
