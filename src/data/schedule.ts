export type ShuttleType = 'to_station' | 'to_school' | 'loop';

export interface ShuttleTime {
  hour: number;
  minute: number;
  type: ShuttleType;
  trainTime?: string; // HH:mm
  destination?: string;
  isExpress?: boolean;
  hasNoShuttle?: boolean; // 셔틀이 운행하지 않는 시간대의 전철 표시용
}

// 하교 (School -> Station)
// "순환 출발" times from the "하교(광운대 방향)" table
export const TO_STATION_SCHEDULE: ShuttleTime[] = [
  // 05:00 ~ 10:16 전철 (셔틀 없음)
  { hour: 5, minute: 0, type: 'to_station', trainTime: '05:00', destination: '광운대', isExpress: false, hasNoShuttle: true },
  { hour: 5, minute: 42, type: 'to_station', trainTime: '05:42', destination: '광운대', isExpress: false, hasNoShuttle: true },
  { hour: 6, minute: 9, type: 'to_station', trainTime: '06:09', destination: '서울역', isExpress: true, hasNoShuttle: true },
  { hour: 6, minute: 38, type: 'to_station', trainTime: '06:38', destination: '청량리', isExpress: false, hasNoShuttle: true },
  { hour: 6, minute: 54, type: 'to_station', trainTime: '06:54', destination: '광운대', isExpress: false, hasNoShuttle: true },
  { hour: 7, minute: 15, type: 'to_station', trainTime: '07:15', destination: '청량리', isExpress: true, hasNoShuttle: true },
  { hour: 7, minute: 51, type: 'to_station', trainTime: '07:51', destination: '청량리', isExpress: true, hasNoShuttle: true },
  { hour: 8, minute: 11, type: 'to_station', trainTime: '08:11', destination: '구로', isExpress: false, hasNoShuttle: true },
  { hour: 8, minute: 40, type: 'to_station', trainTime: '08:40', destination: '광운대', isExpress: false, hasNoShuttle: true },
  { hour: 9, minute: 2, type: 'to_station', trainTime: '09:02', destination: '청량리', isExpress: false, hasNoShuttle: true },
  { hour: 9, minute: 41, type: 'to_station', trainTime: '09:41', destination: '청량리', isExpress: true, hasNoShuttle: true },
  { hour: 10, minute: 16, type: 'to_station', trainTime: '10:16', destination: '청량리', isExpress: true, hasNoShuttle: true },

  // 10:26 셔틀 시작 (이 아래로는 이미지 상행 시간과 매칭, 전철시간-10분)
  { hour: 10, minute: 26, type: 'to_station', trainTime: '10:36', destination: '청량리', isExpress: false },
  { hour: 10, minute: 48, type: 'to_station', trainTime: '10:58', destination: '광운대', isExpress: false },
  { hour: 11, minute: 11, type: 'to_station', trainTime: '11:21', destination: '광운대', isExpress: false },
  { hour: 11, minute: 50, type: 'to_station', trainTime: '12:00', destination: '청량리', isExpress: false },
  { hour: 12, minute: 13, type: 'to_station', trainTime: '12:23', destination: '광운대', isExpress: false },
  { hour: 12, minute: 42, type: 'to_station', trainTime: '12:52', destination: '광운대', isExpress: false },
  { hour: 13, minute: 6, type: 'to_station', trainTime: '13:16', destination: '청량리', isExpress: true },
  { hour: 13, minute: 27, type: 'to_station', trainTime: '13:37', destination: '청량리', isExpress: true },
  { hour: 13, minute: 48, type: 'to_station', trainTime: '13:58', destination: '광운대', isExpress: false },
  { hour: 14, minute: 8, type: 'to_station', trainTime: '14:18', destination: '광운대', isExpress: false },
  { hour: 14, minute: 38, type: 'to_station', trainTime: '14:48', destination: '광운대', isExpress: false },
  { hour: 15, minute: 3, type: 'to_station', trainTime: '15:13', destination: '청량리', isExpress: true },
  { hour: 15, minute: 53, type: 'to_station', trainTime: '16:03', destination: '광운대', isExpress: false },
  { hour: 16, minute: 29, type: 'to_station', trainTime: '16:39', destination: '광운대', isExpress: false },
  { hour: 16, minute: 45, type: 'to_station', trainTime: '16:55', destination: '광운대', isExpress: false },
  { hour: 17, minute: 23, type: 'to_station', trainTime: '17:33', destination: '광운대', isExpress: false },
  { hour: 17, minute: 58, type: 'to_station', trainTime: '18:08', destination: '청량리', isExpress: true },
  { hour: 18, minute: 17, type: 'to_station', trainTime: '18:27', destination: '구로', isExpress: false },
  { hour: 18, minute: 46, type: 'to_station', trainTime: '18:56', destination: '광운대', isExpress: false },
  { hour: 19, minute: 10, type: 'to_station', trainTime: '19:20', destination: '병점', isExpress: false },
  { hour: 19, minute: 36, type: 'to_station', trainTime: '19:46', destination: '청량리', isExpress: true },
  { hour: 20, minute: 9, type: 'to_station', trainTime: '20:19', destination: '광운대', isExpress: false },
  { hour: 20, minute: 25, type: 'to_station', trainTime: '20:35', destination: '구로', isExpress: false },
  { hour: 20, minute: 56, type: 'to_station', trainTime: '21:06', destination: '병점', isExpress: false },
  { hour: 21, minute: 29, type: 'to_station', trainTime: '21:39', destination: '병점', isExpress: false },

  // 21:57 이후 아경~막차 (셔틀 없음)
  { hour: 21, minute: 57, type: 'to_station', trainTime: '21:57', destination: '구로', isExpress: false, hasNoShuttle: true },
  { hour: 22, minute: 14, type: 'to_station', trainTime: '22:14', destination: '구로', isExpress: false, hasNoShuttle: true },
  { hour: 22, minute: 42, type: 'to_station', trainTime: '22:42', destination: '병점', isExpress: false, hasNoShuttle: true },
  { hour: 23, minute: 17, type: 'to_station', trainTime: '23:17', destination: '병점', isExpress: false, hasNoShuttle: true },
  { hour: 23, minute: 45, type: 'to_station', trainTime: '23:45', destination: '천안', isExpress: false, hasNoShuttle: true },
];

