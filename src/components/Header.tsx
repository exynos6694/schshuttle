import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Bus } from 'lucide-react';

interface HeaderProps {
  isVacation: boolean;
  onToggleVacation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isVacation, onToggleVacation }) => {
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
          <div className="flex items-center gap-2 mt-1">
            <p className="text-blue-100 text-sm">순천향대학교</p>
            <button
              onClick={onToggleVacation}
              className={`text-xs px-2 py-0.5 rounded-full border transition-colors ${
                isVacation 
                  ? 'bg-blue-400 border-transparent text-white font-bold' 
                  : 'border-blue-200 text-blue-200 hover:bg-white/10'
              }`}
            >
              {isVacation ? '방학중' : '학기중'}
            </button>
          </div>
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
