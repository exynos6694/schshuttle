import type { ShuttleTime } from '../data/schedule';
import { differenceInMinutes, set, isAfter, format, isSaturday, isSunday, addDays, subDays } from 'date-fns';
import { KR_HOLIDAYS } from '../data/holidays';

/** 대한민국 법정공휴일 여부 (정적 테이블 기반, KR_HOLIDAY_RANGE 범위 밖은 false) */
const isPublicHoliday = (date: Date): boolean => KR_HOLIDAYS.has(format(date, 'yyyy-MM-dd'));

/**
 * 오늘이 "일요일을 포함한 연휴의 마지막 날"인지 판별합니다.
 * 예: 토(휴)-일(휴)-월(공휴일) → 월요일이 연휴 마지막 날이며 일요일이 포함 → true
 * 이 경우 일요일 시간표로 운행합니다.
 */
export const isLastDayOfHolidayWithSunday = (date: Date): boolean => {
  // 오늘 자체가 운행일(일반 평일)이면 해당 없음
  // 단, 공휴일인 평일은 체크 대상
  const todayIsHoliday = isPublicHoliday(date);
  const todayIsSaturday = isSaturday(date);
  const todayIsSunday = isSunday(date);

  // 오늘이 휴일(공휴일/토/일)이 아니면 해당 없음
  if (!todayIsHoliday && !todayIsSaturday && !todayIsSunday) return false;

  // 내일이 또 휴일이면 오늘은 "마지막 날"이 아님
  const tomorrow = addDays(date, 1);
  const tomorrowIsHoliday = isPublicHoliday(tomorrow);
  const tomorrowIsSaturday = isSaturday(tomorrow);
  const tomorrowIsSunday = isSunday(tomorrow);
  if (tomorrowIsHoliday || tomorrowIsSaturday || tomorrowIsSunday) return false;
  
  // 오늘부터 과거로 거슬러 올라가며 연속 휴일 기간을 찾고, 일요일 포함 여부 확인
  let hasSunday = todayIsSunday;
  let checkDate = subDays(date, 1);
  
  // 최대 14일까지만 체크 (안전장치)
  for (let i = 0; i < 14; i++) {
    const isHol = isPublicHoliday(checkDate);
    const isSat = isSaturday(checkDate);
    const isSun = isSunday(checkDate);
    
    if (!isHol && !isSat && !isSun) break; // 연휴 끊김
    if (isSun) hasSunday = true;
    checkDate = subDays(checkDate, 1);
  }
  
  // 연휴에 일요일이 포함되어 있고, 오늘이 연휴 마지막 날이면 true
  return hasSunday;
};

// 학교 자체 휴일 (월-일 관계없이 셔틀 미운행)
const SCHOOL_HOLIDAYS = [
  { month: 4, day: 3 }, // 개교기념일
];

const isSchoolHoliday = (date: Date): boolean => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return SCHOOL_HOLIDAYS.some(h => h.month === month && h.day === day);
};

export const isServiceDay = (date: Date): boolean => {
  // 학교 자체 휴일 (개교기념일 등)
  if (isSchoolHoliday(date)) return false;

  // 토요일은 운행하지 않음
  if (isSaturday(date)) return false;

  // 연휴 마지막 날(일요일 포함 연휴)이면 일요일 시간표로 운행
  if (isLastDayOfHolidayWithSunday(date)) return true;

  // 법정공휴일이면 미운행 (토요일 외 일요일은 운행)
  return !isPublicHoliday(date);
};

export const getNextBuses = (schedule: ShuttleTime[], currentTime: Date, count: number = 2): ShuttleTime[] => {
  if (!isServiceDay(currentTime)) {
    return [];
  }

  // Sort schedule just in case
  const sorted = [...schedule].sort((a, b) => {
    if (a.hour !== b.hour) return a.hour - b.hour;
    return a.minute - b.minute;
  });

  const nextBuses: ShuttleTime[] = [];

  for (const bus of sorted) {
    const busTime = set(currentTime, { hours: bus.hour, minutes: bus.minute, seconds: 0, milliseconds: 0 });
    if (isAfter(busTime, currentTime)) {
      nextBuses.push(bus);
      if (nextBuses.length >= count) {
        break;
      }
    }
  }
  
  return nextBuses;
};

export const getTimeRemaining = (bus: ShuttleTime, currentTime: Date): number => {
  const busTime = set(currentTime, { hours: bus.hour, minutes: bus.minute, seconds: 0, milliseconds: 0 });
  return differenceInMinutes(busTime, currentTime);
};

export const formatBusTime = (bus: ShuttleTime): string => {
  const d = set(new Date(), { hours: bus.hour, minutes: bus.minute });
  return format(d, 'HH:mm');
};
