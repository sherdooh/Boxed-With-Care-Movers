interface GalleryProps {
  images: string[];
}

export default function Gallery({ images }: GalleryProps) {
  return (
    <section id="gallery" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-amber-600 font-semibold text-sm tracking-wider uppercase mb-3">
            Our Work
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
            Gallery Preview
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mt-4">
            Browse our latest moves, packaging resources, and carefully handled client deliveries.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={image + index} className="overflow-hidden rounded-3xl bg-white shadow-lg">
              <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
