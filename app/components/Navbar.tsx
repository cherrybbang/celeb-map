"use client";
import React from 'react';
import { Home, Search, Compass, Map as MapIcon } from 'lucide-react';

type Props = {
    activeTab: string;
    setActiveTab: (t: string) => void;
};

export default function Navbar({ activeTab, setActiveTab }: Props) {
    const tabs = [
        { id: 'home', icon: Home, label: '홈' },
        { id: 'search', icon: Search, label: '검색' },
        { id: 'course', icon: Compass, label: '코스' },
        { id: 'map', icon: MapIcon, label: '지도' },
    ];

    return (
        <nav className="absolute bottom-0 w-full bg-white border-t border-gray-100 p-4 flex justify-around items-center z-50">
            {tabs.map(tab => {
                const Icon = tab.icon;
                const isHome = tab.id === 'home';
                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex flex-col items-center transition-colors cursor-pointer ${activeTab === tab.id ? 'text-pink-500' : 'text-gray-400'}`}
                    >
                        {isHome ? (
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activeTab === tab.id ? 'bg-pink-100 text-pink-500' : 'bg-gray-100 text-gray-400'}`}>
                                <Icon size={18} />
                            </div>
                        ) : (
                            <Icon size={24} />
                        )}
                        <span className="text-[10px] mt-1 font-medium">{tab.label}</span>
                    </button>
                );
            })}
        </nav>
    );
}
