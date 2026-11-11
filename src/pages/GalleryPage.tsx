import React, { useState } from 'react';
import { GalleryItem } from '../types/index.ts';
import { X, ZoomIn, Image as ImageIcon } from 'lucide-react';

interface GalleryPageProps {
  gallery: GalleryItem[];
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ gallery }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Store Interior', 'Repair Work', 'iPhone Repairs', 'Device Issues', 'Before and After'];

  const filteredItems = gallery.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="py-12 bg-[#F5F6F8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1677FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Visual Portfolio
          </span>
          <h1 className="text-3xl font-extrabold text-[#17191D] tracking-tight">
            Repair Facility & Workbench Gallery
          </h1>
          <p className="text-xs sm:text-sm text-[#747982]">
            Visual snapshots of our Kuvempu Nagara workshop, optical inspection equipment, and component restoration work.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-[#1677FF] text-white shadow-xs'
                  : 'bg-white text-[#545963] border border-[#E8E9ED] hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative bg-white rounded-2xl overflow-hidden border border-[#E8E9ED] shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <div className="p-2.5 rounded-full bg-white/20 backdrop-blur-md">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
                <span className="absolute top-3 left-3 bg-[#111318]/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  {item.category}
                </span>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-xs text-[#17191D] group-hover:text-[#1677FF] transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="p-12 text-center bg-white rounded-2xl border border-[#E8E9ED] max-w-sm mx-auto space-y-2">
            <ImageIcon className="w-8 h-8 text-gray-300 mx-auto" />
            <p className="text-xs text-gray-500 font-semibold">No photographs in this category yet.</p>
          </div>
        )}

        {/* Lightbox Modal */}
        {activeItem && (
          <div 
            onClick={() => setActiveItem(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#111318] rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in-95"
            >
              <div className="p-4 flex items-center justify-between border-b border-white/10 text-white">
                <div>
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                    {activeItem.category}
                  </span>
                  <h3 className="font-bold text-sm text-white">{activeItem.title}</h3>
                </div>
                <button
                  onClick={() => setActiveItem(null)}
                  className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="max-h-[75vh] overflow-hidden flex items-center justify-center bg-black">
                <img
                  src={activeItem.image_url}
                  alt={activeItem.title}
                  className="max-h-[75vh] w-auto object-contain"
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
