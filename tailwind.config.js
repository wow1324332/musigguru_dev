/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFB067", // 꾸루를 상징하는 따뜻한 메인 오렌지 컬러 (추후 변경 가능)
      }
    },
  },
  plugins: [],
}
