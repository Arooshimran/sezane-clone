// SezaneNavbar.tsx
'use client';
export const dynamic = 'force-static';
import React, { useState, useEffect } from 'react';
import { fetchHeroSections } from '../lib/api';

const dropdownItems = [
    'SHIRTS & BLOUSES',
    'DRESSES',
    'KNITWEAR',
    'JACKETS & COATS',
    'TROUSERS',
    'SKIRTS & SHORTS',
    'DENIM',
    'T-SHIRTS, TOPS & BODYSUITS',
    'SWEATSHIRTS',
    'SWIMWEAR',
    'BAGS & BASKET BAGS',
    'SHOES',
];

const discoverItems = [
    'ARCHIVES',
    'GIFT CARD',
    'PETIT SÉZANE',
    'OUR SOLIDARITY PRODUCTS',
    'PERSONALIZATION',
];

const SezaneNavbar = () => {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [shopImages, setShopImages] = useState<{ title: string; img: string }[]>([]);
    const [newInImages, setNewInImages] = useState<{ title: string; img: string }[]>([]);

    useEffect(() => {
        const getImages = async () => {
            const data = await fetchHeroSections();
            const images = (data || []).map((item: any) => ({
                title: item.text,
                img: item.image?.url,
            }));
            setShopImages(images.slice(6, 9));
            setNewInImages(images.slice(3, 6));
        };
        getImages();
    }, []);

    const handleMouseEnter = (menu: string) => setActiveDropdown(menu);
    const handleMouseLeave = () => setActiveDropdown(null);
    const dropdownShouldOpen = (menu: string) => ['SHOP', 'NEW IN'].includes(menu);

    return (
        <div className="relative"
            style={{
                backgroundColor: '#f8f6f1',
                backgroundImage: "url('/45-degree-fabric-light.webp')",
            }}>
            <nav className="bg-transparent absolute top-0 left-0 w-full z-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-center gap-8 h-16">
                        {[
                            'SHOP',
                            'NEW IN',
                            'LOOKBOOK',
                            'ESSENTIALS',
                            'ACCESSORIES',
                            'LAST CHANCE',
                            'ABOUT',
                            'FOR HIM',
                            'JOURNAL',
                            'FAQ',
                        ].map((label) => (
                            <div
                                key={label}
                                className="relative"
                                onMouseEnter={() => dropdownShouldOpen(label) && handleMouseEnter(label)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="group relative cursor-pointer py-2">
                                    <span className="font-['Oswald'] text-white hover:text-black font-semibold tracking-wider transition-colors text-sm uppercase" style={{ fontFamily: 'Arial, sans-serif' }}>
                                        {label}
                                    </span>
                                    {/* Exact Sezane underline - positioned below with gap */}
                                    <span className="absolute left-0 -bottom-1 h-[2px] w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                                        style={{
                                            backgroundColor: 'black',
                                            backgroundImage: "url('/45-degree-fabric-light.webp')",
                                        }}></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Dropdown Menu */}
            <div
                className={`absolute top-16 left-0 w-full transition-all duration-300 ease-in-out transform z-40 ${activeDropdown ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
                    }`}
                onMouseEnter={() => setActiveDropdown(activeDropdown)}
                onMouseLeave={handleMouseLeave}
            >
                <div className="border-t border-gray-200 shadow-lg py-10"
                    style={{
                        backgroundColor: '#f8f6f1',
                        backgroundImage: "url('/45-degree-fabric-light.webp')",
                    }}>
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex gap-12">
                            {/* First Column */}
                            <div className="flex-1 min-w-[200px]">
                                <h3 className="font-['Oswald'] text-black font-medium mb-6 tracking-wide uppercase text-sm">
                                    {activeDropdown === 'NEW IN' ? 'NEW COLLECTION' : 'CATEGORIES'}
                                </h3>
                                <ul className="space-y-3">
                                    {dropdownItems.map((item, index) => (
                                        <li key={index}>
                                            <button className="font-['Oswald'] text-gray-600 hover:text-black transition-colors text-left font-normal tracking-wide uppercase text-xs">
                                                {item}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Second Column */}
                            <div className="flex-1 min-w-[180px]">
                                <h3 className="font-['Oswald'] text-black font-medium mb-6 tracking-wide uppercase text-sm">
                                    DISCOVER
                                </h3>
                                <ul className="space-y-3">
                                    {discoverItems.map((item, index) => (
                                        <li key={index}>
                                            <button className="font-['Oswald'] text-gray-600 hover:text-black transition-colors text-left font-normal tracking-wide uppercase text-xs">
                                                {item}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Third Column: Images from API - Exact Sezane sizing */}
                            <div className="flex-[2] flex gap-4">
                                {(activeDropdown === 'SHOP' ? shopImages : activeDropdown === 'NEW IN' ? newInImages : []).map(({ title, img }, idx) => (
                                    <div
                                        key={idx}
                                        className="relative overflow-hidden group cursor-pointer flex-1"
                                        style={{ aspectRatio: '4/5', maxWidth: '200px' }}
                                    >
                                        {img && (
                                            <img
                                                src={img}
                                                alt={title}
                                                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                        <div className="absolute bottom-6 left-6 text-white">
                                            <h4 className="font-['Oswald'] text-2xl font-bold uppercase tracking-wide leading-tight">{title}</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {activeDropdown && (
                <div
                    className="fixed inset-0 bg-opacity-10 z-30"
                    style={{
                        backgroundColor: '#f8f6f1',
                        backgroundImage: "url('/45-degree-fabric-light.webp')",
                    }}
                    onClick={() => setActiveDropdown(null)}
                />
            )}
        </div>
    );
};

export default SezaneNavbar;