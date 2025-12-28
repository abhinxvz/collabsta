export type UserRole = 'brand' | 'influencer' | 'admin';
export type Platform = 'instagram' | 'youtube' | 'x';
export type ContentType = 'post' | 'reel' | 'story' | 'video' | 'ugc' | 'shorts';
export type OrderStatus = 'pending' | 'accepted' | 'in_progress' | 'delivered' | 'revision' | 'completed' | 'cancelled' | 'disputed';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
  isVerified: boolean;
  createdAt: string;
}

export interface InfluencerProfile {
  id: string;
  userId: string;
  bio?: string;
  city?: string;
  state?: string;
  country: string;
  languages: string[];
  categories: string[];
  basePrice?: number;
  rating: number;
  totalReviews: number;
  totalOrders: number;
  isFeatured: boolean;
  user?: User;
  socialAccounts?: SocialAccount[];
  services?: Service[];
}

export interface SocialAccount {
  id: string;
  influencerId: string;
  platform: Platform;
  username: string;
  profileUrl?: string;
  followers: number;
  engagementRate?: number;
  isVerified: boolean;
}

export interface Service {
  id: string;
  influencerId: string;
  platform: Platform;
  contentType: ContentType;
  title: string;
  description?: string;
  price: number;
  deliveryDays: number;
  isActive: boolean;
}

export interface BrandProfile {
  id: string;
  userId: string;
  companyName?: string;
  website?: string;
  industry?: string;
  gstNumber?: string;
  user?: User;
}

export interface Order {
  id: string;
  orderNumber: string;
  brandId: string;
  influencerId: string;
  serviceId: string;
  status: OrderStatus;
  amount: number;
  platformFee: number;
  requirements?: string;
  deliveredAt?: string;
  completedAt?: string;
  createdAt: string;
  service?: Service;
  brand?: BrandProfile;
  influencer?: InfluencerProfile;
}

export interface Message {
  id: string;
  orderId: string;
  senderId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  sender?: User;
}

export interface Review {
  id: string;
  orderId: string;
  influencerId: string;
  brandId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  brand?: BrandProfile;
}
