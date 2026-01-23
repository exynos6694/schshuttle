import { useState, useEffect, useMemo } from 'react';
import { Layout } from './components/Layout';
import { Header } from './components/Header';
import { RouteSelector, type Route } from './components/RouteSelector';
import { NextBusCard } from './components/NextBusCard';
import { TimeTable } from './components/TimeTable';
import { TO_STATION_SCHEDULE, TO_SCHOOL_SCHEDULE, VACATION_TO_STATION_SCHEDULE, VACATION_TO_SCHOOL_SCHEDULE, getLoopSchedule } from './data/schedule';
import { getNextBus } from './utils/timeUtils';

function App() {
  const [route, setRoute] = useState<Route>('to_station');
  const [isVacation, setIsVacation] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000 * 30);
    return () => clearInterval(timer);
  }, []);

  const schedule = useMemo(() => {
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
  }, [route, isVacation]);

  const nextBus = useMemo(() => getNextBus(schedule, currentTime), [schedule, currentTime]);

  return (
    <Layout>
      <Header isVacation={isVacation} onToggleVacation={() => setIsVacation(prev => !prev)} />
      <RouteSelector currentRoute={route} onSelect={setRoute} />
      <NextBusCard nextBus={nextBus} />
      <TimeTable schedule={schedule} nextBus={nextBus} />
    </Layout>
  );
}

export default App;
