'use client';
import React, { useState } from 'react';

export default function ProductTabs({ description }: { description: any }) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      label: 'DESCRIPTION',
      content: (
        <div className="space-y-4">
          {description?.map((block: any, i: number) => (
            <div key={i} className="space-y-2">
              {block.children.map((child: any, j: number) => (
                <p key={j} className="text-gray-700 leading-relaxed">
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
          <p className="text-gray-700 leading-relaxed">Details and composition info coming soon.</p>
        </div>
      ),
    },
    {
      label: 'OUR ATELIERS',
      content: (
        <div className="space-y-2">
          <p className="text-gray-700 leading-relaxed font-bold">WHERE IS SÉZANE MADE?</p>
          <p className="text-gray-700 leading-relaxed">
            More than 2/3 of our products are produced in Europe, the rest all over the world, depending on the origin of raw materials, expertise, working conditions and production capacities. All of our workshops are audited by independent experts, in compliance with the standards we have selected (BSCI, SMETA, ICS or WCA audits).
          </p>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="border-b border-gray-200 relative">
        <nav className="flex space-x-8 relative">
          {tabs.map((tab, idx) => (
            <button
              key={tab.label}
              className={`pb-2 text-sm font-bold transition-colors ${
                activeTab === idx
                  ? 'text-black'
                  : 'text-gray-500 hover:text-black'
              }`}
              onClick={() => setActiveTab(idx)}
              type="button"
              style={{ position: 'relative' }}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        {/* Animated underline */}
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-black transition-all duration-300"
          style={{
            width: `calc(100% / ${tabs.length})`,
            transform: `translateX(${activeTab * 100}%)`,
          }}
        />
      </div>
      <div className="pt-6">{tabs[activeTab].content}</div>
    </div>
  );
}