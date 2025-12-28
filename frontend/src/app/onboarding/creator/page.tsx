'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Instagram, Youtube, Twitter } from 'lucide-react';

const CATEGORIES = ['Fashion', 'Beauty', 'Tech', 'Food', 'Fitness', 'Travel', 'Gaming', 'Finance', 'Education', 'Comedy', 'Music', 'Lifestyle'];
const LANGUAGES = ['Hindi', 'English', 'Tamil', 'Telugu', 'Marathi', 'Bengali', 'Gujarati', 'Kannada', 'Malayalam', 'Punjabi'];

export default function CreatorOnboardingPage() {
  const { user } = useUser();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    bio: '',
    city: '',
    state: '',
    categories: [] as string[],
    languages: [] as string[],
    instagram: '',
    youtube: '',
    twitter: '',
    basePrice: '',
  });

  const toggleCategory = (cat: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat]
    }));
  };

  const toggleLanguage = (lang: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter(l => l !== lang)
        : [...prev.languages, lang]
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // TODO: Save to backend/Supabase
      console.log('Creator profile:', formData);
      
      await user?.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          onboardingComplete: true,
          creatorProfile: formData,
        },
      });

      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to save profile:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-24 h-2 rounded-full ${s <= step ? 'bg-primary' : 'bg-gray-200'}`}
            />
          ))}
        </div>

        <div className="bg-white rounded-xl p-8">
          {step === 1 && (
            <>
              <h1 className="text-2xl font-bold mb-2">Tell us about yourself</h1>
              <p className="text-gray-500 mb-6">This helps brands find you</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                    placeholder="Tell brands about yourself and your content..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Mumbai"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">State</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Maharashtra"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Categories (select up to 3)</label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => toggleCategory(cat)}
                        disabled={formData.categories.length >= 3 && !formData.categories.includes(cat)}
                        className={`px-3 py-1 rounded-full text-sm transition ${
                          formData.categories.includes(cat)
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                        } disabled:opacity-50`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Languages</label>
                  <div className="flex flex-wrap gap-2">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => toggleLanguage(lang)}
                        className={`px-3 py-1 rounded-full text-sm transition ${
                          formData.languages.includes(lang)
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full mt-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark"
              >
                Continue
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-2xl font-bold mb-2">Connect your socials</h1>
              <p className="text-gray-500 mb-6">Link at least one platform</p>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2">
                    <Instagram size={18} /> Instagram Username
                  </label>
                  <input
                    type="text"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="@yourusername"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2">
                    <Youtube size={18} /> YouTube Channel
                  </label>
                  <input
                    type="text"
                    value={formData.youtube}
                    onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Channel name or URL"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2">
                    <Twitter size={18} /> X (Twitter) Handle
                  </label>
                  <input
                    type="text"
                    value={formData.twitter}
                    onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="@yourhandle"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 border rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark"
                >
                  Continue
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h1 className="text-2xl font-bold mb-2">Set your pricing</h1>
              <p className="text-gray-500 mb-6">You can add more services later</p>

              <div>
                <label className="block text-sm font-medium mb-2">Starting Price (₹)</label>
                <input
                  type="number"
                  value={formData.basePrice}
                  onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="5000"
                />
                <p className="text-sm text-gray-500 mt-2">This is your minimum price for a collaboration</p>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 border rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Complete Setup'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
