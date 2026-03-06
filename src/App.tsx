import { useState, useEffect, useMemo } from 'react';
import { Layout } from './components/Layout';
import { Header } from './components/Header';
import { RouteSelector, type Route } from './components/RouteSelector';
import { NextBusCard } from './components/NextBusCard';
import { TimeTable } from './components/TimeTable';
import { TO_STATION_SCHEDULE, TO_SCHOOL_SCHEDULE, VACATION_TO_STATION_SCHEDULE, VACATION_TO_SCHOOL_SCHEDULE, WEEKEND_TO_SCHOOL_SCHEDULE, WEEKEND_TO_STATION_SCHEDULE, getLoopSchedule } from './data/schedule';
import { getNextBuses, isServiceDay } from './utils/timeUtils';
import { RouteMapModal } from './components/RouteMapModal';
import { isWeekend } from 'date-fns';

import { Footer } from './components/Footer';
import { InstallPrompt } from './components/InstallPrompt';

function App() {
  const [route, setRoute] = useState<Route>('to_station');
  const [isVacation, setIsVacation] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMapOpen, setIsMapOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000 * 30);
    return () => clearInterval(timer);
  }, []);

  const schedule = useMemo(() => {
    if (!isServiceDay(currentTime)) {
      return [];
    }
    
    // 주말일 경우 주말 시간표 반환 (루프버스는 주말 미운행으로 간주)
    if (isWeekend(currentTime)) {
      switch (route) {
        case 'to_station':
          return WEEKEND_TO_STATION_SCHEDULE;
        case 'to_school':
          return WEEKEND_TO_SCHOOL_SCHEDULE;
        case 'loop':
        default:
          return [];
      }
    }

    switch (route) {
      case 'to_station':
        return isVacation ? VACATION_TO_STATION_SCHEDULE : TO_STATION_SCHEDULE;
      case 'to_school':
        return isVacation ? VACATION_TO_SCHOOL_SCHEDULE : TO_SCHOOL_SCHEDULE;
      case 'loop':
        // No loop schedule during vacation
        return isVacation ? [] : getLoopSchedule();
      default:
        return [];
    }
  }, [route, isVacation, currentTime]);

  const nextBuses = useMemo(() => getNextBuses(schedule, currentTime, 2), [schedule, currentTime]);
  const nextBus = nextBuses.length > 0 ? nextBuses[0] : null;

  return (
    <Layout>
      <Header 
        isVacation={isVacation} 
        onToggleVacation={() => setIsVacation(prev => !prev)} 
        onOpenMap={() => setIsMapOpen(true)}
      />
      <RouteSelector currentRoute={route} onSelect={setRoute} />
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <NextBusCard nextBuses={nextBuses} />
        <TimeTable schedule={schedule} nextBus={nextBus} />
      </div>
      <Footer />
      <RouteMapModal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />
      <InstallPrompt />
    </Layout>
  );
}

export default App;
