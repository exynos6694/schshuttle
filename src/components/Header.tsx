import React from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Bus, Map } from 'lucide-react';
import { useNow } from '../hooks/useNow';

interface HeaderProps {
  isVacation: boolean;
  onToggleVacation: () => void;
  onOpenMap: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isVacation, onToggleVacation, onOpenMap }) => {
  // HH:mm 표시 → 분 단위로만 갱신
  const time = useNow(60_000);

  return (
    <header className="px-6 pt-8 pb-6 text-white" style={{ paddingTop: 'calc(2rem + env(safe-area-inset-top))' }}>
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
                !isVacation 
                  ? 'bg-blue-400 border-transparent text-white font-bold' 
                  : 'border-blue-200 text-blue-200 hover:bg-white/10'
              }`}
            >
              {!isVacation ? '학기중' : '방학중'}
            </button>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <button 
            onClick={onOpenMap}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors"
            title="노선도 보기"
          >
            <Map className="w-5 h-5 text-white" />
          </button>
          <div className="text-right">
            <div className="text-3xl font-bold tracking-tight">
              {format(time, 'HH:mm')}
            </div>
            <div className="text-blue-100 text-xs font-medium">
              {format(time, 'MM.dd EEEE', { locale: ko })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
