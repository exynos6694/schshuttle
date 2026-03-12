import React, { useState, useEffect } from 'react';
import type { ShuttleTime } from '../data/schedule';
import { formatBusTime, getTimeRemaining } from '../utils/timeUtils';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface TimeTableProps {
  schedule: ShuttleTime[];
  nextBus: ShuttleTime | null;
}

export const TimeTable: React.FC<TimeTableProps> = ({ schedule, nextBus }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // 1분마다 현재 시간 업데이트 (남은 시간 계산용)
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Find index of next bus
  const nextBusIndex = nextBus 
    ? schedule.findIndex(b => b.hour === nextBus.hour && b.minute === nextBus.minute)
    : -1;

  const upcomingBuses = nextBusIndex !== -1 ? schedule.slice(nextBusIndex) : [];
  const pastBuses = nextBusIndex !== -1 ? schedule.slice(0, nextBusIndex) : schedule;

  const displaySchedule = [
    ...upcomingBuses.map((bus, i) => ({ bus, isNext: i === 0, isPast: false, originalIndex: nextBusIndex + i })),
    ...pastBuses.map((bus, i) => ({ bus, isNext: false, isPast: true, originalIndex: i }))
  ];

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-3 pb-20">
      <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-4 px-2">
        예정 시간표
      </h3>
      
      {displaySchedule.map(({ bus, isNext, isPast, originalIndex }, idx) => {
        // 지난 시간표가 시작되는 첫 번째 인덱스 찾기
        const isFirstPast = isPast && (idx === 0 || !displaySchedule[idx - 1].isPast);
        const isExpanded = expandedIndex === originalIndex;
        const timeLeft = getTimeRemaining(bus, currentTime);

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
              layout="position"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(idx, 15) * 0.05 }}
              onClick={() => toggleExpand(originalIndex)}
              className={`flex flex-col p-4 rounded-xl border transition-all cursor-pointer overflow-hidden ${
                isExpanded 
                  ? 'bg-blue-50/50 border-blue-300 shadow-md ring-1 ring-blue-100 border-l-4 border-l-blue-500'
                  : isNext 
                    ? 'bg-blue-50 border-blue-200 shadow-sm border-l-4 border-l-blue-500' 
                    : isPast 
                      ? 'bg-slate-50/60 border-transparent opacity-50 hover:opacity-75 border-l-4 border-l-slate-200'
                      : 'bg-white border-slate-100 hover:border-blue-100 hover:bg-slate-50/50 border-l-4 border-l-transparent hover:border-l-blue-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full transition-colors ${isExpanded ? 'bg-blue-500' : isNext ? 'bg-primary' : 'bg-slate-300'}`} />
                  <div className="flex flex-col">
                    <span className={`font-bold text-lg transition-colors ${isExpanded || isNext ? 'text-primary' : 'text-slate-700'}`}>
                      {formatBusTime(bus)}
                    </span>
                    {bus.trainTime && (
                      <span className="text-xs flex items-center gap-1 mt-0.5 transition-colors text-slate-400">
                        지하철: {bus.trainTime}
                        {bus.destination && <span>({bus.destination})</span>}
                        {bus.isExpress && <span className="text-red-500 font-bold ml-1">급행</span>}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {isNext && !isExpanded && (
                    <span className="text-xs font-bold text-primary bg-white px-2 py-1 rounded-md shadow-sm">
                      NEXT
                    </span>
                  )}
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <ChevronDown className={`w-5 h-5 ${isExpanded ? 'text-blue-500' : 'text-slate-300'}`} />
                  </motion.div>
                </div>
              </div>

              {/* 확장 컨텐츠 공간 */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 mt-4 border-t border-blue-100/50">
                      <div className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm border border-slate-100">
                        <span className="text-sm font-semibold text-slate-600">남은 시간</span>
                        {isPast ? (
                          <span className="text-sm font-bold text-slate-400">출발 완료</span>
                        ) : timeLeft <= 0 ? (
                          <span className="text-sm font-bold text-red-500 animate-pulse">출발 임박</span>
                        ) : (
                          <div className="flex items-baseline gap-1">
                            {timeLeft >= 60 && (
                              <>
                                <span className={`text-xl font-black ${timeLeft <= 10 ? 'text-red-500' : 'text-primary'}`}>
                                  {Math.floor(timeLeft / 60)}
                                </span>
                                <span className="text-xs font-bold text-slate-500 mr-1">시간</span>
                              </>
                            )}
                            <span className={`text-xl font-black ${timeLeft <= 10 ? 'text-red-500' : 'text-primary'}`}>
                              {timeLeft % 60}
                            </span>
                            <span className="text-xs font-bold text-slate-500">분 뒤</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
