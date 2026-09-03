import React from 'react';
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Music } from 'lucide-react';

export default function LoginScreen() {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    // 전체 화면 배경 (public 폴더에 넣은 이미지 사용)
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/bg-feed.jpg')" }}
    >
      {/* 배경이 너무 튀지 않게 살짝 덮어주는 반투명 필터 (가독성 향상) */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>

      {/* 중앙 로그인 박스 */}
      <div className="relative z-10 flex flex-col items-center bg-white/90 p-8 rounded-3xl shadow-2xl max-w-[320px] w-full mx-4 border border-white">
        
        {/* 앱 로고 아이콘 */}
        <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg mb-6">
          <Music size={32} />
        </div>
        
        {/* 앱 타이틀과 부제목 */}
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2 tracking-tight">Musigguru</h1>
        <p className="text-gray-600 font-medium mb-10 text-center text-sm">
          꾸루를 위한 세상에 단 하나뿐인<br/>음악을 만들어보세요
        </p>

        {/* 구글 로그인 버튼 */}
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
