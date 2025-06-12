'use client';
import React, { useState, useRef, useLayoutEffect } from 'react';

export default function ProductTabs({ description }: { description: any }) {
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredTab, setHoveredTab] = useState<number | null>(null); // NEW
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  const tabs = [
    {
      label: 'DESCRIPTION',
      content: (
        <div className="space-y-4">
          {description?.map((block: any, i: number) => (
            <div key={i} className="space-y-2">
              {block.children.map((child: any, j: number) => (
                <p key={j} className="text-gray-700 leading-relaxed font-['Oswald']">
                  • {child.text}
                </p>
              ))}
            </div>
          ))}
        </div>
      ),
    },
    {
      label: 'DETAILS & COMPOSITION',
      content: (
        <div className="space-y-2">
          <p className="text-gray-700 leading-relaxed font-['Oswald']">Details and composition info coming soon.</p>
        </div>
      ),
    },
    {
      label: 'OUR ATELIERS',
      content: (
        <div className="space-y-2">
          <p className="text-gray-700 leading-relaxed font-bold font-['Oswald']">WHERE IS SÉZANE MADE?</p>
          <p className="text-gray-700 leading-relaxed font-['Oswald']">
            More than 2/3 of our products are produced in Europe, the rest all over the world, depending on the origin of raw materials, expertise, working conditions and production capacities. All of our workshops are audited by independent experts, in compliance with the standards we have selected (BSCI, SMETA, ICS or WCA audits).
          </p>
        </div>
      ),
    },
  ];

  useLayoutEffect(() => {
    const idx = hoveredTab !== null ? hoveredTab : activeTab;
    const current = tabRefs.current[idx];
    if (current) {
      setUnderlineStyle({
        left: current.offsetLeft,
        width: current.offsetWidth,
      });
    }
  }, [activeTab, hoveredTab, tabs.length]); // Add hoveredTab

  return (
    <div>
      <div className="border-b border-gray-200 relative">
        <nav className="flex space-x-6 relative">
          {tabs.map((tab, idx) => (
            <button
              key={tab.label}
              ref={el => { tabRefs.current[idx] = el; }}
              className={`pb-2 text-sm font-bold font-['Oswald'] transition-colors ${
                activeTab === idx
                  ? 'text-black'
                  : 'text-gray-500 hover:text-black'
              }`}
              onClick={() => setActiveTab(idx)}
              type="button"
              style={{ position: 'relative', background: 'none', border: 'none' }}
              onMouseEnter={() => setHoveredTab(idx)} // NEW
              onMouseLeave={() => setHoveredTab(null)} // NEW
            >
              {tab.label}
            </button>
          ))}
        </nav>
        {/* Animated underline */}
        <div
          className=" absolute bottom-0 h-0.5 bg-black transition-all duration-300"
          style={{
            left: underlineStyle.left,
            width: underlineStyle.width,
          }}
        />
      </div>
      <div className="pt-6">{tabs[activeTab].content}</div>
    </div>
  );
}