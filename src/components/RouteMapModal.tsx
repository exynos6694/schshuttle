import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin } from 'lucide-react';

interface RouteMapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RouteMapModal: React.FC<RouteMapModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-4 right-4 top-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl z-50 overflow-hidden flex flex-col max-h-[85vh]"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-slate-800">정류장 위치 안내</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto custom-scrollbar flex-1 bg-slate-50 relative">
              <div className="w-full h-full rounded-xl bg-white flex flex-col items-center justify-center p-2 shadow-inner">
                <img 
                  src="/route_map.png" 
                  alt="캠퍼스 순환 셔틀버스 노선도" 
                  className="w-full object-contain rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // 무한루프 방지
                    target.src = ''; // 엑박 숨기기
                    target.alt = '노선도 이미지를 public/route_map.png로 추가해주세요.';
                    target.className = 'w-full aspect-[3/4] bg-slate-200 indent-0 text-slate-500 text-sm flex items-center justify-center p-4 text-center';
                  }}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
