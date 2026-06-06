import { useState } from 'react';
import { Send, CheckCircle, Phone, Mail, MapPin } from 'lucide-react';
import { SiteContent, LeadEntry } from '../../lib/siteContent';
import { postLead } from '../../lib/api';
import { formatQuoteNumber } from '../../lib/quoteUtils';

interface FormData {
  name: string;
  email: string;
  phone: string;
  from_location: string;
  to_location: string;
  current_floor: string;
  destination_floor: string;
  current_size: string;
  destination_size: string;
  move_date: string;
  move_type: string;
  message: string;
}

const initialForm: FormData = {
  name: '',
  email: '',
  phone: '',
  from_location: '',
  to_location: '',
  current_floor: '',
  destination_floor: '',
  current_size: '',
  destination_size: '',
  move_date: '',
  move_type: '',
  message: '',
};

interface QuoteFormProps {
  content: SiteContent;
}

export default function QuoteForm({ content }: QuoteFormProps) {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [section, setSection] = useState<'personal' | 'details'>('personal');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const subject = `Quote request from ${form.name || 'a customer'}`;
    const bodyLines = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `From: ${form.from_location}`,
      `To: ${form.to_location}`,
      `Current floor: ${form.current_floor}`,
      `Destination floor: ${form.destination_floor}`,
      `Current home size: ${form.current_size}`,
      `Destination home size: ${form.destination_size}`,
      `Preferred move date: ${form.move_date}`,
      `Move type: ${form.move_type}`,
      `Details: ${form.message}`,
    ];

    const body = bodyLines.join('\n');
    const encodedBody = encodeURIComponent(body);
    const mailtoUrl = `mailto:${content.email}?subject=${encodeURIComponent(subject)}&body=${encodedBody}`;
    const whatsappPhone = content.phone.replace(/\D+/g, '');
    const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodedBody}`;

    const submissionDate = new Date().toISOString().slice(0, 10);
    const newLeadId = formatQuoteNumber(submissionDate, `${Date.now()}`);
    const lead: LeadEntry = {
      id: newLeadId,
      date: new Date().toLocaleString(),
      ...form,
      quoteNumber: newLeadId,
    };

    try {
      await postLead(lead);
    } catch (error) {
      console.error('Quote request save failed', error);
      setError('Unable to save your quote request. Please try again in a moment.');
      setSubmitting(false);
      return;
    }

    window.open(whatsappUrl, '_blank');
    window.location.href = mailtoUrl;

    setSubmitted(true);
    setForm(initialForm);
    setSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Left: Info - Desktop only */}
          <div className="lg:col-span-2 hidden lg:block">
            <span className="inline-block text-amber-600 font-semibold text-sm tracking-wider uppercase mb-3">
              Get In Touch
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">
              Request a
              <br />
              <span className="text-amber-500">Free Quote</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-10">
              Tell us about your move today and receive a fast, free, and reliable quotation from our professional moving team. Your information is safe with us.
            </p>

            <div className="space-y-5">
              <a
                href={`tel:${content.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-4 group"
              >
                <div className="p-3 bg-amber-50 rounded-xl group-hover:bg-amber-500 transition-colors">
                  <Phone className="w-5 h-5 text-amber-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Call Us</p>
                  <p className="text-gray-900 font-semibold">{content.phone}</p>
                </div>
              </a>

              <a
                href={`mailto:${content.email}`}
                className="flex items-center gap-4 group"
              >
                <div className="p-3 bg-amber-50 rounded-xl group-hover:bg-amber-500 transition-colors">
                  <Mail className="w-5 h-5 text-amber-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Email Us</p>
                  <p className="text-gray-900 font-semibold">{content.email}</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Availability</p>
                  <p className="text-gray-900 font-semibold">Nationwide</p>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/254748851679"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex items-center gap-3 w-full justify-center px-6 py-3.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors shadow-md"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Mobile Header */}
          <div className="lg:hidden col-span-1 text-center mb-4">
            <span className="inline-block text-amber-600 font-semibold text-sm tracking-wider uppercase mb-2">
              Get In Touch
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
              Request a <span className="text-amber-500">Free Quote</span>
            </h2>
            <a
              href="https://wa.me/254748851679"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors shadow-md"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3 col-span-1">
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="flex justify-center mb-4">
                    <CheckCircle className="w-16 h-16 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Quote Request Received!</h3>
                  <p className="text-gray-500 mb-6">
                    Thank you for reaching out. Our team will contact you within 2 hours
                    with a customized quote.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <>
                {/* Mobile Section Tabs */}
                <div className="lg:hidden flex gap-2 mb-6 pb-4 border-b border-gray-200">
                  <button
                    onClick={() => setSection('personal')}
                    className={`px-4 py-2 font-semibold rounded-lg transition-colors ${
                      section === 'personal'
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Your Info
                  </button>
                  <button
                    onClick={() => setSection('details')}
                    className={`px-4 py-2 font-semibold rounded-lg transition-colors ${
                      section === 'details'
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Move Details
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Section 1: Personal Info - Mobile only */}
                  {section === 'personal' && (
                  <div className="space-y-5 lg:hidden">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="John Kamau"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          required
                          placeholder={content.phone}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                      />
                    </div>

                    {/* Mobile: Continue button */}
                    <button
                      type="button"
                      onClick={() => setSection('details')}
                      className="lg:hidden w-full px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors"
                    >
                      Next: Move Details
                    </button>
                  </div>
                  )}

                  {/* Section 2: Move Details */}
                  {section === 'details' && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Moving From *
                        </label>
                        <input
                          type="text"
                          name="from_location"
                          value={form.from_location}
                          onChange={handleChange}
                          required
                          placeholder="e.g. Downtown"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Moving To *
                        </label>
                        <input
                          type="text"
                          name="to_location"
                          value={form.to_location}
                          onChange={handleChange}
                          required
                          placeholder="e.g. Uptown"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Current Floor *
                        </label>
                        <select
                          name="current_floor"
                          value={form.current_floor}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                        >
                          <option value="">Select floor...</option>
                          <option value="Ground floor">Ground floor</option>
                          <option value="1st floor">1st floor</option>
                          <option value="2nd floor">2nd floor</option>
                          <option value="3rd floor">3rd floor</option>
                          <option value="4th floor">4th floor</option>
                          <option value="5th floor">5th floor</option>
                          <option value="6th floor">6th floor</option>
                          <option value="7th floor">7th floor</option>
                          <option value="8th floor">8th floor</option>
                          <option value="9th floor">9th floor</option>
                          <option value="10+ floors">10+ floors</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Destination Floor *
                        </label>
                        <select
                          name="destination_floor"
                          value={form.destination_floor}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                        >
                          <option value="">Select floor...</option>
                          <option value="Ground floor">Ground floor</option>
                          <option value="1st floor">1st floor</option>
                          <option value="2nd floor">2nd floor</option>
                          <option value="3rd floor">3rd floor</option>
                          <option value="4th floor">4th floor</option>
                          <option value="5th floor">5th floor</option>
                          <option value="6th floor">6th floor</option>
                          <option value="7th floor">7th floor</option>
                          <option value="8th floor">8th floor</option>
                          <option value="9th floor">9th floor</option>
                          <option value="10+ floors">10+ floors</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Current House Size *
                        </label>
                        <select
                          name="current_size"
                          value={form.current_size}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                        >
                          <option value="">Select size...</option>
                          <option value="Studio">Studio</option>
                          <option value="Bedsitter">Bedsitter</option>
                          <option value="1 bedroom">1 bedroom</option>
                          <option value="2 bedroom">2 bedroom</option>
                          <option value="3 bedroom">3 bedroom</option>
                          <option value="4 bedroom">4 bedroom</option>
                          <option value="5 bedroom">5 bedroom</option>
                          <option value="6+ bedroom">6+ bedroom</option>
                          <option value="Townhouse">Townhouse</option>
                          <option value="Villa">Villa</option>
                          <option value="Apartment">Apartment</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Destination House Size *
                        </label>
                        <select
                          name="destination_size"
                          value={form.destination_size}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                        >
                          <option value="">Select size...</option>
                          <option value="Studio">Studio</option>
                          <option value="Bedsitter">Bedsitter</option>
                          <option value="1 bedroom">1 bedroom</option>
                          <option value="2 bedroom">2 bedroom</option>
                          <option value="3 bedroom">3 bedroom</option>
                          <option value="4 bedroom">4 bedroom</option>
                          <option value="5 bedroom">5 bedroom</option>
                          <option value="6+ bedroom">6+ bedroom</option>
                          <option value="Townhouse">Townhouse</option>
                          <option value="Villa">Villa</option>
                          <option value="Apartment">Apartment</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Preferred Move Date
                        </label>
                        <input
                          type="date"
                          name="move_date"
                          value={form.move_date}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Type of Move
                        </label>
                        <select
                          name="move_type"
                          value={form.move_type}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                        >
                          <option value="">Select type...</option>
                          <option value="Residential">Residential</option>
                          <option value="Office/Commercial">Office / Commercial</option>
                          <option value="Long-Distance">Long-Distance</option>
                          <option value="Packing Only">Packing Only</option>
                          <option value="Storage">Storage</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Additional Details
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Tell us about special items, access requirements, or anything else we should know..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition resize-none"
                      />
                    </div>

                    {/* Mobile: Back button */}
                    <button
                      type="button"
                      onClick={() => setSection('personal')}
                      className="lg:hidden w-full px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-colors"
                    >
                      Back: Your Info
                    </button>
                  </div>
                  )}

                  {/* Desktop: Show all fields, Mobile: Show only on details section */}
                  <div className="hidden lg:block space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="John Kamau"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          required
                          placeholder={content.phone}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Moving From *
                        </label>
                        <input
                          type="text"
                          name="from_location"
                          value={form.from_location}
                          onChange={handleChange}
                          required
                          placeholder="e.g. Downtown"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Moving To *
                        </label>
                        <input
                          type="text"
                          name="to_location"
                          value={form.to_location}
                          onChange={handleChange}
                          required
                          placeholder="e.g. Uptown"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Current Floor *
                        </label>
                        <select
                          name="current_floor"
                          value={form.current_floor}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                        >
                          <option value="">Select floor...</option>
                          <option value="Ground floor">Ground floor</option>
                          <option value="1st floor">1st floor</option>
                          <option value="2nd floor">2nd floor</option>
                          <option value="3rd floor">3rd floor</option>
                          <option value="4th floor">4th floor</option>
                          <option value="5th floor">5th floor</option>
                          <option value="6th floor">6th floor</option>
                          <option value="7th floor">7th floor</option>
                          <option value="8th floor">8th floor</option>
                          <option value="9th floor">9th floor</option>
                          <option value="10+ floors">10+ floors</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Destination Floor *
                        </label>
                        <select
                          name="destination_floor"
                          value={form.destination_floor}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                        >
                          <option value="">Select floor...</option>
                          <option value="Ground floor">Ground floor</option>
                          <option value="1st floor">1st floor</option>
                          <option value="2nd floor">2nd floor</option>
                          <option value="3rd floor">3rd floor</option>
                          <option value="4th floor">4th floor</option>
                          <option value="5th floor">5th floor</option>
                          <option value="6th floor">6th floor</option>
                          <option value="7th floor">7th floor</option>
                          <option value="8th floor">8th floor</option>
                          <option value="9th floor">9th floor</option>
                          <option value="10+ floors">10+ floors</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Current House Size *
                        </label>
                        <select
                          name="current_size"
                          value={form.current_size}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                          required
                        >
                          <option value="">Select size...</option>
                          <option value="Studio">Studio</option>
                          <option value="Bedsitter">Bedsitter</option>
                          <option value="1 bedroom">1 bedroom</option>
                          <option value="2 bedroom">2 bedroom</option>
                          <option value="3 bedroom">3 bedroom</option>
                          <option value="4 bedroom">4 bedroom</option>
                          <option value="5 bedroom">5 bedroom</option>
                          <option value="6+ bedroom">6+ bedroom</option>
                          <option value="Townhouse">Townhouse</option>
                          <option value="Villa">Villa</option>
                          <option value="Apartment">Apartment</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Destination House Size *
                        </label>
                        <select
                          name="destination_size"
                          value={form.destination_size}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                        >
                          <option value="">Select size...</option>
                          <option value="Studio">Studio</option>
                          <option value="Bedsitter">Bedsitter</option>
                          <option value="1 bedroom">1 bedroom</option>
                          <option value="2 bedroom">2 bedroom</option>
                          <option value="3 bedroom">3 bedroom</option>
                          <option value="4 bedroom">4 bedroom</option>
                          <option value="5 bedroom">5 bedroom</option>
                          <option value="6+ bedroom">6+ bedroom</option>
                          <option value="Townhouse">Townhouse</option>
                          <option value="Villa">Villa</option>
                          <option value="Apartment">Apartment</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Preferred Move Date
                        </label>
                        <input
                          type="date"
                          name="move_date"
                          value={form.move_date}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Type of Move
                        </label>
                        <select
                          name="move_type"
                          value={form.move_type}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                        >
                          <option value="">Select type...</option>
                          <option value="Residential">Residential</option>
                          <option value="Office/Commercial">Office / Commercial</option>
                          <option value="Long-Distance">Long-Distance</option>
                          <option value="Packing Only">Packing Only</option>
                          <option value="Storage">Storage</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Additional Details
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Tell us about special items, access requirements, or anything else we should know..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition resize-none"
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm bg-red-50 rounded-xl px-4 py-3">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-amber-500 hover:bg-amber-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-xl text-lg transition-colors shadow-md hover:shadow-lg"
                  >
                    {submitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Request Free Quote
                      </>
                    )}
                  </button>
                </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



