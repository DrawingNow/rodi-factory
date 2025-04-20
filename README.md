# 📦 Rodi-Factory

공장에서 운용되는 AGV(무인이동로봇)의 상태를 시각화하고 관리할 수 있는 실시간 모니터링/제어 시스템입니다.



## 🖼️ 데모 화면

### 🌱 설계 문서
https://www.figma.com/design/QVv7dEgnwMT0ymG4d2aVjC/Rodi-Factory?node-id=1-2&t=mphCpQlqeWR038S0-1

![image](https://github.com/user-attachments/assets/fdc09f15-896d-4bc6-b620-92f776dbac1c)

## 🚀 주요 기능

- AGV 실시간 위치 표시 (Three.js 기반 3D 지도)
- 로봇 상태 패널: 배터리, 오류, 화물 상태 등 표시
- 대시보드: 오류 통계 차트 (Bar, Line, Pie)
- 수동 제어 페이지 제공
- MUI 기반 반응형 UI

## 🛠️ 기술 스택

- **Frontend:** React, MUI, React Router, Three.js, MUI Charts
- **Backend:** Node.js, Express
- **기타:** ESLint + Prettier, GitHub Actions (테스트 시), Husky, CommitLint 등

## 🧪 설치 및 실행

```bash
# 1. 클론
git clone https://github.com/yourname/rodi-factory.git
cd rodi-factory

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev  # React + Electron + Express 병렬 실행

# 또는 개별 실행
npm run server
npm run electron
