import { useState, useEffect } from 'react';

// 앱 전체가 공유하는 단일 1초 타이머.
// 컴포넌트마다 setInterval을 두지 않고 여기에 구독하여 현재 시각을 받는다.
type Listener = (now: number) => void;
const listeners = new Set<Listener>();
let timer: ReturnType<typeof setInterval> | null = null;

const subscribe = (listener: Listener): (() => void) => {
  listeners.add(listener);
  if (timer === null) {
    timer = setInterval(() => {
      const now = Date.now();
      listeners.forEach((l) => l(now));
    }, 1000);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  };
};

/**
 * 공유 타이머에 구독해 현재 시각(Date)을 반환한다.
 * `stepMs` 간격이 바뀔 때만 리렌더하므로(예: 60_000 → 분 단위) 불필요한 갱신을 막는다.
 */
export const useNow = (stepMs: number = 1000): Date => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let lastStep = Math.floor(Date.now() / stepMs);
    return subscribe((ms) => {
      const step = Math.floor(ms / stepMs);
      if (step !== lastStep) {
        lastStep = step;
        setNow(new Date(ms));
      }
    });
  }, [stepMs]);

  return now;
};
