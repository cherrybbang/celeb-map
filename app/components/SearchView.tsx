"use client";
import { useState } from 'react';
import { Search, X, MapPin, Star, Building2, Trees, Route, ChevronRight } from 'lucide-react';
import type { Celeb, Restaurant } from '../lib/types';

type Props = {
  celebrities: Celeb[];
  restaurants: Restaurant[];
};

type FilterTab = 'all' | 'restaurant' | 'hotel' | 'spot';

const RECENT_SEARCHES = ['BTS 강남 맛집', '아이브 추천', '홍대 카페'];
const POPULAR_SEARCHES = ['BTS', '아이브', '르세라핌', '스키즈', '에스파'];

const MOCK_HOTELS = [
  { id: 1, name: '그랜드 인터컨티넨탈', distance: '0.8km', stars: 5, price: '₩250,000~' },
  { id: 2, name: '파크 하얏트 서울', distance: '1.2km', stars: 5, price: '₩320,000~' },
  { id: 3, name: '롯데시티호텔', distance: '1.5km', stars: 4, price: '₩120,000~' },
];

const MOCK_SPOTS = [
  { id: 1, name: '코엑스 아쿠아리움', distance: '0.5km', type: '관광' },
  { id: 2, name: '봉은사', distance: '0.9km', type: '문화' },
  { id: 3, name: '스타필드 코엑스몰', distance: '0.3km', type: '쇼핑' },
];

const FILTER_TABS: { id: FilterTab; label: string }[] = [
  { id: 'all', label: '전체' },
  { id: 'restaurant', label: '맛집' },
  { id: 'hotel', label: '숙박' },
  { id: 'spot', label: '관광지' },
];

export default function SearchView({ celebrities, restaurants }: Props) {
  const [query, setQuery] = useState('');
  const [filterTab, setFilterTab] = useState<FilterTab>('all');

  const hasQuery = query.trim().length > 0;

  const matchedRestaurants = hasQuery
    ? restaurants.filter(r =>
        r.name.includes(query) ||
        r.recom.some(g => g.toLowerCase().includes(query.toLowerCase())) ||
        celebrities.some(c => c.name.includes(query) && r.recom.includes(c.group))
      )
    : [];

  return (
    <div className="pb-28">
      {/* Sticky header */}
      <div className="px-5 pt-6 pb-3 bg-[#f8f7ff] sticky top-0 z-10">
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">검색</h2>
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="셀럽명, 맛집 이름으로 검색"
            className="w-full pl-11 pr-10 py-3 bg-white border border-gray-200 rounded-2xl text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 shadow-sm transition-all"
          />
          {hasQuery && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center"
            >
              <X size={11} className="text-gray-500" />
            </button>
          )}
        </div>

        {hasQuery && (
          <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar">
            {FILTER_TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterTab(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  filterTab === tab.id
                    ? 'bg-violet-600 text-white'
                    : 'bg-white text-gray-500 border border-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Default state: no query */}
      {!hasQuery ? (
        <div className="px-5 space-y-6 mt-1">
          {/* Celeb quick filter */}
          <div>
            <p className="text-[13px] font-bold text-gray-700 mb-3">셀럽으로 검색</p>
            <div className="flex gap-2 flex-wrap">
              {celebrities.map(c => (
                <button
                  key={c.id}
                  onClick={() => setQuery(c.name)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r ${c.gradient} text-white shadow-sm`}
                >
                  {c.emoji} {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Recent searches */}
          <div>
            <p className="text-[13px] font-bold text-gray-700 mb-2">최근 검색</p>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {RECENT_SEARCHES.map((s, i) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className={`w-full flex items-center justify-between px-4 py-3 ${
                    i < RECENT_SEARCHES.length - 1 ? 'border-b border-gray-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Search size={13} className="text-gray-300" />
                    <span className="text-sm text-gray-700">{s}</span>
                  </div>
                  <X size={13} className="text-gray-300" />
                </button>
              ))}
            </div>
          </div>

          {/* Popular */}
          <div>
            <p className="text-[13px] font-bold text-gray-700 mb-3">인기 검색어</p>
            <div className="flex gap-2 flex-wrap">
              {POPULAR_SEARCHES.map((s, i) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="px-3 py-1.5 bg-white rounded-full text-xs font-medium text-gray-600 border border-gray-200 shadow-sm"
                >
                  <span className="text-violet-500 font-bold mr-1">{i + 1}</span>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Search results */
        <div className="px-5 mt-2 space-y-5">
          {/* Restaurants */}
          {(filterTab === 'all' || filterTab === 'restaurant') && (
            <section>
              <p className="text-[13px] font-bold text-gray-700 mb-3">
                맛집{' '}
                <span className="text-violet-600">{matchedRestaurants.length}</span>개
              </p>
              {matchedRestaurants.length === 0 ? (
                <div className="text-center py-8 bg-white rounded-2xl border border-gray-100">
                  <p className="text-gray-400 text-sm">검색 결과가 없어요</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {matchedRestaurants.map(r => (
                    <div
                      key={r.id}
                      className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-gray-100"
                    >
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${r.colorFrom} ${r.colorTo} flex-shrink-0`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 text-sm">{r.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {r.category} · {r.distance}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          {r.recom.map(g => {
                            const celeb = celebrities.find(c => c.group === g);
                            return (
                              <span
                                key={g}
                                className={`px-2 py-0.5 bg-gradient-to-r ${celeb?.gradient ?? 'from-gray-400 to-gray-500'} text-white text-[9px] font-bold rounded-full`}
                              >
                                {g}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 flex-shrink-0">
                        <Star size={12} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-bold text-gray-700">{r.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Hotels */}
          {(filterTab === 'all' || filterTab === 'hotel') && (
            <section>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[13px] font-bold text-gray-700">근처 숙박</p>
                <button className="text-xs text-violet-600 font-semibold flex items-center gap-0.5">
                  더보기 <ChevronRight size={13} />
                </button>
              </div>
              <div className="space-y-2.5">
                {MOCK_HOTELS.map(h => (
                  <div
                    key={h.id}
                    className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-gray-100"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center flex-shrink-0">
                      <Building2 size={22} className="text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 text-sm">{h.name}</p>
                      <div className="flex items-center gap-0.5 mt-0.5">
                        {Array.from({ length: h.stars }).map((_, i) => (
                          <Star key={i} size={9} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {h.distance} · {h.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tourist spots */}
          {(filterTab === 'all' || filterTab === 'spot') && (
            <section>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[13px] font-bold text-gray-700">근처 관광지</p>
                <button className="text-xs text-violet-600 font-semibold flex items-center gap-0.5">
                  더보기 <ChevronRight size={13} />
                </button>
              </div>
              <div className="space-y-2.5">
                {MOCK_SPOTS.map(s => (
                  <div
                    key={s.id}
                    className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-gray-100"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center flex-shrink-0">
                      <Trees size={22} className="text-green-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 text-sm">{s.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{s.distance}</p>
                      <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-semibold rounded-full mt-1 inline-block">
                        {s.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Travel course recommendation banner */}
          {filterTab === 'all' && matchedRestaurants.length > 0 && (
            <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-4 border border-violet-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-violet-700">✨ 여행 코스 추천</p>
                  <p className="text-xs text-violet-500 mt-0.5">
                    검색 결과 기반 코스를 만들어드려요
                  </p>
                </div>
                <button className="px-3 py-1.5 bg-violet-600 text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow-md shadow-violet-200">
                  <Route size={13} /> 코스 보기
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
