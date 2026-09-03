import React, { useState, useEffect } from 'react';
import { Music, PlayCircle, User } from 'lucide-react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import LoginScreen from './LoginScreen';

// --- 1. 화면 컴포넌트 임시 생성 ---
const CreateScreen = () => (
  <div className="p-5 flex flex-col h-full bg-white">
    <h2 className="text-2xl font-bold mb-4">음악 제작</h2>
    <p className="text-gray-500">이곳에 사진 업로드 및 프롬프트 입력 UI가 들어갑니다.</p>
  </div>
);

const PlayerScreen = () => (
  <div className="p-5 flex flex-col h-full bg-white">
    <h2 className="text-2xl font-bold mb-4">플레이어</h2>
    <p className="text-gray-500">이곳에 꾸루를 위해 만든 음악 리스트가 들어갑니다.</p>
  </div>
);

const MyPageScreen = () => (
  <div className="p-5 flex flex-col h-full bg-white">
    <h2 className="text-2xl font-bold mb-4">마이페이지</h2>
    <p className="text-gray-500">내 프로필과 설정이 들어갑니다.</p>
  </div>
);

// --- 2. 메인 App 컴포넌트 ---
export default function App() {
  const [activeTab, setActiveTab] = useState('create');
  
  // 로그인 상태와 로딩 상태를 관리하는 변수
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // 앱이 켜질 때 파이어베이스에서 로그인 상태를 확인
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthLoading(false); // 확인이 끝나면 로딩 끝
    });
    return () => unsubscribe();
  }, []);

  // 1) 로그인 확인 중일 때 보여줄 로딩 화면
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        {/* 빙글빙글 도는 로딩 애니메이션 */}
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // 2) 로그인이 안 되어 있을 때 로그인 화면 띄우기 (폴더블폰 고려 레이아웃)
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="w-full max-w-md relative overflow-hidden min-h-screen shadow-2xl">
          <LoginScreen />
        </div>
      </div>
    );
  }

  // 3) 로그인이 완료되면 보여줄 메인 앱 화면
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-md bg-white shadow-xl flex flex-col relative overflow-hidden min-h-screen">
        
        {/* 상단 헤더 영역 */}
        <header className="p-4 border-b border-gray-100 flex items-center justify-center bg-white z-10">
          <h1 className="text-xl font-extrabold text-primary tracking-tight">Musigguru</h1>
        </header>

        {/* 메인 콘텐츠 영역 (스크롤 가능) */}
        <main className="flex-1 overflow-y-auto pb-20">
          {activeTab === 'create' && <CreateScreen />}
          {activeTab === 'player' && <PlayerScreen />}
          {activeTab === 'mypage' && <MyPageScreen />}
        </main>

        {/* 하단 네비게이션 탭 바 */}
        <nav className="absolute bottom-0 w-full bg-white border-t border-gray-200 flex justify-around items-center h-16 px-2 pb-safe">
          <button 
            onClick={() => setActiveTab('create')}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${activeTab === 'create' ? 'text-primary' : 'text-gray-400'}`}
          >
            <Music size={24} strokeWidth={activeTab === 'create' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">제작</span>
          </button>

          <button 
            onClick={() => setActiveTab('player')}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${activeTab === 'player' ? 'text-primary' : 'text-gray-400'}`}
          >
            <PlayCircle size={24} strokeWidth={activeTab === 'player' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">플레이어</span>
          </button>

          <button 
            onClick={() => setActiveTab('mypage')}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${activeTab === 'mypage' ? 'text-primary' : 'text-gray-400'}`}
          >
            <User size={24} strokeWidth={activeTab === 'mypage' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">마이페이지</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
