import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

export type Route = 'to_station' | 'to_school' | 'loop';

interface RouteSelectorProps {
  currentRoute: Route;
  onSelect: (route: Route) => void;
}

export const RouteSelector: React.FC<RouteSelectorProps> = ({ currentRoute, onSelect }) => {
    const tabs: { id: Route; label: string }[] = [
      { id: 'to_station', label: 'To Station' },
      { id: 'to_school', label: 'To School' },
    ];

  return (
    <div className="px-4 mb-6">
      <div className="bg-white/10 backdrop-blur-md p-1 rounded-xl flex relative z-20">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            className={clsx(
              "flex-1 py-2 text-sm font-medium rounded-lg relative transition-colors duration-200",
              currentRoute === tab.id ? "text-primary" : "text-white hover:text-blue-100"
            )}
          >
            {currentRoute === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white rounded-lg shadow-sm"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
