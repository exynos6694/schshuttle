import { useState, useMemo } from 'react';
import { Layout } from './components/Layout';
import { Header } from './components/Header';
import { RouteSelector, type Route } from './components/RouteSelector';
import { NextBusCard } from './components/NextBusCard';
import { TimeTable } from './components/TimeTable';
import { TO_STATION_SCHEDULE, TO_SCHOOL_SCHEDULE, VACATION_TO_STATION_SCHEDULE, VACATION_TO_SCHOOL_SCHEDULE, WEEKEND_TO_SCHOOL_SCHEDULE, WEEKEND_TO_STATION_SCHEDULE } from './data/schedule';
import { getNextBuses, isServiceDay, isLastDayOfHolidayWithSunday } from './utils/timeUtils';
import { useNow } from './hooks/useNow';
import { RouteMapModal } from './components/RouteMapModal';
import { isWeekend } from 'date-fns';

import { Footer } from './components/Footer';
import { InstallPrompt } from './components/InstallPrompt';
import { TermsModal } from './components/TermsModal';
import { Analytics } from '@vercel/analytics/react';

function App() {
  const [route, setRoute] = useState<Route>('to_station');
  const [isVacation, setIsVacation] = useState(false);
  const currentTime = useNow(30_000);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const schedule = useMemo(() => {
    if (!isServiceDay(currentTime)) {
      return [];
    }

    // 주말이거나 연휴 마지막 날(일요일 포함)일 경우 주말 시간표 반환
    if (isWeekend(currentTime) || isLastDayOfHolidayWithSunday(currentTime)) {
      return route === 'to_station' ? WEEKEND_TO_STATION_SCHEDULE : WEEKEND_TO_SCHOOL_SCHEDULE;
    }

    switch (route) {
      case 'to_station':
        return isVacation ? VACATION_TO_STATION_SCHEDULE : TO_STATION_SCHEDULE;
      case 'to_school':
        return isVacation ? VACATION_TO_SCHOOL_SCHEDULE : TO_SCHOOL_SCHEDULE;
      default:
        return [];
    }
  }, [route, isVacation, currentTime]);

  const nextBuses = useMemo(() => getNextBuses(schedule, currentTime, 2), [schedule, currentTime]);
  const nextBus = nextBuses.length > 0 ? nextBuses[0] : null;

  const isCurrentServiceDay = useMemo(() => isServiceDay(currentTime), [currentTime]);

  return (
    <Layout>
      <Header 
        isVacation={isVacation} 
        onToggleVacation={() => setIsVacation(prev => !prev)} 
        onOpenMap={() => setIsMapOpen(true)}
      />
      <RouteSelector currentRoute={route} onSelect={setRoute} />
      <div className="flex-1 relative">
        <NextBusCard nextBuses={nextBuses} isServiceDay={isCurrentServiceDay} />
        <TimeTable schedule={schedule} nextBus={nextBus} />
      </div>
      <Footer onOpenTerms={() => setIsTermsOpen(true)} />
      <RouteMapModal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <InstallPrompt />
      <Analytics />
    </Layout>
  );
}

export default App;
