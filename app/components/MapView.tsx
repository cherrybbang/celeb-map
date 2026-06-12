"use client";
import { useState, type MouseEvent } from 'react';
import { Search, Navigation, Star, Heart, ChevronUp, ChevronDown } from 'lucide-react';
import type { Celeb, Restaurant } from '../lib/types';

type Props = {
  restaurants: Restaurant[];
  celebrities: Celeb[];
};

const PIN_POSITIONS = [
  { top: '22%', left: '38%' },
  { top: '44%', left: '62%' },
  { top: '32%', left: '72%' },
  { top: '58%', left: '42%' },
  { top: '18%', left: '57%' },
  { top: '68%', left: '28%' },
];

export default function MapView({ restaurants, celebrities }: Props) {
  const [panelOpen, setPanelOpen] = useState(false);
  const [likedIds, setLikedIds] = useState<Set<number>>(
    new Set(restaurants.filter(r => r.liked).map(r => r.id))
  );
  const [activePin, setActivePin] = useState<number | null>(null);

  const toggleLike = (e: MouseEvent, id: number) => {
    e.stopPropagation();
    setLikedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="relative flex flex-col h-[calc(100vh-64px)]">
      {/* Map placeholder */}
      <div className="flex-1 relative bg-[#e8e3d5] overflow-hidden">
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(#aaa 1px, transparent 1px), linear-gradient(90deg, #aaa 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Road shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[32%] left-0 right-0 h-5 bg-white/60 rounded" />
          <div className="absolute top-[60%] left-0 right-0 h-3.5 bg-white/50 rounded" />
          <div className="absolute left-[30%] top-0 bottom-0 w-4 bg-white/60 rounded" />
          <div className="absolute left-[65%] top-0 bottom-0 w-3 bg-white/50 rounded" />
        </div>

        {/* 3 km radius ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 border-2 border-dashed border-violet-400/40 rounded-full pointer-events-none" />

        {/* My location dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-14 h-14 bg-violet-400/15 rounded-full animate-pulse" />
            <div className="w-4 h-4 bg-violet-600 rounded-full border-[3px] border-white shadow-lg z-10" />
          </div>
        </div>

        {/* Restaurant pins */}
        {restaurants.slice(0, 6).map((r, i) => {
          const pos = PIN_POSITIONS[i];
          const isActive = activePin === r.id;
          const celeb = celebrities.find(c => c.group === r.recom[0]);
          return (
            <button
              key={r.id}
              onClick={() => setActivePin(isActive ? null : r.id)}
              className="absolute flex flex-col items-center cursor-pointer"
              style={{ top: pos.top, left: pos.left, transform: 'translate(-50%, -100%)' }}
            >
              {isActive && (
                <div className="mb-1 bg-white rounded-xl px-3 py-1.5 shadow-lg border border-gray-100 text-xs font-bold text-gray-800 whitespace-nowrap">
                  {r.name}
                </div>
              )}
              <div
                className={`px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 text-xs font-bold text-white bg-gradient-to-r ${
                  celeb?.gradient ?? 'from-violet-500 to-purple-600'
                } transition-transform ${isActive ? 'scale-110' : ''}`}
              >
                <Star size={9} className="fill-white text-white" />
                {r.rating}
              </div>
              <div className="w-1.5 h-1.5 bg-violet-600 rounded-full mt-0.5" />
            </button>
          );
        })}

        {/* Top search bar */}
        <div className="absolute top-4 left-4 right-4 flex gap-2 z-10">
          <div className="flex-1 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-2xl shadow-md border border-gray-100">
            <Search size={14} className="text-gray-400" />
            <span className="text-sm text-gray-400">지도에서 맛집 검색</span>
          </div>
          <button className="w-10 h-10 bg-white/95 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100 flex items-center justify-center">
            <Navigation size={16} className="text-violet-600" />
          </button>
        </div>

        {/* Range badge */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-gray-100 flex items-center gap-2 whitespace-nowrap">
          <div className="w-2 h-2 bg-violet-600 rounded-full" />
          <span className="text-xs font-semibold text-gray-600">내 위치 3km 이내</span>
          <span className="text-xs font-extrabold text-violet-600">{restaurants.length}개</span>
        </div>
      </div>

      {/* Bottom panel */}
      <div
        className={`absolute left-0 right-0 bg-white rounded-t-3xl shadow-2xl border-t border-gray-100 transition-all duration-300 ease-in-out z-20 ${
          panelOpen ? 'bottom-0 h-72' : 'bottom-0 h-24'
        }`}
        style={{ marginBottom: '64px' }}
      >
        {/* Handle */}
        <button
          onClick={() => setPanelOpen(p => !p)}
          className="w-full flex flex-col items-center pt-3 pb-1 gap-1"
        >
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
          {!panelOpen
            ? <ChevronUp size={14} className="text-gray-400" />
            : <ChevronDown size={14} className="text-gray-400" />}
        </button>

        {!panelOpen ? (
          <div className="px-5 flex items-center justify-between">
            <div>
              <p className="text-[13px] font-bold text-gray-800">
                근처 맛집 {restaurants.length}개 발견
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                위로 스와이프해서 목록 보기
              </p>
            </div>
            <div className="w-9 h-9 bg-violet-50 rounded-full flex items-center justify-center">
              <ChevronUp size={16} className="text-violet-600" />
            </div>
          </div>
        ) : (
          <div className="overflow-y-auto h-[calc(100%-52px)] no-scrollbar px-4 space-y-2.5 pb-4">
            {restaurants.map(r => (
              <div
                key={r.id}
                className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${r.colorFrom} ${r.colorTo} flex-shrink-0`}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm truncate">{r.name}</p>
                  <p className="text-xs text-gray-400">
                    {r.category} · {r.distance}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <div className="flex items-center gap-0.5">
                    <Star size={11} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold text-gray-700">{r.rating}</span>
                  </div>
                  <button
                    onClick={e => toggleLike(e, r.id)}
                    className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100"
                  >
                    <Heart
                      size={13}
                      className={likedIds.has(r.id) ? 'fill-rose-500 text-rose-500' : 'text-gray-300'}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
