"use client";
import React from 'react';
import { MapPin } from 'lucide-react';

export default function MapView() {
    return (
        <div className="relative h-full w-full bg-indigo-50 p-6 flex flex-col items-center justify-center">
            <div className="w-full h-[400px] bg-white rounded-3xl border-4 border-white shadow-xl flex items-center justify-center relative overflow-hidden">
                <div className="text-indigo-300 flex flex-col items-center gap-2">
                    <MapPin size={48} />
                    <p>3km 내 탐색 완료! 📍</p>
                </div>
                <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-pink-400 rounded-full animate-bounce"></div>
                <div className="absolute bottom-1/3 right-1/4 w-8 h-8 bg-indigo-400 rounded-full animate-bounce delay-75"></div>
            </div>
        </div>
    );
}
