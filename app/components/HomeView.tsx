"use client";
import React from 'react';
import { ChevronLeft, MapPin, Star, Clock, Coffee, Navigation } from 'lucide-react';

type Celeb = { id: number; name: string; group: string };
type Restaurant = {
    id: number;
    name: string;
    distance: string;
    rating: number;
    recom: string[];
    location: string;
    hours: string;
    breakTime?: string | null;
};

type Props = {
    homeStack: string[];
    celebrities: Celeb[];
    restaurants: Restaurant[];
    selectedGroup: Celeb | null;
    selectedRestaurant: Restaurant | null;
    pushHome: (screen: string, data?: any) => void;
    popHome: () => void;
};

export default function HomeView({
    homeStack,
    celebrities,
    restaurants,
    selectedGroup,
    selectedRestaurant,
    pushHome,
    popHome,
}: Props) {
    const current = homeStack[homeStack.length - 1];

    const getSortedRestaurants = () => {
        if (!selectedGroup) return restaurants;
        return [...restaurants].sort((a, b) => {
            const aHas = a.recom.includes(selectedGroup.name) ? 1 : 0;
            const bHas = b.recom.includes(selectedGroup.name) ? 1 : 0;
            return bHas - aHas;
        });
    };

    if (current === 'home') {
        return (
            <div className="p-6 space-y-6">
                <div className="text-center pt-4">
                    <h1 className="text-3xl font-extrabold text-indigo-900">안녕! 여행자님! 💖</h1>
                    <p className="text-gray-500 mt-2">오늘 어떤 그룹의 맛집을 가볼까?</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {celebrities.map(c => (
                        <button
                            key={c.id}
                            onClick={() => pushHome('restaurants', c)}
                            className="p-6 bg-white border-2 border-pink-100 rounded-[28px] shadow-lg shadow-pink-100 hover:scale-105 transition-all text-center cursor-pointer"
                        >
                            <div className="w-14 h-14 mx-auto bg-pink-100 rounded-full flex items-center justify-center mb-3 text-pink-600 font-bold text-lg">
                                {c.group.charAt(0)}
                            </div>
                            <p className="font-extrabold text-lg text-black">{c.name}</p>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    if (current === 'restaurants') {
        return (
            <div className="p-6 space-y-4">
                <button onClick={popHome} className="flex items-center text-gray-400 mb-4 hover:text-indigo-500 cursor-pointer">
                    <ChevronLeft size={20} /> 돌아가기
                </button>
                <h2 className="text-2xl font-bold text-gray-800">
                    <span className="text-pink-500">{selectedGroup?.name}</span> 추천 맛집 🍽️
                </h2>
                {getSortedRestaurants().map(r => (
                    <div key={r.id} onClick={() => pushHome('detail', r)} className="p-5 bg-white border-2 border-indigo-50 rounded-2xl flex justify-between items-center cursor-pointer hover:bg-indigo-50 transition-colors shadow-sm">
                        <div>
                            <p className="font-bold text-lg text-indigo-900">{r.name}</p>
                            <div className="text-xs text-indigo-400 mt-1 flex items-center gap-2">
                                <MapPin size={12} /> {r.distance} 거리
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="flex items-center text-yellow-500 font-bold"><Star size={16} className="mr-1" /> {r.rating}</div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (current === 'detail') {
        return (
            <div className="p-6 space-y-6 pb-20">
                <button onClick={popHome} className="flex items-center text-gray-400 mb-4 cursor-pointer"><ChevronLeft size={20} /> 뒤로</button>
                <div className="h-56 bg-gradient-to-r from-pink-200 to-indigo-200 rounded-3xl flex items-center justify-center text-white font-bold shadow-xl">
                    맛있는 사진이 들어갈 자리! 📸
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">{selectedRestaurant?.name}</h2>
                    <div className="bg-pink-50 p-3 rounded-xl mt-3 text-sm text-pink-600 font-medium inline-block">
                        ✨ {selectedGroup?.name}님의 추천 맛집입니다!
                    </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-3xl p-5 space-y-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <MapPin className="text-indigo-400" size={20} />
                        <div>
                            <p className="text-xs text-gray-400">위치</p>
                            <p className="font-medium text-gray-700">{selectedRestaurant?.location}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Clock className="text-indigo-400" size={20} />
                        <div>
                            <p className="text-xs text-gray-400">영업시간</p>
                            <p className="font-medium text-gray-700">{selectedRestaurant?.hours}</p>
                        </div>
                    </div>
                    {selectedRestaurant?.breakTime && (
                        <div className="flex items-center gap-3">
                            <Coffee className="text-indigo-400" size={20} />
                            <div>
                                <p className="text-xs text-gray-400">브레이크 타임</p>
                                <p className="font-medium text-gray-700">{selectedRestaurant?.breakTime}</p>
                            </div>
                        </div>
                    )}
                    <div className="flex items-center gap-3">
                        <Navigation className="text-indigo-400" size={20} />
                        <div>
                            <p className="text-xs text-gray-400">내 위치에서 거리</p>
                            <p className="font-medium text-gray-700">약 {selectedRestaurant?.distance} 떨어져 있어요!</p>
                        </div>
                    </div>
                </div>

                <button className="w-full py-4 bg-indigo-500 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-600 transition-all flex items-center justify-center gap-2">
                    <Navigation size={20} /> 길 안내 시작하기 🚀
                </button>
            </div>
        );
    }

    return null;
}
