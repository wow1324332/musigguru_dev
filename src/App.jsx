import React, { useState } from 'react';
import { Music, PlayCircle, User } from 'lucide-react';

// --- 1. 화면 컴포넌트 임시 생성 ---
// 나중에 이 부분들은 별도의 파일(섹션화)로 깔끔하게 나눌 예정입니다.

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

  return (
    // 배경을 어둡게 하고, 중앙에 모바일 크기의 화면을 고정 (폴더블/PC 대응)
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
