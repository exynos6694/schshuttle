import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import type { ShuttleTime } from '../data/schedule';
import { getTimeRemaining, formatBusTime, isServiceDay } from '../utils/timeUtils';

interface NextBusCardProps {
  nextBuses: ShuttleTime[]; // [가장 가까운 버스, 다다음 버스]
}

export const NextBusCard: React.FC<NextBusCardProps> = ({ nextBuses }) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [followingTimeLeft, setFollowingTimeLeft] = useState<number | null>(null);

  const nextBus = nextBuses.length > 0 ? nextBuses[0] : null;
  const followingBus = nextBuses.length > 1 ? nextBuses[1] : null;

  useEffect(() => {
    if (!nextBus) return;
    const update = () => {
      const now = new Date();
      setTimeLeft(getTimeRemaining(nextBus, now));
      if (followingBus) {
        setFollowingTimeLeft(getTimeRemaining(followingBus, now));
      }
    };
    update();
    const timer = setInterval(update, 1000 * 30); // Update every 30s
    return () => clearInterval(timer);
  }, [nextBus, followingBus]);

  if (!isServiceDay(new Date())) {
    return (
      <div className="mx-4 mt-4 p-6 bg-white rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center justify-center text-slate-400 min-h-[200px]">
        <AlertCircle className="w-12 h-12 mb-2 opacity-50" />
        <p>토요일 및 공휴일은 운행하지 않습니다</p>
      </div>
    );
  }

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
        {/* 가장 가까운 다음 버스 */}
        <div className="flex justify-between items-start mb-2">
          <span className="text-slate-500 font-medium text-sm uppercase tracking-wider">Next Bus</span>
          <div className="flex gap-1.5 items-center">
            {nextBus.isExpress && (
              <div className="bg-red-50 text-red-600 px-2.5 py-1 rounded-full text-[10px] font-bold">
                급행
              </div>
            )}
            {nextBus.destination && (
              <div className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full text-[10px] font-bold">
                {nextBus.destination}
              </div>
            )}
            <div className="bg-blue-50 text-primary px-3 py-1 rounded-full text-xs font-bold">
              {formatBusTime(nextBus)}
            </div>
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

        <div className="mt-6 mb-4">
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

        {/* 다다음 버스 안내 (디자인 강화) */}
        {followingBus && followingTimeLeft !== null && !isDeparting && (
          <div className="mt-5 p-3.5 bg-slate-50 rounded-xl flex justify-between items-center border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
              <span className="bg-slate-200 text-slate-600 text-[10px] px-2 py-0.5 rounded-full font-bold">다음 차</span>
              <span className="font-bold text-slate-800 text-base">{formatBusTime(followingBus)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              {followingBus.isExpress && <span className="text-red-500 font-bold">[급행]</span>}
              <span className="text-primary font-bold bg-blue-100/50 px-2.5 py-1 rounded-md">
                {followingTimeLeft}분 뒤
              </span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
