import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="p-4 mt-auto text-center text-xs text-gray-400 bg-gray-50 border-t border-gray-100">
      <div className="space-y-1">
        <p className="font-medium">⚠️ 주의사항</p>
        <p>본 서비스는 순천향대학교 공식 앱이 아닙니다.</p>
        <p>시간표는 학교 사정에 따라 예고 없이 변경될 수 있습니다.</p>
        <p>정확한 정보는 반드시 학교 홈페이지나 공식 공지사항을 확인해주세요.</p>
      </div>
    </footer>
  );
};
