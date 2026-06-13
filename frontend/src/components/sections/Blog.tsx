import { ArrowRight } from 'lucide-react';
import { SiteContent } from '../../lib/siteContent';

interface BlogProps {
  content: SiteContent;
}

export default function Blog({ content }: BlogProps) {
  return (
    <section id="blog" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mx-auto max-w-3xl">
          <span className="inline-block text-amber-600 font-semibold text-sm tracking-wider uppercase mb-3">
            Latest Articles
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            {content.blogSectionHeadline}
          </h2>
          <p className="text-lg text-gray-500">{content.blogSectionSubtext}</p>
        </div>

        <div className="relative mt-16">
          <div className="blog-scroll-container -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0 overflow-x-auto lg:overflow-x-visible flex lg:grid gap-6 lg:gap-8 snap-x snap-mandatory pb-4 lg:pb-0">
            {content.blogPosts.map((post) => (
              <article key={post.id} className="flex-shrink-0 w-[320px] lg:w-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-200 snap-center">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute left-4 top-4 inline-flex rounded-full bg-amber-500/90 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white shadow-sm">
                    {post.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{post.excerpt}</p>
                  <a
                    href={post.url ?? '#contact'}
                    className="inline-flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent lg:hidden" />
        </div>
      </div>
    </section>
  );
}
