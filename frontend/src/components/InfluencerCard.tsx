import Link from 'next/link';
import { Star } from 'lucide-react';

interface InfluencerCardProps {
  id: string;
  name: string;
  city: string;
  platform: string;
  followers: string;
  category: string;
  rating: number;
  price: number;
  avatarUrl?: string;
}

export default function InfluencerCard({
  id, name, city, platform, followers, category, rating, price, avatarUrl
}: InfluencerCardProps) {
  return (
    <Link
      href={`/influencers/${id}`}
      className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition"
    >
      <div 
        className="h-48 bg-gradient-to-br from-primary to-secondary"
        style={avatarUrl ? { backgroundImage: `url(${avatarUrl})`, backgroundSize: 'cover' } : {}}
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-gray-500">{city}</p>
          </div>
          <span className="px-2 py-1 bg-gray-100 rounded text-xs">{platform}</span>
        </div>
        <div className="flex items-center gap-1 mb-2">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{rating}</span>
          <span className="text-sm text-gray-400">• {followers} followers</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{category}</span>
          <span className="font-semibold">₹{price.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </Link>
  );
}
