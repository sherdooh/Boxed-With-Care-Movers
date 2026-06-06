import { ShieldCheck, Users, Clock, ThumbsUp, MapPin, HeadphonesIcon } from 'lucide-react';
import { SiteContent } from '../../lib/siteContent';

interface WhyUsProps {
  content: SiteContent;
}

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Fully Insured',
    description: 'Every move is covered by comprehensive insurance. Your belongings are safe in our hands from pickup to delivery.',
  },
  {
    icon: Users,
    title: 'Experienced Team',
    description: 'Our trained, vetted movers treat every item as if it were their own. No shortcuts, no damage, no stress.',
  },
  {
    icon: Clock,
    title: 'On-Time, Every Time',
    description: 'We respect your schedule. Our team arrives on time and completes the move within the agreed timeframe.',
  },
  {
    icon: ThumbsUp,
    title: 'Transparent Pricing',
    description: 'No hidden fees. You get a clear, itemized quote upfront — the price you see is the price you pay.',
  },
  {
    icon: MapPin,
    title: 'Wide Coverage',
    description: 'From local neighborhoods to regional destinations, we offer reliable moves for any location within our service area.',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Our customer support team is available around the clock to answer questions and provide peace of mind.',
  },
];

export default function WhyUs({ content }: WhyUsProps) {
  return (
    <section id="why-us" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Layout */}
        <div className="hidden sm:grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={content.whyUsImage || 'https://images.pexels.com/photos/4246121/pexels-photo-4246121.jpeg?auto=compress&cs=tinysrgb&w=800'}
                alt="Movers carefully handling items"
                className="w-full h-[520px] object-cover"
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="text-4xl font-extrabold text-amber-500">500+</div>
              <div className="text-gray-600 font-medium text-sm mt-1">Successful Moves</div>
              <div className="text-gray-400 text-xs">Across our service area</div>
            </div>
            {/* Floating badge */}
            <div className="absolute -top-4 -left-4 bg-amber-500 text-white rounded-2xl shadow-lg p-4">
              <div className="text-2xl font-extrabold">5+</div>
              <div className="text-xs font-medium">Years Experience</div>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <span className="inline-block text-amber-600 font-semibold text-sm tracking-wider uppercase mb-3">
              Why Choose Us
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">
              Moving You Forward
              <br />
              <span className="text-amber-500">With Every Box</span>
            </h2>
            <p className="text-gray-500 text-lg mb-10 leading-relaxed">
              At Boxed With Care Movers, we believe a move isn't just about transporting items — it's
              about transitioning your life. That's why we go above and beyond to make every
              relocation smooth, safe, and memorable for the right reasons.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {reasons.map((reason) => (
                <div key={reason.title} className="flex gap-4">
                  <div className="shrink-0 p-2.5 bg-amber-50 rounded-xl h-fit">
                    <reason.icon className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{reason.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="sm:hidden space-y-8">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src={content.whyUsImage || 'https://images.pexels.com/photos/4246121/pexels-photo-4246121.jpeg?auto=compress&cs=tinysrgb&w=800'}
              alt="Movers carefully handling items"
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <span className="inline-block text-amber-600 font-semibold text-xs tracking-wider uppercase mb-2">
              Why Choose Us
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3 leading-tight">
              Moving You Forward
              <br />
              <span className="text-amber-500">With Every Box</span>
            </h2>
            <p className="text-gray-500 text-base mb-6 leading-relaxed">
              At Boxed With Care Movers, we believe a move isn't just about transporting items — it's
              about transitioning your life. That's why we go above and beyond to make every
              relocation smooth, safe, and memorable for the right reasons.
            </p>
          </div>

          {/* Horizontal Scroll Reasons */}
          <div className="overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex gap-6 min-w-max">
              {reasons.map((reason) => (
                <div key={reason.title} className="shrink-0 w-72 bg-white rounded-2xl p-5 shadow-md border border-gray-100">
                  <div className="flex gap-3 mb-3">
                    <div className="shrink-0 p-2 bg-amber-50 rounded-lg h-fit">
                      <reason.icon className="w-5 h-5 text-amber-600" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-base">{reason.title}</h4>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{reason.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


