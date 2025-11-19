export type ShuttleType = 'to_station' | 'to_school' | 'loop';

export interface ShuttleTime {
  hour: number;
  minute: number;
  type: ShuttleType;
  trainTime?: string; // HH:mm
}

// 하교 (School -> Station)
// "순환 출발" times from the "하교(광운대 방향)" table
export const TO_STATION_SCHEDULE: ShuttleTime[] = [
  { hour: 10, minute: 50, type: 'to_station', trainTime: '11:00' },
  { hour: 11, minute: 19, type: 'to_station', trainTime: '11:29' },
  { hour: 11, minute: 50, type: 'to_station', trainTime: '12:00' },
  { hour: 12, minute: 18, type: 'to_station', trainTime: '12:28' },
  { hour: 12, minute: 43, type: 'to_station', trainTime: '12:53' },
  { hour: 13, minute: 6, type: 'to_station', trainTime: '13:16' },
  { hour: 13, minute: 27, type: 'to_station', trainTime: '13:37' },
  { hour: 13, minute: 48, type: 'to_station', trainTime: '13:58' }, // Assumed 13:48 based on pattern
  { hour: 14, minute: 11, type: 'to_station', trainTime: '14:21' },
  { hour: 14, minute: 38, type: 'to_station', trainTime: '14:48' },
  { hour: 14, minute: 50, type: 'to_station', trainTime: '15:00' },
  { hour: 15, minute: 41, type: 'to_station', trainTime: '15:51' },
  { hour: 16, minute: 29, type: 'to_station', trainTime: '16:39' },
  { hour: 16, minute: 45, type: 'to_station', trainTime: '16:55' },
  { hour: 17, minute: 23, type: 'to_station', trainTime: '17:33' },
  { hour: 18, minute: 3, type: 'to_station', trainTime: '18:12' },
  { hour: 18, minute: 17, type: 'to_station', trainTime: '18:27' },
  { hour: 18, minute: 46, type: 'to_station', trainTime: '18:56' },
  { hour: 19, minute: 10, type: 'to_station', trainTime: '19:20' },
  { hour: 19, minute: 36, type: 'to_station', trainTime: '19:46' },
  { hour: 20, minute: 9, type: 'to_station', trainTime: '20:19' },
  { hour: 20, minute: 25, type: 'to_station', trainTime: '20:35' },
  { hour: 20, minute: 56, type: 'to_station', trainTime: '21:06' },
  { hour: 21, minute: 34, type: 'to_station', trainTime: '21:39' },
  { hour: 21, minute: 53, type: 'to_station', trainTime: '22:03' },
];

// 등교 (Station -> School)
// "순환 출발" times from the "등교(신창)" table
export const TO_SCHOOL_SCHEDULE: ShuttleTime[] = [
  { hour: 7, minute: 54, type: 'to_school', trainTime: '07:49' },
  { hour: 8, minute: 29, type: 'to_school', trainTime: '08:24' },
  { hour: 8, minute: 50, type: 'to_school', trainTime: '08:45' },
  { hour: 9, minute: 29, type: 'to_school', trainTime: '09:24' },
  { hour: 10, minute: 1, type: 'to_school', trainTime: '09:56' },
  { hour: 10, minute: 21, type: 'to_school', trainTime: '10:16' },
  { hour: 10, minute: 48, type: 'to_school', trainTime: '10:43' },
  { hour: 11, minute: 12, type: 'to_school', trainTime: '11:07' },
  { hour: 11, minute: 42, type: 'to_school', trainTime: '11:37' },
  { hour: 11, minute: 57, type: 'to_school', trainTime: '11:52' },
  { hour: 12, minute: 28, type: 'to_school', trainTime: '12:23' },
  { hour: 12, minute: 57, type: 'to_school', trainTime: '12:52' },
  { hour: 13, minute: 29, type: 'to_school', trainTime: '13:24' },
  { hour: 13, minute: 43, type: 'to_school', trainTime: '13:38' },
  { hour: 13, minute: 58, type: 'to_school', trainTime: '13:53' },
  { hour: 14, minute: 26, type: 'to_school', trainTime: '14:21' },
  { hour: 14, minute: 39, type: 'to_school', trainTime: '14:34' },
  { hour: 15, minute: 28, type: 'to_school', trainTime: '15:23' },
  { hour: 16, minute: 16, type: 'to_school', trainTime: '16:11' },
  { hour: 16, minute: 35, type: 'to_school', trainTime: '16:30' },
  { hour: 17, minute: 15, type: 'to_school', trainTime: '17:10' },
  { hour: 18, minute: 2, type: 'to_school', trainTime: '17:57' },
  { hour: 18, minute: 15, type: 'to_school', trainTime: '18:10' },
  { hour: 18, minute: 48, type: 'to_school', trainTime: '18:43' },
  { hour: 19, minute: 10, type: 'to_school', trainTime: '19:05' },
  { hour: 19, minute: 25, type: 'to_school', trainTime: '19:22' },
  { hour: 19, minute: 47, type: 'to_school', trainTime: '19:42' },
  { hour: 20, minute: 18, type: 'to_school', trainTime: '20:13' },
  { hour: 20, minute: 53, type: 'to_school', trainTime: '20:48' },
  { hour: 21, minute: 11, type: 'to_school', trainTime: '21:06' },
  { hour: 21, minute: 39, type: 'to_school', trainTime: '21:34' },
  { hour: 21, minute: 52, type: 'to_school', trainTime: '21:47' },
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
