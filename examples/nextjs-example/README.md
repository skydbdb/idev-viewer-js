# 🚀 IDev Viewer Next.js Example

Flutter Web 앱을 Next.js에서 iframe으로 렌더링하는 예제입니다.

## 📋 개요

이 예제는 IDev Viewer JavaScript 라이브러리를 Next.js 프레임워크에서 사용하는 방법을 보여줍니다. Flutter로 개발된 웹 앱을 iframe으로 임베드하여 React 컴포넌트와 통합합니다.

## 🏗️ 프로젝트 구조

```
nextjs-example/
├── pages/
│   ├── _app.js          # Next.js 전역 앱 컴포넌트
│   └── index.js         # 메인 페이지
├── components/
│   ├── ViewerControls.js    # 뷰어 제어 컴포넌트
│   └── ViewerLogs.js        # 로그 표시 컴포넌트
├── hooks/
│   └── useIdevViewer.js     # IDev Viewer 커스텀 훅
├── styles/
│   ├── globals.css           # 전역 스타일
│   ├── Home.module.css       # 홈 페이지 스타일
│   ├── ViewerControls.module.css  # 컨트롤 스타일
│   └── ViewerLogs.module.css      # 로그 스타일
├── public/
│   ├── idev-app/          # Flutter 웹 앱 파일들
│   └── idev-viewer.js        # IDev Viewer 라이브러리
├── next.config.js            # Next.js 설정
├── package.json              # 프로젝트 의존성
└── README.md                 # 이 파일
```

### 📁 파일 접근 경로
- **idev-viewer.js**: `/idev-viewer.js` (public 디렉토리, 절대 경로)
- **idev-app**: `/idev-app/` (public 디렉토리, 절대 경로)
- **HTML에서**: `<Script src="/idev-viewer.js" />`
- **JavaScript에서**: `idevAppPath: '/idev-app/'`

## 🚀 빠른 시작

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

### 3. 브라우저 접속

- URL: `http://localhost:3000`
- 예상 결과: Next.js 앱이 정상적으로 로드됨

## 🔧 사용 방법

### 1. 앱 접속
브라우저에서 `http://localhost:3000` 접속

### 2. 뷰어 초기화
1. **뷰어 초기화** 버튼 클릭
2. IDev Viewer 인스턴스 생성
3. Flutter Web 앱 iframe으로 렌더링
4. 모든 컨트롤 버튼 활성화

### 3. 기능 테스트
- **템플릿 업데이트**: 동적으로 템플릿 데이터 변경
- **API 요청**: IDev 앱과 API 통신 테스트
- **스트림 구독**: 실시간 데이터 스트림 테스트
- **상태 확인**: 뷰어 현재 상태 조회
- **파일 로드**: JSON 템플릿 파일 업로드

## 🎯 주요 기능

### 📱 반응형 디자인
- 모바일, 태블릿, 데스크톱 지원
- CSS 모듈을 사용한 컴포넌트별 스타일링
- Next.js 최적화된 이미지 및 폰트 로딩

### 🔧 커스텀 훅
- `useIdevViewer`: 뷰어 상태 및 메서드 관리
- React 생명주기와 통합된 뷰어 관리
- 자동 정리 및 메모리 누수 방지

### 📊 실시간 로깅
- 뷰어 이벤트 실시간 모니터링
- 스크롤 가능한 로그 패널
- 타임스탬프가 포함된 상세 로그

### 🎨 모던 UI/UX
- Material Design 기반 버튼 스타일
- 부드러운 애니메이션 및 전환 효과
- 접근성을 고려한 키보드 네비게이션

## 🛠️ 기술 스택

- **프레임워크**: Next.js 14
- **UI 라이브러리**: React 18
- **스타일링**: CSS Modules
- **빌드 도구**: Next.js 내장 Webpack
- **개발 서버**: Next.js Dev Server
- **패키지 관리**: npm

## 📦 의존성

### 프로덕션 의존성
- `next`: Next.js 프레임워크
- `react`: React 라이브러리
- `react-dom`: React DOM 렌더러

### 개발 의존성
- `@types/node`: Node.js 타입 정의
- `@types/react`: React 타입 정의
- `@types/react-dom`: React DOM 타입 정의
- `eslint`: 코드 린팅
- `eslint-config-next`: Next.js ESLint 설정
- `typescript`: TypeScript 컴파일러

## 🔧 설정

### Next.js 설정 (`next.config.js`)
```javascript
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // 정적 파일 서빙을 위한 설정
  async rewrites() {
    return [
      {
        source: '/idev-app/:path*',
        destination: '/public/idev-app/:path*',
      },
    ];
  },
  // 정적 파일 최적화
  images: {
    unoptimized: true,
  },
  // 개발 서버 설정
  devServer: {
    port: 3000,
  },
};
```

### 환경 변수
현재 환경 변수는 사용하지 않지만, 필요시 `.env.local` 파일을 생성하여 설정할 수 있습니다.

## 🚀 배포

### Vercel 배포 (권장)
```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

### 정적 내보내기
```bash
# 정적 파일로 빌드
npm run build
npm run export

# out/ 디렉토리에 정적 파일 생성
```

### Docker 배포
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🧪 테스트

### 개발 환경 테스트
```bash
# 개발 서버 실행
npm run dev

# 브라우저에서 테스트
open http://localhost:3000
```

### 프로덕션 빌드 테스트
```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 브라우저에서 테스트
open http://localhost:3000
```

## 🔍 문제 해결

### 일반적인 문제들

#### 1. IDev Viewer 라이브러리 로드 실패
**증상**: "IDev Viewer 라이브러리 로드 실패" 에러
**해결방법**:
- `public/idev-viewer.js` 파일이 존재하는지 확인
- 브라우저 개발자 도구에서 네트워크 탭 확인
- 파일 경로가 올바른지 확인

#### 2. IDev 앱 로드 실패
**증상**: iframe이 로드되지 않음
**해결방법**:
- `public/idev-app/` 디렉토리가 존재하는지 확인
- IDev 앱 파일들이 올바르게 복사되었는지 확인
- CORS 설정 확인

#### 3. 포트 충돌
**증상**: "Port 3000 is already in use" 에러
**해결방법**:
```bash
# 포트 사용 중인 프로세스 확인
lsof -i :3000

# 프로세스 종료
kill -9 <PID>

# 또는 다른 포트 사용
npm run dev -- -p 3001
```

## 📚 추가 리소스

- [Next.js 공식 문서](https://nextjs.org/docs)
- [React 공식 문서](https://reactjs.org/docs)
- [IDev Viewer 통합 가이드](../../README.md)
- [Flutter Web 문서](https://flutter.dev/web)

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🚀 빠른 실행 가이드

**Next.js 예제를 빠르게 실행하려면**:

1. **의존성 설치**:
   ```bash
   npm install
   ```

2. **개발 서버 실행**:
   ```bash
   npm run dev
   ```

3. **브라우저 접속**:
   - URL: `http://localhost:3000`

4. **뷰어 초기화**:
   - "뷰어 초기화" 버튼 클릭
   - IDev 앱 로드 확인

**중요**: IDev 앱 파일들이 `public/idev-app/` 디렉토리에 있어야 합니다!
