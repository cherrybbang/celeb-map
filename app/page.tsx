"use client";
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import SearchView from './components/SearchView';
import CourseView from './components/CourseView';
import MapView from './components/MapView';

export default function Page() {
  const [activeTab, setActiveTab] = useState('home');
  const [homeStack, setHomeStack] = useState<string[]>(['home']);
  const [selectedGroup, setSelectedGroup] = useState<unknown>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<unknown>(null);

  const celebrities = [
    { id: 1, name: 'BTS', group: 'BTS' },
    { id: 2, name: '아이브', group: 'IVE' },
    { id: 3, name: '르세라핌', group: 'LE SSERAFIM' },
    { id: 4, name: '스키즈', group: 'Stray Kids' },
  ];

  const restaurants = [
    {
      id: 1,
      name: '골든 비스트로',
      distance: '0.5km',
      rating: 4.9,
      recom: ['BTS', 'LE SSERAFIM'],
      location: '서울 강남구 테헤란로 123',
      hours: '11:00 - 21:00',
      breakTime: '15:00 - 17:00'
    },
    {
      id: 2,
      name: '오션 퓨전',
      distance: '1.2km',
      rating: 4.7,
      recom: ['IVE'],
      location: '서울 서초구 강남대로 456',
      hours: '12:00 - 22:00',
      breakTime: null
    },
    {
      id: 3,
      name: '달콤한 디저트',
      distance: '0.8km',
      rating: 4.8,
      recom: ['BTS', 'Stray Kids'],
      location: '서울 강남구 역삼동 789',
      hours: '10:00 - 20:00',
      breakTime: null
    },
    {
      id: 4,
      name: '한식 정원',
      distance: '2.1km',
      rating: 4.6,
      recom: ['LE SSERAFIM', 'Stray Kids'],
      location: '서울 송파구 잠실동 321',
      hours: '11:30 - 21:30',
      breakTime: '15:30 - 17:00'
    },
  ];

  const pushHome = (screen: string, data: unknown = null) => {
    if (data) {
      if (screen === 'restaurants') setSelectedGroup(data);
      if (screen === 'detail') setSelectedRestaurant(data);
    }
    setHomeStack(prev => [...prev, screen]);
  };

  const popHome = () => {
    setHomeStack(prev => prev.slice(0, -1));
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-50 max-w-md mx-auto border-x overflow-hidden relative">
      <div className="flex-1 overflow-y-auto pb-24">
        {activeTab === 'home' && (
          <HomeView
            homeStack={homeStack}
            celebrities={celebrities}
            restaurants={restaurants}
            selectedGroup={selectedGroup}
            selectedRestaurant={selectedRestaurant}
            pushHome={pushHome}
            popHome={popHome}
          />
        )}

        {activeTab === 'search' && <SearchView />}
        {activeTab === 'course' && <CourseView />}
        {activeTab === 'map' && <MapView />}
      </div>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
