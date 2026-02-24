import type { ShuttleTime } from '../data/schedule';
import { differenceInMinutes, set, isAfter, format, isWeekend } from 'date-fns';
import Holidays from 'date-holidays';

const hd = new Holidays('KR');

export const isServiceDay = (date: Date): boolean => {
  if (isWeekend(date)) return false;
  
  // date-holidays checks if given date is a holiday
  const holidayInstance = hd.isHoliday(date);
  
  // if holidayInstance is truthy, it's a holiday
  return !holidayInstance;
};

export const getNextBus = (schedule: ShuttleTime[], currentTime: Date): ShuttleTime | null => {
  if (!isServiceDay(currentTime)) {
    return null;
  }

  // Sort schedule just in case
  const sorted = [...schedule].sort((a, b) => {
    if (a.hour !== b.hour) return a.hour - b.hour;
    return a.minute - b.minute;
  });

  for (const bus of sorted) {
    const busTime = set(currentTime, { hours: bus.hour, minutes: bus.minute, seconds: 0, milliseconds: 0 });
    if (isAfter(busTime, currentTime)) {
      return bus;
    }
  }
  
  // If no bus left today, return the first one tomorrow (optional, for now return null)
  return null;
};

export const getTimeRemaining = (bus: ShuttleTime, currentTime: Date): number => {
  const busTime = set(currentTime, { hours: bus.hour, minutes: bus.minute, seconds: 0, milliseconds: 0 });
  return differenceInMinutes(busTime, currentTime);
};

export const formatBusTime = (bus: ShuttleTime): string => {
  const d = set(new Date(), { hours: bus.hour, minutes: bus.minute });
  return format(d, 'HH:mm');
};
