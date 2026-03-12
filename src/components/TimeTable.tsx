import React from 'react';
import type { ShuttleTime } from '../data/schedule';
import { formatBusTime } from '../utils/timeUtils';
import { motion } from 'framer-motion';

interface TimeTableProps {
  schedule: ShuttleTime[];
  nextBus: ShuttleTime | null;
}

export const TimeTable: React.FC<TimeTableProps> = ({ schedule, nextBus }) => {
  // Find index of next bus
  const nextBusIndex = nextBus 
    ? schedule.findIndex(b => b.hour === nextBus.hour && b.minute === nextBus.minute)
    : -1;

  const upcomingBuses = nextBusIndex !== -1 ? schedule.slice(nextBusIndex) : [];
  const pastBuses = nextBusIndex !== -1 ? schedule.slice(0, nextBusIndex) : schedule;

  const displaySchedule = [
    ...upcomingBuses.map((bus, i) => ({ bus, isNext: i === 0, isPast: false })),
    ...pastBuses.map((bus) => ({ bus, isNext: false, isPast: true }))
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-3 pb-20">
      <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-4 px-2">
        예정 시간표
      </h3>
      
      {displaySchedule.map(({ bus, isNext, isPast }, idx) => {
        // 지난 시간표가 시작되는 첫 번째 인덱스 찾기
        const isFirstPast = isPast && (idx === 0 || !displaySchedule[idx - 1].isPast);

        return (
          <React.Fragment key={`${bus.hour}-${bus.minute}`}>
            {isFirstPast && (
              <div className="flex items-center gap-3 py-6 mt-4">
                <div className="h-px bg-slate-200 flex-1"></div>
                <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                  운행 종료 (지난 버스)
                </span>
                <div className="h-px bg-slate-200 flex-1"></div>
              </div>
            )}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            transition={{ delay: Math.min(idx, 15) * 0.05 }}
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
                  <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    지하철: {bus.trainTime}
                    {bus.destination && <span>({bus.destination})</span>}
                    {bus.isExpress && <span className="text-red-500 font-bold ml-1">급행</span>}
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
        </React.Fragment>
      );
    })}
    </div>
  );
};
