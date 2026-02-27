import fs from 'fs';

const tableRaw = `
| 05:00 | 첫차    | 광운대 |
| 05:42 | —     | 광운대 |
| 06:09 | 급행·첫차 | 서울역 |
| 06:38 | —     | 청량리 |
| 06:54 | —     | 광운대 |
| 07:15 | 급행·첫차 | 청량리 |
| 07:51 | 급행    | 청량리 |
| 08:11 | —     | 구로  |
| 08:42 | —     | 광운대 |
| 09:13 | 급행    | 청량리 |
| 09:49 | —     | 광운대 |
| 10:16 | 급행    | 청량리 |
| 10:36 | —     | 청량리 |
| 10:58 | —     | 광운대 |
| 11:21 | —     | 광운대 |
| 12:00 | —     | 청량리 |
| 12:28 | —     | 광운대 |
| 12:53 | —     | 광운대 |
| 13:16 | 급행    | 청량리 |
| 13:37 | 급행    | 청량리 |
| 13:58 | —     | 광운대 |
| 14:21 | —     | 광운대 |
| 14:48 | —     | 광운대 |
| 15:13 | 급행    | 청량리 |
| 16:03 | —     | 광운대 |
| 16:39 | —     | 광운대 |
| 16:55 | —     | 광운대 |
| 17:33 | —     | 광운대 |
| 18:12 | 급행    | 청량리 |
| 18:27 | —     | 구로  |
| 18:56 | —     | 광운대 |
| 19:20 | —     | 병점  |
| 19:46 | 급행·막차 | 청량리 |
| 20:19 | 막차    | 광운대 |
| 20:35 | —     | 구로  |
| 21:06 | —     | 병점  |
| 21:39 | —     | 병점  |
| 21:57 | —     | 구로  |
| 22:14 | 막차    | 구로  |
| 22:42 | —     | 병점  |
| 23:17 | 막차    | 병점  |
| 23:45 | 막차    | 천안  |
`;

const lines = tableRaw.trim().split('\n');
const lookup = [];
for (const line of lines) {
  const parts = line.split('|').map(x => x.trim()).filter(x => x);
  if (parts.length >= 3) {
    const time = parts[0];
    const type = parts[1];
    const dest = parts[2];
    const [h, m] = time.split(':').map(Number);
    lookup.push({ time, hour: h, minute: m, dest, isExpress: type.includes('급행') });
  }
}

function getClosest(tTimeStr) {
  if (!tTimeStr) return null;
  const [th, tm] = tTimeStr.split(':').map(Number);
  const tMins = th * 60 + tm;
  
  let closest = null;
  let minDiff = Infinity;
  for (const item of lookup) {
    const itemMins = item.hour * 60 + item.minute;
    const diff = Math.abs(itemMins - tMins);
    if (diff < minDiff) {
      minDiff = diff;
      closest = item;
    }
  }
  return minDiff <= 30 ? closest : null;
}

let content = fs.readFileSync('src/data/schedule.ts', 'utf8');

if (!content.includes('destination?: string')) {
  content = content.replace(
    'trainTime?: string; // HH:mm',
    'trainTime?: string; // HH:mm\n  destination?: string;\n  isExpress?: boolean;'
  );
}

const regex = /\{\s*hour:\s*(\d+),\s*minute:\s*(\d+),\s*type:\s*'to_station',\s*trainTime:\s*'(\d{2}:\d{2})'.*?\}/g;

content = content.replace(regex, (match, h, m, tTime) => {
  const closest = getClosest(tTime);
  if (closest) {
    return "{ hour: " + h + ", minute: " + m + ", type: 'to_station', trainTime: '" + tTime + "', destination: '" + closest.dest + "', isExpress: " + closest.isExpress + " }";
  }
  return match;
});

fs.writeFileSync('src/data/schedule.ts', content);
console.log('Update complete.');
