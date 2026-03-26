export type ShuttleType = 'to_station' | 'to_school' | 'loop';

export interface ShuttleTime {
  hour: number;
  minute: number;
  type: ShuttleType;
  trainTime?: string; // HH:mm
  destination?: string;
  isExpress?: boolean;
}

// 하교 (School -> Station)
// "순환 출발" times from the "하교(광운대 방향)" table
export const TO_STATION_SCHEDULE: ShuttleTime[] = [
  { hour: 10, minute: 48, type: 'to_station', trainTime: '10:58', destination: '광운대', isExpress: false },
  { hour: 11, minute: 11, type: 'to_station', trainTime: '11:21', destination: '광운대', isExpress: false },
  { hour: 11, minute: 50, type: 'to_station', trainTime: '12:00', destination: '청량리', isExpress: false },
  { hour: 12, minute: 18, type: 'to_station', trainTime: '12:28', destination: '광운대', isExpress: false },
  { hour: 12, minute: 43, type: 'to_station', trainTime: '12:53', destination: '광운대', isExpress: false },
  { hour: 13, minute: 6, type: 'to_station', trainTime: '13:16', destination: '청량리', isExpress: true },
  { hour: 13, minute: 27, type: 'to_station', trainTime: '13:37', destination: '청량리', isExpress: true },
  { hour: 13, minute: 48, type: 'to_station', trainTime: '13:58', destination: '광운대', isExpress: false },
  { hour: 14, minute: 11, type: 'to_station', trainTime: '14:21', destination: '광운대', isExpress: false },
  { hour: 14, minute: 38, type: 'to_station', trainTime: '14:48', destination: '광운대', isExpress: false },
  { hour: 15, minute: 3, type: 'to_station', trainTime: '15:13', destination: '청량리', isExpress: true },
  { hour: 15, minute: 53, type: 'to_station', trainTime: '16:03', destination: '광운대', isExpress: false },
  { hour: 16, minute: 29, type: 'to_station', trainTime: '16:39', destination: '광운대', isExpress: false },
  { hour: 16, minute: 45, type: 'to_station', trainTime: '16:55', destination: '광운대', isExpress: false },
  { hour: 17, minute: 23, type: 'to_station', trainTime: '17:33', destination: '광운대', isExpress: false },
  { hour: 18, minute: 2, type: 'to_station', trainTime: '18:12', destination: '청량리', isExpress: true },
  { hour: 18, minute: 17, type: 'to_station', trainTime: '18:27', destination: '구로', isExpress: false },
  { hour: 18, minute: 46, type: 'to_station', trainTime: '18:56', destination: '광운대', isExpress: false },
  { hour: 19, minute: 10, type: 'to_station', trainTime: '19:20', destination: '병점', isExpress: false },
  { hour: 19, minute: 36, type: 'to_station', trainTime: '19:46', destination: '청량리', isExpress: true },
  { hour: 20, minute: 9, type: 'to_station', trainTime: '20:19', destination: '광운대', isExpress: false },
  { hour: 20, minute: 25, type: 'to_station', trainTime: '20:35', destination: '구로', isExpress: false },
  { hour: 20, minute: 56, type: 'to_station', trainTime: '21:06', destination: '병점', isExpress: false },
  { hour: 21, minute: 29, type: 'to_station', trainTime: '21:39', destination: '병점', isExpress: false },
  { hour: 21, minute: 47, type: 'to_station', trainTime: '21:57', destination: '구로', isExpress: false },
];

// 등교 (Station -> School)
// "순환 출발" times from the "등교(신창)" table
export const TO_SCHOOL_SCHEDULE: ShuttleTime[] = [
  { hour: 7, minute: 51, type: 'to_school', trainTime: '07:46' },
  { hour: 8, minute: 30, type: 'to_school', trainTime: '08:25' },
  { hour: 8, minute: 50, type: 'to_school', trainTime: '08:45' },
  { hour: 9, minute: 40, type: 'to_school', trainTime: '09:35' },
  { hour: 10, minute: 1, type: 'to_school', trainTime: '09:56' },
  { hour: 10, minute: 22, type: 'to_school', trainTime: '10:17' },
  { hour: 10, minute: 48, type: 'to_school', trainTime: '10:43' },
  { hour: 11, minute: 12, type: 'to_school', trainTime: '11:07' },
  { hour: 11, minute: 42, type: 'to_school', trainTime: '11:37' },
  { hour: 11, minute: 57, type: 'to_school', trainTime: '11:52' },
  { hour: 12, minute: 28, type: 'to_school', trainTime: '12:23' },
  { hour: 12, minute: 57, type: 'to_school', trainTime: '12:52' },
  { hour: 13, minute: 19, type: 'to_school', trainTime: '13:14' },
  { hour: 13, minute: 50, type: 'to_school', trainTime: '13:45' },
  { hour: 13, minute: 58, type: 'to_school', trainTime: '13:53' },
  { hour: 14, minute: 26, type: 'to_school', trainTime: '14:21' },
  { hour: 14, minute: 59, type: 'to_school', trainTime: '14:54' },
  { hour: 15, minute: 28, type: 'to_school', trainTime: '15:23' },
  { hour: 16, minute: 16, type: 'to_school', trainTime: '16:11' },
  { hour: 16, minute: 35, type: 'to_school', trainTime: '16:30' },
  { hour: 17, minute: 18, type: 'to_school', trainTime: '17:13' },
  { hour: 18, minute: 2, type: 'to_school', trainTime: '17:57' },
  { hour: 18, minute: 15, type: 'to_school', trainTime: '18:10' },
  { hour: 18, minute: 48, type: 'to_school', trainTime: '18:43' },
  { hour: 19, minute: 10, type: 'to_school', trainTime: '19:05' },
  { hour: 19, minute: 27, type: 'to_school', trainTime: '19:22' },
  { hour: 19, minute: 48, type: 'to_school', trainTime: '19:43' },
  { hour: 20, minute: 18, type: 'to_school', trainTime: '20:13' },
  { hour: 20, minute: 53, type: 'to_school', trainTime: '20:48' },
  { hour: 21, minute: 11, type: 'to_school', trainTime: '21:06' },
  { hour: 21, minute: 39, type: 'to_school', trainTime: '21:34' },
  { hour: 21, minute: 52, type: 'to_school', trainTime: '21:47' },
];

