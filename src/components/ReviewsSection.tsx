import React, { useState } from 'react';
import { REVIEWS, ICAREZONE_INFO } from '../data/repairData.ts';
import { Star, CheckCircle2, MessageSquare, Quote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const filteredReviews = filter === 'all' 
    ? REVIEWS 
    : REVIEWS.filter(r => r.device.toLowerCase().includes(filter.toLowerCase()));

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Rating Proof */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-semibold text-sky-400 uppercase tracking-widest">
              Verified Mysore Customers
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
              Trusted by Over 14,800 Apple & Gadget Owners in Mysuru
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Read real experiences from doctors at Apollo, Infosys software engineers, college students, and local residents who chose iCareZone.
            </p>
          </div>

          {/* Rating Summary Box */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 shrink-0">
            <div className="text-3xl font-extrabold text-white font-mono-numbers">
              4.9
            </div>
            <div className="space-y-1">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <div className="text-xs text-slate-400">
                Over <strong className="text-slate-200">{ICAREZONE_INFO.reviewsCount}</strong> Google Reviews
              </div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {['all', 'iPhone', 'MacBook', 'iPad', 'Watch'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                filter === cat
                  ? 'bg-sky-500 text-white font-semibold shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat === 'all' ? 'All Mysore Reviews' : `${cat} Repairs`}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono-numbers">
                    {rev.date}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{rev.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {rev.designation} · {rev.location}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-sky-400 font-mono-numbers bg-slate-950 px-2 py-1 rounded border border-slate-800">
                    {rev.device}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
