import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { Music, Download } from 'lucide-react'; // Download 아이콘 추가

export default function LoginScreen() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // 앱 설치 가능한 환경인지 감지하는 로직
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // 브라우저의 기본 설치 안내 팝업이 뜨는 것을 막습니다.
      e.preventDefault();
      // 설치 이벤트를 보관해 두었다가 우리가 만든 버튼을 누를 때 씁니다.
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // 보관해둔 설치 프롬프트 창을 띄웁니다.
      deferredPrompt.prompt();
      // 사용자가 '설치'를 눌렀는지 '취소'를 눌렀는지 결과를 기다립니다.
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('앱 설치가 수락되었습니다.');
      }
      // 설치 프롬프트는 한 번만 쓸 수 있으므로 비워줍니다.
      setDeferredPrompt(null);
    }
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    try {
      signInWithRedirect(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/bg-feed.jpg')" }}
    >
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>

      {/* 우측 최상단 '앱 설치' 버튼 (설치 가능한 상태일 때만 짠! 하고 나타납니다) */}
      {deferredPrompt && (
        <button
          onClick={handleInstallClick}
          className="absolute top-6 right-6 z-20 flex items-center space-x-1.5 bg-primary text-white px-4 py-2.5 rounded-full shadow-lg font-bold hover:bg-orange-400 active:scale-95 transition-all"
        >
          <Download size={18} strokeWidth={2.5} />
          <span className="text-sm">앱 설치</span>
        </button>
      )}

      {/* 중앙 로그인 박스 */}
      <div className="relative z-10 flex flex-col items-center bg-white/90 p-8 rounded-3xl shadow-2xl max-w-[320px] w-full mx-4 border border-white">
        
        <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg mb-6">
          <Music size={32} />
        </div>
        
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2 tracking-tight">Musigguru</h1>
        <p className="text-gray-600 font-medium mb-10 text-center text-sm">
          꾸루를 위한 세상에 단 하나뿐인<br/>음악을 만들어보세요
        </p>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center space-x-3 bg-white text-gray-700 font-bold py-3.5 px-4 rounded-xl border border-gray-300 shadow-sm hover:bg-gray-50 active:scale-95 transition-all"
        >
          <img 
            src="https://www.svgrepo.com/show/475656/google-color.svg" 
            alt="Google Logo" 
            className="w-5 h-5" 
          />
          <span>Google로 시작하기</span>
        </button>
      </div>
    </div>
  );
}
