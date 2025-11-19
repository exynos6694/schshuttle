import { useState, useEffect, useMemo } from 'react';
import { Layout } from './components/Layout';
import { Header } from './components/Header';
import { RouteSelector, type Route } from './components/RouteSelector';
import { NextBusCard } from './components/NextBusCard';
import { TimeTable } from './components/TimeTable';
import { TO_STATION_SCHEDULE, TO_SCHOOL_SCHEDULE, getLoopSchedule } from './data/schedule';
import { getNextBus } from './utils/timeUtils';

function App() {
  const [route, setRoute] = useState<Route>('to_station');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000 * 30);
    return () => clearInterval(timer);
  }, []);

  const schedule = useMemo(() => {
    switch (route) {
      case 'to_station':
        return TO_STATION_SCHEDULE;
      case 'to_school':
        return TO_SCHOOL_SCHEDULE;
      case 'loop':
        return getLoopSchedule();
      default:
        return [];
    }
  }, [route]);

  const nextBus = useMemo(() => getNextBus(schedule, currentTime), [schedule, currentTime]);

  return (
    <Layout>
      <Header />
      <RouteSelector currentRoute={route} onSelect={setRoute} />
      <NextBusCard nextBus={nextBus} />
      <TimeTable schedule={schedule} nextBus={nextBus} />
    </Layout>
  );
}

export default App;
