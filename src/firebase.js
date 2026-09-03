import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 전달해주신 파이어베이스 설정 정보
const firebaseConfig = {
  apiKey: "AIzaSyDJ04Mf62zqNRig0cUB3y0AsKj690wFbZw",
  authDomain: "musigguru-dev.firebaseapp.com",
  projectId: "musigguru-dev",
  storageBucket: "musigguru-dev.firebasestorage.app",
  messagingSenderId: "634092568488",
  appId: "1:634092568488:web:4c026e4beac628b9d2279d"
};

// 파이어베이스 초기화 (앱에 연결)
const app = initializeApp(firebaseConfig);

// 다른 파일에서 가져다 쓸 수 있도록 기능들을 내보내기
export const auth = getAuth(app);       // 구글 로그인용
export const db = getFirestore(app);    // 음악 리스트, 설정 정보 저장용
export const storage = getStorage(app); // 업로드할 사진, 완성된 mp3 저장용
