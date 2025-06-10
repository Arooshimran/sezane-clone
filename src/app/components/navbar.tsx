// SezaneNavbar.tsx
'use client';
import React, { useState } from 'react';

const imageSet1 = [
    { title: 'NEW IN', img: '/new-in.avif' },
    { title: 'ARCHIVES', img: '/archives.avif' },
    { title: 'SHOP', img: '/shop.avif' },
];

const imageSet2 = [
    { title: 'BASKET', img: '/baskets.avif' },
    { title: 'JEWELRY', img: '/jewelry.avif' },
    { title: 'SHOES', img: '/shoe.avif' },
];

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
    const [imageSetToggle, setImageSetToggle] = useState<boolean>(false);

    const handleMouseEnter = (menu: string) => {
        setActiveDropdown(menu);
        setImageSetToggle(menu === 'NEW IN');
    };

    const handleMouseLeave = () => {
        setActiveDropdown(null);
    };

    const dropdownShouldOpen = (menu: string) =>
        ['SHOP', 'NEW IN'].includes(menu);


    const images = imageSetToggle ? imageSet2 : imageSet1;

    return (
        <div className="relative"
            style={{
                backgroundColor: '#f8f6f1',
                backgroundImage: "url('/45-degree-fabric-light.webp')",
            }}>
            <nav className="bg-transparent absolute top-0 left-0 w-full z-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-center gap-10 h-16">
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
                                <div className="group relative cursor-pointer">
                                    <span className="text-white font-medium tracking-wide transition-colors group-hover:text-black">
                                        {label}
                                    </span>
                                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                                </div>


                            </div>
                        ))}
                    </div>

                </div>
            </nav>

            {/* Dropdown Menu */}
            <div
                className={`absolute top-16 left-0 w-full transition-all duration-700 ease-in-out transform z-40 ${activeDropdown ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-95 invisible'
                    } origin-top`}
                onMouseEnter={() => setActiveDropdown(activeDropdown)}
                onMouseLeave={handleMouseLeave}
            >
                <div className=" backdrop-blur-sm border-b border-gray-100 shadow-lg py-8"
                    style={{
                        backgroundColor: '#f8f6f1',
                        backgroundImage: "url('/45-degree-fabric-light.webp')",
                    }}>
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-4 gap-8">
                            {/* First Column */}
                            <div className="col-span-1">
                                <h3 className="text-black font-bold mb-4 tracking-wide">
                                    {activeDropdown === 'NEW IN' ? 'NEW COLLECTION' : 'CATEGORIES'}
                                </h3>
                                <ul className="space-y-3">
                                    {dropdownItems.map((item, index) => (
                                        <li key={index}>
                                            <button className="text-gray-600 hover:text-black transition-colors text-left font-light tracking-wide">
                                                {item}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Second Column */}
                            <div className="col-span-1">
                                <h3 className="text-black font-bold mb-4 tracking-wide">DISCOVER</h3>
                                <ul className="space-y-3">
                                    {discoverItems.map((item, index) => (
                                        <li key={index}>
                                            <button className="text-gray-600 hover:text-black transition-colors text-left font-light tracking-wide">
                                                {item}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Third and Fourth Columns - Images */}
                            <div className="col-span-2 grid grid-cols-3 gap-4 h-80">
                                {images.map(({ title, img }, idx) => (
                                    <div
                                        key={idx}
                                        className="relative rounded overflow-hidden group cursor-pointer"
                                    >
                                        <img
                                            src={img}
                                            alt={title}
                                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                        <div className="absolute bottom-4 left-4 text-white">
                                            <h4 className="text-2xl font-bold">{title}</h4>
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
                    className="fixed inset-0 bg-opacity-20 z-30"
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
