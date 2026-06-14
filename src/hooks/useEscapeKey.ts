import { useEffect } from 'react';

/** 모달 등이 열려 있을 때 Esc 키로 닫을 수 있게 한다. */
export const useEscapeKey = (isOpen: boolean, onClose: () => void): void => {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);
};