export const VACATION_TO_STATION_SCHEDULE: ShuttleTime[] = [
  { hour: 12, minute: 3, type: 'to_station', trainTime: '12:28', destination: '광운대', isExpress: false },
  { hour: 12, minute: 28, type: 'to_station', trainTime: '12:53', destination: '광운대', isExpress: false },
  { hour: 12, minute: 51, type: 'to_station', trainTime: '13:16', destination: '청량리', isExpress: true },
  { hour: 13, minute: 12, type: 'to_station', trainTime: '13:37', destination: '청량리', isExpress: true },
  { hour: 13, minute: 33, type: 'to_station', trainTime: '13:58', destination: '광운대', isExpress: false },
  { hour: 13, minute: 56, type: 'to_station', trainTime: '14:21', destination: '광운대', isExpress: false },
  { hour: 14, minute: 23, type: 'to_station', trainTime: '14:48', destination: '광운대', isExpress: false },
  { hour: 14, minute: 48, type: 'to_station', trainTime: '15:13', destination: '청량리', isExpress: true },
  { hour: 15, minute: 26, type: 'to_station', trainTime: '15:51', destination: '광운대', isExpress: false },
  { hour: 16, minute: 14, type: 'to_station', trainTime: '16:39', destination: '광운대', isExpress: false },
  { hour: 16, minute: 30, type: 'to_station', trainTime: '16:55', destination: '광운대', isExpress: false },
  { hour: 17, minute: 8, type: 'to_station', trainTime: '17:33', destination: '광운대', isExpress: false },
  { hour: 17, minute: 47, type: 'to_station', trainTime: '18:12', destination: '청량리', isExpress: true },
];

export const VACATION_TO_SCHOOL_SCHEDULE: ShuttleTime[] = [
  { hour: 7, minute: 51, type: 'to_school', trainTime: '07:46' },
  { hour: 8, minute: 30, type: 'to_school', trainTime: '08:25' },
  { hour: 8, minute: 50, type: 'to_school', trainTime: '08:45' },
  { hour: 9, minute: 40, type: 'to_school', trainTime: '09:35' },
  { hour: 10, minute: 1, type: 'to_school', trainTime: '09:56' },
  { hour: 10, minute: 22, type: 'to_school', trainTime: '10:17' },
  { hour: 10, minute: 48, type: 'to_school', trainTime: '10:43' },
  { hour: 11, minute: 12, type: 'to_school', trainTime: '11:07' },
  { hour: 11, minute: 42, type: 'to_school', trainTime: '11:37' },
  { hour: 11, minute: 57, type: 'to_school', trainTime: '11:52' },
];

export const WEEKEND_TO_SCHOOL_SCHEDULE: ShuttleTime[] = [
  { hour: 15, minute: 11, type: 'to_school' },
  { hour: 15, minute: 37, type: 'to_school' },
  { hour: 16, minute: 11, type: 'to_school' },
  { hour: 16, minute: 32, type: 'to_school' },
  { hour: 17, minute: 23, type: 'to_school' },
  { hour: 17, minute: 53, type: 'to_school' },
  { hour: 18, minute: 11, type: 'to_school' },
  { hour: 18, minute: 38, type: 'to_school' },
  { hour: 19, minute: 13, type: 'to_school' },
  { hour: 19, minute: 23, type: 'to_school' },
  { hour: 20, minute: 12, type: 'to_school' },
  { hour: 20, minute: 41, type: 'to_school' },
  { hour: 21, minute: 15, type: 'to_school' },
  { hour: 21, minute: 37, type: 'to_school' },
  { hour: 21, minute: 59, type: 'to_school' },
];

export const WEEKEND_TO_STATION_SCHEDULE: ShuttleTime[] = [
  { hour: 15, minute: 19, type: 'to_station' },
  { hour: 15, minute: 59, type: 'to_station' },
  { hour: 16, minute: 25, type: 'to_station' },
  { hour: 16, minute: 51, type: 'to_station' },
  { hour: 17, minute: 23, type: 'to_station' },
  { hour: 17, minute: 57, type: 'to_station' },
  { hour: 18, minute: 22, type: 'to_station' },
  { hour: 18, minute: 50, type: 'to_station' },
  { hour: 19, minute: 15, type: 'to_station' },
  { hour: 19, minute: 27, type: 'to_station' },
  { hour: 20, minute: 25, type: 'to_station' },
  { hour: 21, minute: 7, type: 'to_station' },
  { hour: 21, minute: 28, type: 'to_station' },
  { hour: 21, minute: 45, type: 'to_station' },
];

// Campus Loop: 08:20 - 18:00, every 10 mins (Keep existing logic as fallback or separate tab)
export const getLoopSchedule = (): ShuttleTime[] => {
  const schedule: ShuttleTime[] = [];
  for (let h = 8; h <= 18; h++) {
    for (let m = 0; m < 60; m += 10) {
      if (h === 8 && m < 20) continue; // Start 08:20
      if (h === 18 && m > 0) continue; // End 18:00
      schedule.push({ hour: h, minute: m, type: 'loop' });
    }
  }
  return schedule;
};
