import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import type { ShuttleTime } from '../data/schedule';
import { getTimeRemaining, formatBusTime } from '../utils/timeUtils';

interface NextBusCardProps {
  nextBus: ShuttleTime | null;
}

export const NextBusCard: React.FC<NextBusCardProps> = ({ nextBus }) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!nextBus) return;
    const update = () => {
      const diff = getTimeRemaining(nextBus, new Date());
      setTimeLeft(diff);
    };
    update();
    const timer = setInterval(update, 1000 * 30); // Update every 30s
    return () => clearInterval(timer);
  }, [nextBus]);

  if (!nextBus) {
    return (
      <div className="mx-4 mt-4 p-6 bg-white rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center justify-center text-slate-400 min-h-[200px]">
        <AlertCircle className="w-12 h-12 mb-2 opacity-50" />
        <p>버스 운행이 종료되었습니다</p>
      </div>
    );
  }

  const isImminent = timeLeft !== null && timeLeft <= 5;
  const isDeparting = timeLeft !== null && timeLeft <= 0;

  return (
    <div className="mx-4 mt-2 relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100"
      >
        <div className="flex justify-between items-start mb-2">
          <span className="text-slate-500 font-medium text-sm uppercase tracking-wider">Next Bus</span>
          <div className="bg-blue-50 text-primary px-3 py-1 rounded-full text-xs font-bold">
            {formatBusTime(nextBus)}
          </div>
        </div>

        <div className="flex items-baseline mt-2">
          {isDeparting ? (
             <span className="text-4xl font-bold text-red-500">출발함</span>
          ) : (
            <>
              <span className="text-6xl font-bold text-slate-900 tracking-tighter">
                {timeLeft}
              </span>
              <span className="text-xl text-slate-500 ml-2 font-medium">분 뒤</span>
            </>
          )}
        </div>

        <div className="mt-6">
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${isImminent ? 'bg-red-500' : 'bg-primary'}`}
              initial={{ width: "100%" }}
              animate={{ width: isDeparting ? "100%" : "60%" }} // Mock progress for MVP
              transition={{ duration: 1 }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2 text-right">
            {nextBus.type === 'to_school' ? '지하철 시간표 기반' : '학교 시간표 기반'}
          </p>
        </div>
      </motion.div>
    </div>
  );
};
