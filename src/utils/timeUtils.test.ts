import { describe, it, expect } from 'vitest';
import {
  getNextBuses,
  getTimeRemaining,
  formatBusTime,
  isServiceDay,
  isLastDayOfHolidayWithSunday,
} from './timeUtils';
import { TO_STATION_SCHEDULE } from '../data/schedule';

// 로컬 컴포넌트로 날짜를 만들어 date-fns/format과 일관되게 비교한다(월은 0-base).
const at = (y: number, m: number, d: number, h = 12, min = 0) => new Date(y, m - 1, d, h, min);

describe('isServiceDay', () => {
  it('평일은 운행한다', () => {
    expect(isServiceDay(at(2026, 6, 10))).toBe(true); // 수요일
  });

  it('토요일은 운행하지 않는다', () => {
    expect(isServiceDay(at(2026, 6, 13))).toBe(false); // 토요일
  });

  it('일요일은 운행한다(주말 시간표)', () => {
    expect(isServiceDay(at(2026, 6, 14))).toBe(true); // 일요일
  });

  it('법정공휴일(평일)은 운행하지 않는다', () => {
    expect(isServiceDay(at(2026, 1, 1))).toBe(false); // 신정(목)
  });

  it('개교기념일(4/3)은 운행하지 않는다', () => {
    expect(isServiceDay(at(2026, 4, 3))).toBe(false);
  });

  it('제헌절(7/17)은 공휴일이 아니므로 운행한다', () => {
    // 2026-07-17은 금요일이며 법정공휴일이 아니다(과거 date-holidays 전체 판정 버그 회귀 방지)
    expect(isServiceDay(at(2026, 7, 17))).toBe(true);
  });
});

describe('isLastDayOfHolidayWithSunday', () => {
  it('일요일을 포함한 연휴의 마지막 평일이면 true', () => {
    // 2025 추석 연휴: 10/3(금)~10/7(화), 10/5(일) 포함, 10/8(수) 정상
    expect(isLastDayOfHolidayWithSunday(at(2025, 10, 7))).toBe(true);
  });

  it('단발성 평일 공휴일은 false', () => {
    expect(isLastDayOfHolidayWithSunday(at(2026, 1, 1))).toBe(false);
  });
});

describe('getNextBuses', () => {
  it('현재 시각 이후 버스만 count개 반환한다', () => {
    const now = at(2026, 6, 10, 10, 30); // 평일 10:30
    const next = getNextBuses(TO_STATION_SCHEDULE, now, 2);
    expect(next).toHaveLength(2);
    expect(next[0]).toMatchObject({ hour: 10, minute: 48 });
    expect(next[1]).toMatchObject({ hour: 11, minute: 11 });
  });

  it('막차 이후에는 빈 배열을 반환한다', () => {
    expect(getNextBuses(TO_STATION_SCHEDULE, at(2026, 6, 10, 23, 59), 2)).toHaveLength(0);
  });

  it('미운행일에는 빈 배열을 반환한다', () => {
    expect(getNextBuses(TO_STATION_SCHEDULE, at(2026, 6, 13, 12, 0), 2)).toHaveLength(0);
  });
});

describe('getTimeRemaining / formatBusTime', () => {
  it('남은 시간을 분 단위로 계산한다', () => {
    expect(getTimeRemaining({ hour: 10, minute: 48, type: 'to_station' }, at(2026, 6, 10, 10, 30))).toBe(18);
  });

  it('HH:mm 형식으로 포맷한다(0 패딩)', () => {
    expect(formatBusTime({ hour: 9, minute: 2, type: 'to_station' })).toBe('09:02');
  });
});
