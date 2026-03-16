import React from 'react';
import { Info } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="px-5 py-4 mt-auto">
      <div className="bg-amber-50/80 rounded-xl p-4 border border-amber-100">
        <div className="flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
          <div className="space-y-1 text-xs text-amber-700/80">
            <p className="font-bold text-amber-800">주의사항</p>
            <p>본 서비스는 순천향대학교 공식 앱이 아닙니다.</p>
            <p>시간표는 예고 없이 변경될 수 있으며, 정확한 정보는 학교 공식 공지사항을 확인해주세요.</p>
            <p>문의: <a href="mailto:azsx6694@sch.ac.kr" className="underline font-semibold hover:text-amber-900">azsx6694@sch.ac.kr</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
};
