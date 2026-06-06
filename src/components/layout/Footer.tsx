import { Package, Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import { SiteContent } from '../../lib/siteContent';

interface FooterProps {
  content: SiteContent;
}

export default function Footer({ content }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-amber-500 rounded-lg">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-white font-bold text-base block leading-none">{content.siteName}</span>
                <span className="text-amber-400 text-xs font-medium tracking-wider">{content.siteTagline}</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              {content.footerText}
            </p>
            <div className="flex gap-3">
              {[
                { name: 'facebook', icon: Facebook, href: 'https://www.facebook.com/profile.php/?id=61579763425560' },
                { name: 'instagram', icon: Instagram, href: 'https://www.instagram.com/boxedwithcaremovers?igsh=bG9qeXV4bzk0NTY1' },
                {
                  name: 'tiktok',
                  icon: () => (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.68v13.67a2.4 2.4 0 0 1-2.4 2.4 2.4 2.4 0 0 1-2.4-2.4 2.4 2.4 0 0 1 2.4-2.4c.34 0 .67.05.98.15V9.48a5.45 5.45 0 0 0-7.93 5.07 5.45 5.45 0 0 0 5.46 5.46 5.47 5.47 0 0 0 5.46-5.46v-2.5a7.27 7.27 0 0 0 4.84 1.83v-3.68a4.85 4.85 0 0 1-1.06-.12z" />
                    </svg>
                  ),
                  href: 'https://www.tiktok.com/@boxed.with.care.m?_r=1&_t=ZS-96T7Bng4Y3o',
                },
                {
                  name: 'whatsapp',
                  icon: () => (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  ),
                  href: 'https://wa.me/254748851679',
                },
              ].map(({ name, icon: Icon, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 hover:bg-amber-500 text-gray-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                  title={name}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                'Residential Moving',
                'Office & Commercial',
                'Professional Packing',
                'Long-Distance Moving',
                'Storage Solutions',
                'Furniture Assembly',
              ].map((item) => (
                <li key={item}>
                  <a href="#services" className="text-gray-400 hover:text-amber-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About Us', href: '#why-us' },
                { label: 'How It Works', href: '#how-it-works' },
                { label: 'Testimonials', href: '#testimonials' },
                { label: 'Get a Quote', href: '#contact' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-400 hover:text-amber-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Contact Us</h4>
            <div className="space-y-4 text-sm">
              <a
                href={`tel:${content.phone.replace(/\s+/g, '')}`}
                className="flex items-start gap-3 text-gray-400 hover:text-amber-400 transition-colors group"
              >
                <Phone className="w-4 h-4 mt-0.5 shrink-0 group-hover:text-amber-400" />
                {content.phone}
              </a>
              <a
                href={`mailto:${content.email}`}
                className="flex items-start gap-3 text-gray-400 hover:text-amber-400 transition-colors group"
              >
                <Mail className="w-4 h-4 mt-0.5 shrink-0 group-hover:text-amber-400" />
                {content.email}
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                Nationwide Availability
              </div>
              <div>
                <p className="text-gray-400 font-medium mb-1">Operating Hours</p>
                <p className="text-gray-500 text-xs">Mon – Sat: 7:00 AM – 7:00 PM</p>
                <p className="text-gray-500 text-xs">Sun: 8:00 AM – 4:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>© {year} Boxed With Care Movers. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}


