import { useState } from 'react';
import { Menu, X, Phone, Package } from 'lucide-react';

interface HeaderProps {
  scrolled: boolean;
  siteName: string;
  siteTagline: string;
  phone: string;
}

export default function Header({ scrolled, siteName, siteTagline, phone }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(true);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className={`w-16 h-16 rounded-full border-2 border-amber-400 bg-amber-500 flex items-center justify-center overflow-hidden transition-colors ${scrolled ? 'shadow-lg shadow-amber-200/50' : 'shadow-lg shadow-amber-200/40'}`}>
              {logoLoaded ? (
                <img
                  src="/BOXED/logo.png"
                  alt="Boxed With Care logo"
                  className="w-full h-full object-contain rounded-full"
                  onError={() => setLogoLoaded(false)}
                />
              ) : (
                <Package className="w-8 h-8 text-white" strokeWidth={2} />
              )}
            </div>
            <div>
              <span className={`text-lg font-bold leading-none block transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                {siteName}
              </span>
              <span className={`text-xs font-medium tracking-wider transition-colors ${scrolled ? 'text-amber-600' : 'text-amber-300'}`}>
                {siteTagline}
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-amber-500 ${
                  scrolled ? 'text-gray-700' : 'text-white/90'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className={`hidden sm:flex items-center gap-2 text-sm font-medium transition-colors ${
                scrolled ? 'text-gray-700 hover:text-amber-600' : 'text-white hover:text-amber-300'
              }`}
            >
              <Phone className="w-4 h-4" />
              {phone}
            </a>
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
            >
              Get a Quote
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden mt-4 pb-4 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-5 py-3 text-gray-700 font-medium hover:bg-amber-50 hover:text-amber-600 transition-colors border-b border-gray-50 last:border-0"
                >
                  {link.label}
                </a>
              ))}
              <div className="px-5 py-3 flex flex-col gap-2 mt-1">
                <a
                  href="tel:+254748851679"
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <Phone className="w-4 h-4 text-amber-500" />
                  +254 748 851 679
                </a>
                <a
                  href="#contact"
                  className="mt-2 text-center px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-lg transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Get a Free Quote
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}


