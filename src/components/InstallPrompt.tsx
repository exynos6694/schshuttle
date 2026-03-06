import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Share, PlusSquare, X } from 'lucide-react';
import { usePWA } from '../hooks/usePWA';

export const InstallPrompt: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, promptInstall, setIsInstallable } = usePWA();
  const [dismissed, setDismissed] = useState(false);

  // 이미 설치되었거나, 설치 대상이 아니거나, 사용자가 팝업을 닫았다면 렌더링하지 않음
  if (isInstalled || !isInstallable || dismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-4 left-4 right-4 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 overflow-hidden"
      >
        <button 
          onClick={() => {
            setDismissed(true);
            setIsInstallable(false);
          }}
          className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 p-1 z-10"
          title="닫기"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-start gap-4 pr-6">
          <div className="bg-blue-50 p-3 rounded-xl flex-shrink-0">
            <Download className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-800 text-sm mb-1">앱으로 설치해서 사용하기</h3>
            <p className="text-xs text-slate-500 mb-3 leading-relaxed hidden sm:block">
              홈 화면에 추가하면 빠르고 데이터 낭비 없이 스케줄을 확인할 수 있어요!
            </p>
            <p className="text-[11px] text-slate-500 mb-3 leading-relaxed sm:hidden">
              바탕화면에 설치해서 앱처럼 확인하세요!
            </p>

            {isIOS ? (
              <div className="bg-slate-50 rounded-lg p-2.5 flex flex-col gap-1.5 text-[11px] text-slate-600 border border-slate-100">
                <div className="flex items-center gap-1.5 justify-center">
                  <span className="w-4 h-4 flex items-center justify-center font-bold text-blue-500">1.</span>
                  하단의 <Share className="w-4 h-4 text-blue-500 mx-0.5" /> 공유 버튼을 누르고
                </div>
                <div className="flex items-center gap-1.5 justify-center">
                  <span className="w-4 h-4 flex items-center justify-center font-bold text-blue-500">2.</span>
                  <PlusSquare className="w-4 h-4 text-slate-500" /> <span className="font-bold">홈 화면에 추가</span>를 탭하세요
                </div>
              </div>
            ) : (
              <button
                onClick={promptInstall}
                className="w-full bg-primary text-white font-bold text-sm py-2.5 rounded-lg active:scale-95 transition-transform shadow-md shadow-blue-500/20"
              >
                홈 화면에 추가하기
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
