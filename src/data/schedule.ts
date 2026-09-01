export type ShuttleType = 'to_station' | 'to_school';

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

  // 이미지 기준 학교출발시간 (상행)
  { hour: 10, minute: 48, type: 'to_station', trainTime: '10:58' },
  { hour: 11, minute: 14, type: 'to_station', trainTime: '11:24' },
  { hour: 11, minute: 46, type: 'to_station', trainTime: '11:56' },
  { hour: 12, minute: 13, type: 'to_station', trainTime: '12:23' },
  { hour: 12, minute: 42, type: 'to_station', trainTime: '12:52' },
  { hour: 12, minute: 51, type: 'to_station', trainTime: '13:01' },
  { hour: 13, minute: 15, type: 'to_station', trainTime: '13:25' },
  { hour: 13, minute: 44, type: 'to_station', trainTime: '13:54' },
  { hour: 14, minute: 8, type: 'to_station', trainTime: '14:18' },
  { hour: 14, minute: 30, type: 'to_station', trainTime: '14:40', isExpress: true },
  { hour: 15, minute: 19, type: 'to_station', trainTime: '15:29' },
  { hour: 15, minute: 53, type: 'to_station', trainTime: '16:03' },
  { hour: 16, minute: 19, type: 'to_station', trainTime: '16:29', isExpress: true },
  { hour: 16, minute: 45, type: 'to_station', trainTime: '16:55' },
  { hour: 17, minute: 34, type: 'to_station', trainTime: '17:44' },
  { hour: 17, minute: 55, type: 'to_station', trainTime: '18:05' },
  { hour: 18, minute: 17, type: 'to_station', trainTime: '18:27' },
  { hour: 18, minute: 49, type: 'to_station', trainTime: '18:59' },
  { hour: 19, minute: 10, type: 'to_station', trainTime: '19:20' },
  { hour: 19, minute: 36, type: 'to_station', trainTime: '19:46', isExpress: true },
  { hour: 20, minute: 0, type: 'to_station', trainTime: '20:10' },
  { hour: 20, minute: 24, type: 'to_station', trainTime: '20:34' },
  { hour: 20, minute: 56, type: 'to_station', trainTime: '21:06' },
  { hour: 21, minute: 29, type: 'to_station', trainTime: '21:39' },
  { hour: 21, minute: 47, type: 'to_station', trainTime: '21:57' },

  // 야간 셔틀 없음
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
];

// 하계방학 시간표 (2026.06.22 월 ~ 08.28 금)
// 하교(학교 후문 출발): hour:minute=순환출발, trainTime=전철출발(동문 기준 25분 후)
// ※ 방학 중 10분 간격 순환셔틀 없음 / 일요일 운행 없음
export const VACATION_TO_STATION_SCHEDULE: ShuttleTime[] = [
  { hour: 11, minute: 35, type: 'to_station', trainTime: '12:00', destination: '청량리', isExpress: false },
  { hour: 11, minute: 58, type: 'to_station', trainTime: '12:23', destination: '광운대', isExpress: false },
  { hour: 12, minute: 27, type: 'to_station', trainTime: '12:52', destination: '광운대', isExpress: false },
  { hour: 12, minute: 51, type: 'to_station', trainTime: '13:16', destination: '청량리', isExpress: true },
  { hour: 13, minute: 12, type: 'to_station', trainTime: '13:37', destination: '청량리', isExpress: true },
  { hour: 13, minute: 33, type: 'to_station', trainTime: '13:58', destination: '광운대', isExpress: false },
  { hour: 13, minute: 53, type: 'to_station', trainTime: '14:18', destination: '광운대', isExpress: false },
  { hour: 14, minute: 23, type: 'to_station', trainTime: '14:48', destination: '광운대', isExpress: false },
  { hour: 14, minute: 48, type: 'to_station', trainTime: '15:13', destination: '청량리', isExpress: true },
  { hour: 15, minute: 38, type: 'to_station', trainTime: '16:03', destination: '광운대', isExpress: false },
  { hour: 16, minute: 14, type: 'to_station', trainTime: '16:39', destination: '광운대', isExpress: false },
  { hour: 16, minute: 30, type: 'to_station', trainTime: '16:55', destination: '광운대', isExpress: false },
  { hour: 17, minute: 8, type: 'to_station', trainTime: '17:33', destination: '광운대', isExpress: false },
  { hour: 17, minute: 43, type: 'to_station', trainTime: '18:08', destination: '청량리', isExpress: true },
];

