import React from 'react';
import type { ShuttleTime } from '../data/schedule';
import { formatBusTime } from '../utils/timeUtils';
import { motion } from 'framer-motion';

interface TimeTableProps {
  schedule: ShuttleTime[];
  nextBus: ShuttleTime | null;
}

export const TimeTable: React.FC<TimeTableProps> = ({ schedule, nextBus }) => {
  // Filter to show only future buses or recent ones
  // For MVP, show all but highlight next
  
  // Find index of next bus
  const nextBusIndex = nextBus 
    ? schedule.findIndex(b => b.hour === nextBus.hour && b.minute === nextBus.minute)
    : -1;

  // Scroll to next bus logic could be added here

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-3 pb-20">
      <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-4 px-2">
        Upcoming Schedule
      </h3>
      
      {schedule.map((bus, idx) => {
        const isNext = idx === nextBusIndex;
        const isPast = nextBusIndex !== -1 && idx < nextBusIndex;

        return (
          <motion.div
            key={`${bus.hour}-${bus.minute}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
              isNext 
                ? 'bg-blue-50 border-blue-200 shadow-sm' 
                : isPast 
                  ? 'bg-slate-50 border-transparent opacity-50'
                  : 'bg-white border-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isNext ? 'bg-primary' : 'bg-slate-300'}`} />
              <div className="flex flex-col">
                <span className={`font-bold text-lg ${isNext ? 'text-primary' : 'text-slate-700'}`}>
                  {formatBusTime(bus)}
                </span>
                {bus.trainTime && (
                  <span className="text-xs text-slate-400">
                    Train: {bus.trainTime}
                  </span>
                )}
              </div>
            </div>
            {isNext && (
              <span className="text-xs font-bold text-primary bg-white px-2 py-1 rounded-md shadow-sm">
                NEXT
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
