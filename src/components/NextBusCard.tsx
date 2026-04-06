import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import type { ShuttleTime } from '../data/schedule';
import { getTimeRemaining, formatBusTime, isServiceDay } from '../utils/timeUtils';

interface NextBusCardProps {
  nextBuses: ShuttleTime[]; // [가장 가까운 버스, 다다음 버스]
}

export const NextBusCard: React.FC<NextBusCardProps> = ({ nextBuses }) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [followingTimeLeft, setFollowingTimeLeft] = useState<number | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const nextBus = nextBuses.length > 0 ? nextBuses[0] : null;
  const followingBus = nextBuses.length > 1 ? nextBuses[1] : null;

  // Intersection Observer for sticky state
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => setIsSticky(e.intersectionRatio < 1),
      { threshold: [1], rootMargin: '-17px 0px 0px 0px' }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

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

  // 최대 대기시간(30분) 기준으로 차오르는 퍼센테이지 계산 (30분 이상 남았을 때는 게이지가 0에서 대기)
  const maxWaitTime = 40;
  const progressPercent = timeLeft !== null 
    ? Math.max(0, Math.min(100, ((maxWaitTime - timeLeft) / maxWaitTime) * 100))
    : 0;

  return (
    <div ref={cardRef} className="mx-4 mt-2 mb-4 relative z-30 sticky top-4 transition-all duration-300">
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100/50 overflow-hidden transition-all duration-500 ease-in-out ${
          isSticky ? 'p-4' : 'p-6'
        }`}
      >
        {/* 상단 라인: 타이틀 + 시간/목적지 정보 */}
        <motion.div layout className={`flex justify-between items-center ${isSticky ? '' : 'mb-2'}`}>
          <motion.div layout className="flex items-center gap-1.5">
            <span className={`font-bold text-sm uppercase tracking-wider ${nextBus.hasNoShuttle ? 'text-slate-400' : 'text-slate-500'}`}>
              {nextBus.hasNoShuttle ? 'Next Subway' : 'Next Bus'}
            </span>
          </motion.div>
          <motion.div layout className="flex gap-1.5 items-center">
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
            <div className={`${nextBus.hasNoShuttle ? 'bg-slate-100 text-slate-500' : 'bg-blue-50 text-primary'} px-3 py-1 rounded-full text-xs font-bold`}>
              {formatBusTime(nextBus)}
            </div>
            
            {/* Sticky 모드일 때만 헤더 옆에 간단히 시간 표시 */}
            {isSticky && (
              <div className="ml-2 border-l border-slate-200 pl-3">
                {isDeparting ? (
                  <span className="text-sm font-bold text-red-500 animate-pulse">출발</span>
                ) : (
                  <div className="flex items-baseline gap-1">
                    {isImminent && <span className="bg-red-500 text-white text-[10px] px-1.5 py-[1px] rounded font-bold animate-pulse">임박</span>}
                    {timeLeft !== null && timeLeft >= 60 && (
                      <>
                        <span className={`text-xl font-black tracking-tighter ${isImminent ? 'text-red-500' : 'text-slate-900'}`}>
                          {Math.floor(timeLeft / 60)}
                        </span>
                        <span className="text-xs font-bold text-slate-500 mr-1">시간</span>
                      </>
                    )}
                    <span className={`text-xl font-black tracking-tighter ${isImminent ? 'text-red-500' : 'text-slate-900'}`}>
                      {timeLeft !== null ? timeLeft % 60 : 0}
                    </span>
                    <span className="text-xs font-bold text-slate-500">분 뒤</span>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* 메인 시간 표시 (비 Sticky 모드일 때만 보임) */}
        <AnimatePresence>
          {!isSticky && (
            <motion.div
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
              className="flex flex-col"
            >
              <div className="flex items-baseline mt-2 relative">
                {isDeparting ? (
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                    </span>
                    <span className="text-4xl font-black text-red-500 tracking-tight">출발</span>
                  </div>
                ) : (
                  <div className="relative flex items-baseline">
                    {isImminent && (
                      <span className="absolute -inset-4 rounded-full bg-red-100/50 animate-ping -z-10" />
                    )}
                    {timeLeft !== null && timeLeft >= 60 && (
                      <>
                        <span className={`text-5xl sm:text-6xl font-black tracking-tighter ${
                          isImminent ? 'text-red-500' : nextBus.hasNoShuttle ? 'bg-gradient-to-r from-slate-500 to-slate-400 bg-clip-text text-transparent' : 'bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent'
                        }`}>
                          {Math.floor(timeLeft / 60)}
                        </span>
                        <span className={`text-xl sm:text-2xl ml-1 mr-3 font-bold ${isImminent ? 'text-red-400' : 'text-slate-400'}`}>시간</span>
                      </>
                    )}
                    <span className={`text-5xl sm:text-6xl font-black tracking-tighter ${
                      isImminent ? 'text-red-500' : nextBus.hasNoShuttle ? 'bg-gradient-to-r from-slate-500 to-slate-400 bg-clip-text text-transparent' : 'bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent'
                    }`}>
                      {timeLeft !== null ? timeLeft % 60 : 0}
                    </span>
                    <span className={`text-xl ml-2 font-bold ${isImminent ? 'text-red-400' : 'text-slate-400'}`}>분 뒤</span>
                    {isImminent && <span className="absolute top-0 -right-12 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold animate-pulse">임박</span>}
                  </div>
                )}
              </div>

              <div className="mt-6 mb-4">
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full relative overflow-hidden ${isImminent ? 'bg-red-500' : nextBus.hasNoShuttle ? 'bg-gradient-to-r from-slate-400 to-slate-300' : 'bg-gradient-to-r from-blue-500 to-blue-400'}`}
                    initial={{ width: "100%" }}
                    animate={{ width: isDeparting ? "100%" : `${progressPercent}%` }}
                    transition={{ duration: 1 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </motion.div>
                </div>
                <p className="text-xs text-slate-400 mt-2 text-right">
                  {nextBus.hasNoShuttle 
                    ? '셔틀 미운행 / 전철 전용 표시' 
                    : nextBus.type === 'to_school' ? '지하철 시간표 기반' : '학교 시간표 기반'}
                </p>
              </div>

              {/* 다다음 버스 안내 */}
              {followingBus && followingTimeLeft !== null && (
                <div className="mt-2 p-3.5 bg-slate-50 rounded-xl flex justify-between items-center border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <span className="bg-slate-200 text-slate-600 text-[10px] px-2 py-0.5 rounded-full font-bold">다음 차</span>
                    <span className="font-bold text-slate-800 text-base">
                      {followingBus.hasNoShuttle ? '셔틀없음 ' : ''}{formatBusTime(followingBus)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    {followingBus.isExpress && <span className="text-red-500 font-bold">[급행]</span>}
                    <span className="text-primary font-bold bg-blue-100/50 px-2.5 py-1 rounded-md">
                      {followingTimeLeft !== null && followingTimeLeft >= 60 
                        ? `${Math.floor(followingTimeLeft / 60)}시간 ${followingTimeLeft % 60}분 뒤` 
                        : `${followingTimeLeft}분 뒤`}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