// 등교(신창역 출발): hour:minute=셔틀출발, trainTime=전철도착
export const VACATION_TO_SCHOOL_SCHEDULE: ShuttleTime[] = [
  { hour: 7, minute: 51, type: 'to_school', trainTime: '07:46' },
  { hour: 8, minute: 31, type: 'to_school', trainTime: '08:26', isExpress: true },
  { hour: 8, minute: 50, type: 'to_school', trainTime: '08:45' },
  { hour: 9, minute: 27, type: 'to_school', trainTime: '09:22', isExpress: true },
  { hour: 9, minute: 55, type: 'to_school', trainTime: '09:50' },
  { hour: 10, minute: 16, type: 'to_school', trainTime: '10:11', isExpress: true },
  { hour: 10, minute: 48, type: 'to_school', trainTime: '10:43' },
  { hour: 11, minute: 13, type: 'to_school', trainTime: '11:08' },
  { hour: 11, minute: 42, type: 'to_school', trainTime: '11:37' },
];

export const WEEKEND_TO_SCHOOL_SCHEDULE: ShuttleTime[] = [
  { hour: 15, minute: 16, type: 'to_school', trainTime: '15:11' },
  { hour: 15, minute: 42, type: 'to_school', trainTime: '15:37' },
  { hour: 16, minute: 16, type: 'to_school', trainTime: '16:11' },
  { hour: 16, minute: 37, type: 'to_school', trainTime: '16:32' },
  { hour: 17, minute: 28, type: 'to_school', trainTime: '17:23', isExpress: true },
  { hour: 17, minute: 58, type: 'to_school', trainTime: '17:53' },
  { hour: 18, minute: 16, type: 'to_school', trainTime: '18:11' },
  { hour: 18, minute: 43, type: 'to_school', trainTime: '18:38' },
  { hour: 19, minute: 10, type: 'to_school', trainTime: '19:05' },
  { hour: 19, minute: 28, type: 'to_school', trainTime: '19:23', isExpress: true },
  { hour: 20, minute: 17, type: 'to_school', trainTime: '20:12' },
  { hour: 20, minute: 46, type: 'to_school', trainTime: '20:41', isExpress: true },
  { hour: 21, minute: 16, type: 'to_school', trainTime: '21:11', isExpress: true },
  { hour: 21, minute: 42, type: 'to_school', trainTime: '21:37' },
  { hour: 22, minute: 4, type: 'to_school', trainTime: '21:59' },
];

export const WEEKEND_TO_STATION_SCHEDULE: ShuttleTime[] = [
  { hour: 15, minute: 4, type: 'to_station', trainTime: '15:14' },
  { hour: 15, minute: 43, type: 'to_station', trainTime: '15:53', isExpress: true },
  { hour: 16, minute: 8, type: 'to_station', trainTime: '16:18', isExpress: true },
  { hour: 16, minute: 35, type: 'to_station', trainTime: '16:45' },
  { hour: 17, minute: 1, type: 'to_station', trainTime: '17:11' },
  { hour: 17, minute: 33, type: 'to_station', trainTime: '17:43' },
  { hour: 18, minute: 5, type: 'to_station', trainTime: '18:15' },
  { hour: 18, minute: 32, type: 'to_station', trainTime: '18:42' },
  { hour: 19, minute: 0, type: 'to_station', trainTime: '19:10' },
  { hour: 19, minute: 25, type: 'to_station', trainTime: '19:35' },
  { hour: 19, minute: 37, type: 'to_station', trainTime: '19:47' },
  { hour: 20, minute: 35, type: 'to_station', trainTime: '20:45' },
  { hour: 21, minute: 17, type: 'to_station', trainTime: '21:27' },
  { hour: 21, minute: 38, type: 'to_station', trainTime: '21:48' },
  { hour: 21, minute: 55, type: 'to_station', trainTime: '22:05' },
];
