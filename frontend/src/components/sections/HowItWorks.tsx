const steps = [
  {
    number: '01',
    title: 'Request a Quote',
    description:
      'Fill out our simple online form or call us. Tell us where you are moving from and to, and what needs to be moved.',
  },
  {
    number: '02',
    title: 'Get a Custom Plan',
    description:
      'We assess your needs, provide a transparent itemized quote, and schedule a move date that works for you.',
  },
  {
    number: '03',
    title: 'We Pack & Load',
    description:
      'Our professional team arrives on time, carefully packs your items using quality materials, and loads them securely.',
  },
  {
    number: '04',
    title: 'Safe Delivery',
    description:
      'We transport and deliver your belongings to your new location — on time and damage-free, every time.',
  },
];

interface HowItWorksProps {
  phone: string;
}

export default function HowItWorks({ phone }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="inline-block text-amber-600 font-semibold text-sm tracking-wider uppercase mb-3">
            Simple Process
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            From first contact to final delivery, we have streamlined every step
            to make your move as effortless as possible.
          </p>
        </div>

        {/* Steps - Desktop Grid */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-amber-50 z-0" />

          {steps.map((step, i) => (
            <div key={step.number} className="relative z-10 flex flex-col items-center text-center">
              {/* Number bubble */}
              <div className="w-20 h-20 rounded-full bg-amber-500 text-white flex items-center justify-center text-2xl font-extrabold shadow-lg shadow-amber-200 mb-6 relative">
                {step.number}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute left-full top-1/2 -translate-y-1/2 w-full h-0.5 bg-transparent" />
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Steps - Mobile Horizontal Scroll */}
        <div className="sm:hidden overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-6 min-w-max">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center text-center shrink-0 w-72">
                {/* Number bubble */}
                <div className="w-20 h-20 rounded-full bg-amber-500 text-white flex items-center justify-center text-2xl font-extrabold shadow-lg shadow-amber-200 mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA banner */}
        <div className="mt-20 rounded-3xl bg-gradient-to-r from-gray-900 to-gray-800 p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Ready to Make Your Move?
            </h3>
            <p className="text-gray-400">
              Let Boxed With Care Movers handle every detail — contact us today for a free, no-obligation quote.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-colors text-center"
            >
              {phone}
            </a>
            <a
              href="#contact"
              className="px-6 py-3 bg-amber-500 hover:bg-amber-500 text-white font-bold rounded-xl transition-colors text-center shadow-md"
            >
              Get a Free Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


