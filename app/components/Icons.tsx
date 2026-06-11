"use client";
import React from 'react';

type IconProps = {
    size?: number;
    className?: string;
};

export const HomeIcon = ({ size = 24, className = '' }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="9" width="16" height="10" rx="3" stroke="currentColor" strokeWidth="1.4" fill="currentColor" fillOpacity="0.03" />
        <path d="M12 5.5c3 1.8 6 3.6 6 3.6S15 9 12 7.2 6 9.1 6 9.1s3-1.8 6-3.6z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.04" />
    </svg>
);

export const SearchIcon = ({ size = 24, className = '' }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="5.2" stroke="currentColor" strokeWidth="1.4" fill="currentColor" fillOpacity="0.03" />
        <rect x="15.5" y="15.5" width="5" height="2" rx="1" transform="rotate(-45 15.5 15.5)" fill="currentColor" />
    </svg>
);

export const CompassIcon = ({ size = 24, className = '' }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.02" />
        <path d="M14 9l-4 2 2 4 4-2-2-4z" fill="currentColor" />
        <circle cx="12" cy="12" r="1.2" fill="white" />
    </svg>
);

export const MapIcon = ({ size = 24, className = '' }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.02" />
        <path d="M7 7v10M12 6v12M17 7v10" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
    </svg>
);

export const ChevronLeftIcon = ({ size = 20, className = '' }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const MapPinIcon = ({ size = 20, className = '' }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 20s-5-4-5-8a5 5 0 1110 0c0 4-5 8-5 8z" fill="currentColor" />
        <circle cx="12" cy="10.5" r="1.6" fill="white" />
    </svg>
);

export const StarIcon = ({ size = 16, className = '' }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 17.3l-5.5 3 1.4-6.1L3 10.4l6.2-.5L12 4l2.8 5.9 6.2.5-5 3.8 1.4 6.1z" />
    </svg>
);

export const NavigationIcon = ({ size = 20, className = '' }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M4 20l16-8-8-4-8 4v8z" fill="currentColor" />
        <circle cx="13.5" cy="8.5" r="1" fill="white" />
    </svg>
);

export const ClockIcon = ({ size = 20, className = '' }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.1" fill="currentColor" fillOpacity="0.02" />
        <path d="M12 9v4l3 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const CoffeeIcon = ({ size = 20, className = '' }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="7" width="12" height="8" rx="3" fill="currentColor" />
        <path d="M15 9c1.2 0 2 .9 2 2s-.8 2-2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M8 5c0-1 1-2 2-2" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
    </svg>
);

export default {};
