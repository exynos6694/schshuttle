import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Bus } from 'lucide-react';

export const Header: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="px-6 pt-8 pb-6 text-white">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bus className="w-6 h-6" />
            SCH Shuttle
          </h1>
          <p className="text-blue-100 text-sm mt-1">Soonchunhyang Univ.</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold tracking-tight">
            {format(time, 'HH:mm')}
          </div>
          <div className="text-blue-100 text-xs font-medium">
            {format(time, 'MM.dd EEEE', { locale: ko })}
          </div>
        </div>
      </div>
    </header>
  );
};