// 등교 (Station -> School)
// "신창역에서 들어오는 차량 탑승" 
// 등교는 전철도착 5분 후 출발
export const TO_SCHOOL_SCHEDULE: ShuttleTime[] = [
  { hour: 7, minute: 51, type: 'to_school', trainTime: '07:46' },
  { hour: 8, minute: 30, type: 'to_school', trainTime: '08:25', isExpress: true },
  { hour: 8, minute: 50, type: 'to_school', trainTime: '08:45' },
  { hour: 9, minute: 27, type: 'to_school', trainTime: '09:22', isExpress: true },
  { hour: 9, minute: 55, type: 'to_school', trainTime: '09:50' },
  { hour: 10, minute: 16, type: 'to_school', trainTime: '10:11' },
  { hour: 10, minute: 48, type: 'to_school', trainTime: '10:43' },
  { hour: 11, minute: 13, type: 'to_school', trainTime: '11:08' },
  { hour: 11, minute: 42, type: 'to_school', trainTime: '11:37' },
  { hour: 11, minute: 59, type: 'to_school', trainTime: '11:54' },
  { hour: 12, minute: 28, type: 'to_school', trainTime: '12:23' },
  { hour: 12, minute: 57, type: 'to_school', trainTime: '12:52' },
  { hour: 13, minute: 18, type: 'to_school', trainTime: '13:13', isExpress: true },
  { hour: 13, minute: 46, type: 'to_school', trainTime: '13:41' },
  { hour: 14, minute: 5, type: 'to_school', trainTime: '14:00', isExpress: true },
  { hour: 14, minute: 21, type: 'to_school', trainTime: '14:16', isExpress: true },
  { hour: 14, minute: 59, type: 'to_school', trainTime: '14:54' },
  { hour: 15, minute: 28, type: 'to_school', trainTime: '15:23', isExpress: true },
  { hour: 16, minute: 3, type: 'to_school', trainTime: '15:58' },
  { hour: 16, minute: 30, type: 'to_school', trainTime: '16:25' },
  { hour: 17, minute: 18, type: 'to_school', trainTime: '17:13' },
  { hour: 18, minute: 2, type: 'to_school', trainTime: '17:57' },
  { hour: 18, minute: 15, type: 'to_school', trainTime: '18:10' },
  { hour: 18, minute: 44, type: 'to_school', trainTime: '18:39' },
  { hour: 19, minute: 6, type: 'to_school', trainTime: '19:01' },
  { hour: 19, minute: 27, type: 'to_school', trainTime: '19:22', isExpress: true },
  { hour: 19, minute: 48, type: 'to_school', trainTime: '19:43', isExpress: true },
  { hour: 20, minute: 18, type: 'to_school', trainTime: '20:13' },
  { hour: 20, minute: 53, type: 'to_school', trainTime: '20:48' },
  { hour: 21, minute: 11, type: 'to_school', trainTime: '21:06' },
  { hour: 21, minute: 39, type: 'to_school', trainTime: '21:34' },
  { hour: 21, minute: 52, type: 'to_school', trainTime: '21:47' },
];;

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
