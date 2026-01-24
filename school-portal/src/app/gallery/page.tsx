export default function GalleryPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold font-serif mb-8 text-primary-900">Gallery</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {/* Placeholder Gallery Items */}
         {[1, 2, 3, 4, 5, 6].map((i) => (
           <div key={i} className="group relative overflow-hidden rounded-xl shadow-md cursor-pointer">
             <div className="bg-gray-300 h-64 w-full flex items-center justify-center text-gray-500 bg-cover bg-center transition-transform duration-300 group-hover:scale-105">
                Image {i}
             </div>
             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <p className="text-white font-bold">Event Title {i}</p>
             </div>
           </div>
         ))}
      </div>
    </div>
  );
}
