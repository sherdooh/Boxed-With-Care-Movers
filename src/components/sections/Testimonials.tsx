import { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { fetchGoogleReviews, GoogleReview } from '../../lib/api';

const testimonials = [
  {
    name: 'Amina K.',
    role: 'Verified Customer',
    avatar: 'https://images.pexels.com/photos/3778610/pexels-photo-3778610.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    text: 'Absolutely fantastic service. The crew arrived on time, packed everything carefully, and unloaded with the same attention to detail. Best movers we have ever used.',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/examples/flower.mp4',
  },
  {
    name: 'Joseph M.',
    role: 'Homeowner',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    text: 'I booked them for a long-distance move and everything went smoothly. Great communication, no hidden fees, and all my furniture arrived in perfect condition.',
  },
  {
    name: 'Aisha K.',
    role: 'Apartment Renter',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    text: 'Their packing service was excellent. They handled my fragile items with care and were very respectful in my home. Highly recommend for any move.',
  },
  {
    name: 'Peter Ouma',
    role: 'Small Business Owner',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    text: 'The team made our office relocation effortless. Fast, efficient, and professional from start to finish. They even helped us set up in the new space.',
  },
  {
    name: 'Ruth W.',
    role: 'Returning Client',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    text: 'Every detail was handled with care. I felt confident the whole day because they kept me informed and treated my belongings like their own.',
  },
  {
    name: 'Daniel T.',
    role: 'Customer',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    text: 'Great value for money. The movers were courteous, strong, and careful. My move was stress-free thanks to Boxed With Care Movers.',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/examples/flower.mp4',
  },
];

type TestimonialCard = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  source: 'google' | 'static';
  authorUrl?: string;
};

export default function Testimonials() {
  const [reviews, setReviews] = useState<GoogleReview[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let active = true;

    const loadReviews = async () => {
      try {
        const googleReviews = await fetchGoogleReviews();
        if (!active) return;
        setReviews(googleReviews);
      } catch (error) {
        console.error('Google reviews load failed', error);
        if (!active) return;
        setLoadError('Unable to load Google reviews.');
      } finally {
        if (!active) return;
        setLoading(false);
      }
    };

    loadReviews();
    return () => {
      active = false;
    };
  }, []);

  const cards: TestimonialCard[] = reviews && reviews.length > 0
    ? reviews.map((review) => ({
        id: review.id,
        name: review.authorName,
        role: review.relativeTimeDescription || 'Google review',
        avatar: review.profilePhotoUrl || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
        rating: review.rating,
        text: review.text,
        source: 'google',
        authorUrl: review.authorUrl,
      }))
    : testimonials.map((testimonial, index) => ({
        id: `static-${index}`,
        ...testimonial,
        source: 'static',
      }));

  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="inline-block text-amber-600 font-semibold text-sm tracking-wider uppercase mb-3">
            Client Stories
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Don't just take our word for it. Here is what hundreds of satisfied
            customers have experienced with our moving services.
          </p>
        {(loading || loadError) && (
          <div className="mt-4">
            {loading && <p className="text-sm text-gray-500">Loading latest reviews...</p>}
            {loadError && <p className="text-sm text-red-600">{loadError}</p>}
          </div>
        )}
      </div>

      {/* Grid - Desktop */}
      <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative"
          >
            <Quote className="absolute top-5 right-5 w-8 h-8 text-amber-100" />
            {/* Stars */}
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">{t.text}</p>
            <p className="text-xs text-gray-400 mb-4">{t.source === 'google' ? 'Live Google review' : 'Verified customer testimonial'}</p>
            {/* Author */}
            <div className="mt-4">
              <p className="font-bold text-gray-900 text-sm">{t.name}</p>
              <p className="text-gray-400 text-xs">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
        <div className="sm:hidden overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-6 min-w-max">
            {cards.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative shrink-0 w-80"
              >
                <Quote className="absolute top-5 right-5 w-8 h-8 text-amber-100" />
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{t.text}</p>
                <p className="text-xs text-gray-400 mb-4">{t.source === 'google' ? 'Live Google review' : 'Verified customer testimonial'}</p>
                {/* Author */}
                <div className="mt-4">
                  <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rating summary */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
          <div>
            <div className="text-5xl font-extrabold text-amber-500">5.0</div>
            <div className="flex justify-center gap-0.5 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-1">Average Rating</p>
          </div>
          <div className="hidden sm:block w-px h-16 bg-gray-200" />
          <div>
            <div className="text-5xl font-extrabold text-gray-900">500+</div>
            <p className="text-gray-500 text-sm mt-1">Happy Clients</p>
          </div>
          <div className="hidden sm:block w-px h-16 bg-gray-200" />
          <div>
            <div className="text-5xl font-extrabold text-gray-900">5+</div>
            <p className="text-gray-500 text-sm mt-1">Years in Business</p>
          </div>
        </div>
      </div>
    </section>
  );
}




