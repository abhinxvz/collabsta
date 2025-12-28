'use client';

import Link from 'next/link';
import { Star, MapPin, Users, MessageCircle, CheckCircle } from 'lucide-react';

// Mock data - will be replaced with API
const INFLUENCER = {
  id: '1',
  name: 'Priya Sharma',
  bio: 'Fashion & lifestyle content creator. Collaborated with 50+ brands including Myntra, Nykaa, and Zara.',
  city: 'Mumbai',
  state: 'Maharashtra',
  rating: 4.9,
  totalReviews: 127,
  isVerified: true,
  languages: ['Hindi', 'English'],
  categories: ['Fashion', 'Lifestyle', 'Beauty'],
  socials: [
    { platform: 'Instagram', username: '@priyasharma', followers: 250000, engagement: 4.2 },
    { platform: 'YouTube', username: 'PriyaSharmaVlogs', followers: 180000, engagement: 5.1 },
  ],
  services: [
    { id: 's1', platform: 'Instagram', type: 'Reel', price: 15000, deliveryDays: 5 },
    { id: 's2', platform: 'Instagram', type: 'Story', price: 5000, deliveryDays: 2 },
    { id: 's3', platform: 'Instagram', type: 'Post', price: 10000, deliveryDays: 4 },
    { id: 's4', platform: 'YouTube', type: 'Video', price: 50000, deliveryDays: 10 },
  ],
  portfolio: [
    { id: 'p1', type: 'image', url: '' },
    { id: 'p2', type: 'image', url: '' },
    { id: 'p3', type: 'video', url: '' },
  ],
  reviews: [
    { id: 'r1', brand: 'Myntra', rating: 5, comment: 'Amazing work! Delivered on time with great quality.', date: '2025-01-15' },
    { id: 'r2', brand: 'Nykaa', rating: 5, comment: 'Very professional and creative content.', date: '2025-01-10' },
  ],
};

export default function InfluencerProfilePage() {
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

      <div className="max-w-6xl mx-auto p-6">
        {/* Profile Header */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <div className="flex gap-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold">{INFLUENCER.name}</h1>
                {INFLUENCER.isVerified && <CheckCircle className="text-blue-500" size={20} />}
              </div>
              <div className="flex items-center gap-4 text-gray-600 mb-3">
                <span className="flex items-center gap-1">
                  <MapPin size={16} /> {INFLUENCER.city}, {INFLUENCER.state}
                </span>
                <span className="flex items-center gap-1">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  {INFLUENCER.rating} ({INFLUENCER.totalReviews} reviews)
                </span>
              </div>
              <p className="text-gray-700 mb-4">{INFLUENCER.bio}</p>
              <div className="flex gap-2 flex-wrap">
                {INFLUENCER.categories.map((cat) => (
                  <span key={cat} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">{cat}</span>
                ))}
                {INFLUENCER.languages.map((lang) => (
                  <span key={lang} className="px-3 py-1 bg-gray-100 rounded-full text-sm">{lang}</span>
                ))}
              </div>
            </div>
            <button className="h-fit px-6 py-3 bg-primary text-white rounded-lg flex items-center gap-2 hover:bg-primary-dark">
              <MessageCircle size={18} /> Contact
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="col-span-2 space-y-6">
            {/* Social Stats */}
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Social Platforms</h2>
              <div className="space-y-4">
                {INFLUENCER.socials.map((social) => (
                  <div key={social.platform} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium">{social.platform}</h3>
                      <p className="text-sm text-gray-500">{social.username}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold flex items-center gap-1">
                        <Users size={16} /> {(social.followers / 1000).toFixed(0)}K
                      </p>
                      <p className="text-sm text-gray-500">{social.engagement}% engagement</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio */}
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Portfolio</h2>
              <div className="grid grid-cols-3 gap-4">
                {INFLUENCER.portfolio.map((item) => (
                  <div key={item.id} className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg" />
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Reviews</h2>
              <div className="space-y-4">
                {INFLUENCER.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-0">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{review.brand}</span>
                      <div className="flex items-center gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Services */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Services & Pricing</h2>
            {INFLUENCER.services.map((service) => (
              <div key={service.id} className="bg-white rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">{service.platform}</span>
                    <h3 className="font-medium mt-2">{service.type}</h3>
                  </div>
                  <span className="text-lg font-bold">₹{service.price.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-sm text-gray-500 mb-3">Delivery in {service.deliveryDays} days</p>
                <button className="w-full py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition">
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
