import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEscapeKey } from '../hooks/useEscapeKey';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  useEscapeKey(isOpen, onClose);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-8 bottom-8 z-50 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label="이용약관"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-full flex flex-col overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
                <h2 className="text-lg font-bold text-slate-800">이용약관</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto px-6 py-5 flex-1 text-sm text-slate-700 leading-relaxed space-y-6">
                <section>
                  <h3 className="font-bold text-slate-900 mb-2">제1조 (목적)</h3>
                  <p>
                    본 약관은 순천향대 셔틀버스 시간표 서비스(이하 "서비스")의 이용 조건 및 절차,
                    이용자와 서비스 제공자 간의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
                  </p>
                </section>

                <section>
                  <h3 className="font-bold text-slate-900 mb-2">제2조 (서비스의 성격)</h3>
                  <ol className="list-decimal list-inside space-y-1.5">
                    <li>본 서비스는 순천향대학교의 공식 서비스가 아닌, 학생이 개인적으로 제작한 비공식 서비스입니다.</li>
                    <li>서비스에서 제공하는 시간표 정보는 학교 공식 발표 자료를 기반으로 하나, 정확성을 보장하지 않습니다.</li>
                    <li>셔틀버스 시간표는 학교 사정에 의해 예고 없이 변경될 수 있으며, 변경 사항이 서비스에 즉시 반영되지 않을 수 있습니다.</li>
                  </ol>
                </section>

                <section>
                  <h3 className="font-bold text-slate-900 mb-2">제3조 (면책 조항)</h3>
                  <ol className="list-decimal list-inside space-y-1.5">
                    <li>서비스 제공자는 서비스에서 제공하는 정보의 정확성, 완전성, 신뢰성에 대해 보증하지 않습니다.</li>
                    <li>서비스 이용으로 인해 발생하는 어떠한 직접적·간접적 손해에 대해서도 서비스 제공자는 책임을 지지 않습니다.</li>
                    <li>셔틀버스 탑승 여부 및 시간 확인은 이용자 본인의 책임이며, 중요한 일정이 있을 경우 학교 공식 채널을 통해 별도로 확인하시기 바랍니다.</li>
                  </ol>
                </section>

                <section>
                  <h3 className="font-bold text-slate-900 mb-2">제4조 (개인정보)</h3>
                  <ol className="list-decimal list-inside space-y-1.5">
                    <li>본 서비스는 별도의 회원가입이나 로그인 절차가 없으며, 개인정보를 수집하지 않습니다.</li>
                    <li>서비스 이용 과정에서 발생하는 기기 정보, 접속 로그 등은 서비스 개선 목적으로만 사용될 수 있습니다.</li>
                  </ol>
                </section>

                <section>
                  <h3 className="font-bold text-slate-900 mb-2">제5조 (지적재산권)</h3>
                  <p>
                    서비스의 디자인, 소스코드 등 지적재산권은 서비스 제공자에게 있으며,
                    무단 복제·배포·수정을 금지합니다.
                  </p>
                </section>

                <section>
                  <h3 className="font-bold text-slate-900 mb-2">제6조 (서비스 변경 및 중단)</h3>
                  <ol className="list-decimal list-inside space-y-1.5">
                    <li>서비스 제공자는 서비스의 내용을 사전 통보 없이 변경하거나 중단할 수 있습니다.</li>
                    <li>서비스 중단으로 인한 이용자의 손해에 대해 서비스 제공자는 책임을 지지 않습니다.</li>
                  </ol>
                </section>

                <section>
                  <h3 className="font-bold text-slate-900 mb-2">제7조 (약관의 변경)</h3>
                  <p>
                    본 약관은 서비스 제공자의 판단에 따라 변경될 수 있으며,
                    변경된 약관은 서비스 내 공지를 통해 효력이 발생합니다.
                  </p>
                </section>

                <div className="pt-4 border-t border-slate-100 text-xs text-slate-400 space-y-1">
                  <p>시행일자: 2026년 4월 14일</p>
                  <p>문의: <a href="mailto:azsx6694@sch.ac.kr" className="underline hover:text-slate-600">azsx6694@sch.ac.kr</a></p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
