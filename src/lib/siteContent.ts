export interface LeadEntry {
  id: string;
  date: string;
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
  quoteNumber?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  url?: string;
}

export interface SiteContent {
  siteName: string;
  siteTagline: string;
  heroHeadline: string;
  heroHighlight: string;
  heroSubtext: string;
  heroCTA: string;
  heroCallText: string;
  heroBgImage: string;
  whyUsImage: string;
  phone: string;
  email: string;
  website: string;
  footerText: string;
  serviceImages: string[];
  blogSectionHeadline: string;
  blogSectionSubtext: string;
  blogPosts: BlogPost[];
  defaultTerms?: string[];
}

export const defaultSiteContent: SiteContent = {
  siteName: 'Boxed With Care Movers',
  siteTagline: 'MOVERS & PACKERS',
  heroHeadline: 'Moving Made\nSimple,\nSafe & Stress-Free',
  heroHighlight: 'Simple,',
  heroSubtext:
    'Professional residential and commercial moving services for local and regional relocations. We handle your belongings with the care they deserve — every box, every step of the way.',
  heroCTA: 'Get a Free Quote',
  heroCallText: 'Call Us Now',
  heroBgImage:
    'https://images.pexels.com/photos/4246119/pexels-photo-4246119.jpeg?auto=compress&cs=tinysrgb&w=1600',
  whyUsImage:
    'https://images.pexels.com/photos/4246121/pexels-photo-4246121.jpeg?auto=compress&cs=tinysrgb&w=800',
  phone: '+254 748 851 679',
  email: 'Info@boxedwithcaremovers.co.ke',
  website: 'boxedwithcaremovers.co.ke',
  footerText:
    'Trusted moving and packing specialists. We handle your belongings with the care they deserve — every box, every step of the way.',
  serviceImages: [
    'https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/7262416/pexels-photo-7262416.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/7937307/pexels-photo-7937307.jpeg?auto=compress&cs=tinysrgb&w=600',
  ],
  blogSectionHeadline: 'Moving Tips, Planning Guides, and Packing Advice',
  blogSectionSubtext: 'Stay informed with practical moving articles that help make every relocation smoother, safer, and more predictable.',
  blogPosts: [
    {
      id: 'moving-checklist',
      title: 'The Essential Moving Checklist for Every Home',
      excerpt: 'A practical moving checklist to keep your relocation organized from first box to final unpacking. Prepare smarter, move easier, and avoid last-minute stress.',
      image: 'https://images.pexels.com/photos/5849141/pexels-photo-5849141.jpeg?auto=compress&cs=tinysrgb&w=1200',
      category: 'Moving Tips',
      url: '#contact',
    },
    {
      id: 'packing-hacks',
      title: 'Packing Hacks That Protect Fragile Belongings',
      excerpt: 'Discover clever packing strategies to safeguard fragile items and valuables during transport. Learn what materials work best and where to apply them.',
      image: 'https://images.pexels.com/photos/6841809/pexels-photo-6841809.jpeg?auto=compress&cs=tinysrgb&w=1200',
      category: 'Packing',
      url: '#contact',
    },
    {
      id: 'moving-costs',
      title: 'How to Estimate Moving Costs for Your Budget',
      excerpt: 'Understand the key factors that shape moving costs so you can budget confidently and avoid surprises. From distance to service levels, here is what matters.',
      image: 'https://images.pexels.com/photos/7045559/pexels-photo-7045559.jpeg?auto=compress&cs=tinysrgb&w=1200',
      category: 'Planning',
      url: '#contact',
    },
  ],
  defaultTerms: [
    'A 30% deposit is required to confirm the booking.',
    'This quotation remains valid for one month from the issue date.',
    'Delays caused by traffic, weather, or building access restrictions may affect timelines.',
    'Fragile or high-value items should be declared before moving day.',
    'Final payment is due immediately upon successful completion of the move.',
  ],
};
