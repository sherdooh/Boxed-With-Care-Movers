import { ArrowRight, ShieldCheck, Clock, Star } from 'lucide-react';
import { SiteContent } from '../../lib/siteContent';

interface HeroProps {
  content: SiteContent;
}

function renderHeadline(headline: string, highlight: string) {
  return headline.split('\n').map((line, index) => {
    if (highlight && line.includes(highlight)) {
      const parts = line.split(highlight);
      return (
        <span key={index} className="block">
          {parts[0]}
          <span className="text-amber-400">{highlight}</span>
          {parts[1]}
        </span>
      );
    }
    return (
      <span key={index} className="block">
        {line}
      </span>
    );
  });
}

export default function Hero({ content }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${content.heroBgImage})`,
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/85 via-gray-900/70 to-gray-800/60" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 text-amber-300 text-sm font-medium px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          Trusted Moving Partners
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
          {renderHeadline(content.heroHeadline, content.heroHighlight)}
        </h1>

        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          {content.heroSubtext}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-500 text-white font-bold rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-amber-500/30 hover:shadow-xl hover:-translate-y-0.5"
          >
            {content.heroCTA}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href={`tel:${content.phone.replace(/\s+/g, '')}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-lg transition-all duration-200 border border-white/20 backdrop-blur-sm"
          >
            {content.heroCallText}
          </a>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {[
            { icon: ShieldCheck, label: 'Fully Insured', sub: 'Your items are protected' },
            { icon: Clock, label: 'On-Time Delivery', sub: 'Punctual, every move' },
            { icon: Star, label: '500+ Happy Clients', sub: 'Trusted by happy customers' },
          ].map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-4 py-3 text-left"
            >
              <div className="p-2 bg-amber-500/20 rounded-lg shrink-0">
                <Icon className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{label}</p>
                <p className="text-gray-400 text-xs">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 80L60 70C120 60 240 40 360 33.3C480 26.7 600 33.3 720 43.3C840 53.3 960 66.7 1080 66.7C1200 66.7 1320 53.3 1380 46.7L1440 40V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}



