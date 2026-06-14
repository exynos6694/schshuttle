import { useState, useEffect } from 'react';

// BeforeInstallPromptEvent 인터페이스 정의 (표준에 없으므로)
export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

// 표준에 없는 iOS Safari 전용 프로퍼티 (홈 화면 추가 시 true)
type SafariNavigator = Navigator & { standalone?: boolean };

// 이미 홈 화면(Standalone)으로 실행 중인지
const detectStandalone = (): boolean =>
  window.matchMedia('(display-mode: standalone)').matches ||
  (window.navigator as SafariNavigator).standalone === true;

// iOS Safari 환경 감지 (beforeinstallprompt 미지원 → 수동 가이드 필요)
const detectIOS = (): boolean =>
  /iPad|iPhone|iPod/.test(window.navigator.userAgent) && !('MSStream' in window);

export const usePWA = () => {
  // 초기값을 lazy initializer로 계산해 effect 내 동기 setState를 피함
  const [isInstalled, setIsInstalled] = useState(detectStandalone);
  const [isIOS] = useState(detectIOS);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(() => detectIOS() && !detectStandalone());

  useEffect(() => {
    if (detectStandalone()) return;

    // Android / Chrome 등 설치 이벤트(beforeinstallprompt) 감지
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const promptInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstallable(false);
      }
      setDeferredPrompt(null);
    }
  };

  return { isInstallable, isInstalled, isIOS, promptInstall, setIsInstallable };
};
