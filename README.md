# SCHshutll (순천향대학교 셔틀버스 앱)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)

순천향대학교 학생들의 편안한 등교와 하교를 위해 제작된 **실시간 셔틀버스 시간표 애플리케이션**입니다. 
복잡하게 이미지를 찾아볼 필요 없이, 앱을 켜는 즉시 다음 버스까지 남은 시간을 직관적으로 확인할 수 있습니다.

---

## 주요 기능

- **실시간 남은 시간 및 출발 임박 표시** 
  현재 시각을 기준으로 제일 빨리 탈 수 있는 버스와 다다음 버스의 남은 시간을 초/분 단위로 알려줍니다. 10분 이하로 남은 버스는 '출발 임박' 알림 펄스(Pulse)가 작동합니다.
  
- **스마트 스티키 UI (Sticky Card)**
  전체 시간표를 스크롤해서 내려볼 때에도, 가장 중요한 "다음 버스" 정보 카드가 화면 상단에 미니멀한 사이즈로 달라붙어(Sticky) 시야를 방해하지 않고 정보를 제공합니다.

- **PWA(Progressive Web App) 지원**
  웹 사이트지만 마치 네이티브 앱처럼 스마트폰 홈 화면에 바로가기를 추가해 사용할 수 있습니다. 오프라인 상태에서도 캐시된 시간표를 통해 문제없이 작동합니다.

- **간단한 일정 및 뷰어**
  주말, 공휴일, 학기 중, 방학 중 등 날짜와 기간에 따라 변하는 시간표를 터치 한 번으로 쉽게 전환하며, 완료된(지나간) 시간표는 자동으로 어둡게 처리됩니다.

- **아코디언 시간표 및 노선도**
  원하는 시간표 항목을 터치하면 아코디언이 부드럽게 펼쳐지며 실시간 남은 시간을 바로 계산해서 보여줍니다. 초행길을 위한 셔틀 탑승장 위치(Map) 버튼도 제공됩니다.

---

## 기술 스택

- **Frontend Framework:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion (스프링 기반의 부드럽고 쫀득한 UI 트랜지션)
- **Icons:** Lucide-React
- **Date & Time:** date-fns

---

## 가이드

- `src/data/schedule.ts`: 셔틀버스 전체 시간표 데이터가 들어있습니다. 시간표 추가/변경이 필요할 때 이 파일을 수정하세요.
- `src/utils/timeUtils.ts`: 현재 시간 기반 남은 시간 계산 및 주말/공휴일 예외 처리 로직이 들어있습니다.
- `src/components/NextBusCard.tsx`: 메인 대시보드 역할을 하는 다음 버스 안내 카드 컴포넌트입니다.

> **Note:** 본 애플리케이션은 순천향대학교 통합 셔틀버스 공지사항을 기준으로 제작 및 테스트되고 있습니다.
