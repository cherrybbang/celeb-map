"use client";
import React from 'react';

export default function SearchView() {
    return (
        <div className="p-6 space-y-6 pt-10">
            <h2 className="text-2xl font-bold text-indigo-900">뭐 찾으세요? 🔍</h2>
            <input
                type="text"
                placeholder="맛집, 관광지 이름을 검색해보세요"
                className="w-full p-4 bg-white border-2 border-indigo-100 rounded-2xl shadow-sm outline-none focus:border-indigo-400 text-gray-800 placeholder:text-indigo-700"
            />
        </div>
    );
}
