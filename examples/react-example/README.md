# IDev Viewer React 예제

React에서 IDev Viewer를 사용하여 Flutter Web 앱을 iframe으로 렌더링하는 예제입니다.

## 🚀 **주요 기능**

- **IDev 앱 통합**: iframe을 통해 Flutter Web 앱 렌더링
- **템플릿 관리**: JSON 템플릿을 통한 동적 UI 구성
- **실시간 통신**: PostMessage API를 통한 양방향 통신
- **반응형 UI**: React 컴포넌트 기반의 사용자 인터페이스
- **상태 관리**: React hooks를 통한 효율적인 상태 관리

## 🏗️ **아키텍처**

```
React 앱 (localhost:3000)
├── IDev Viewer 라이브러리
├── IDev 앱 (iframe)
└── PostMessage 통신
```

### **핵심 컴포넌트**

- **App.js**: 메인 애플리케이션 컴포넌트
- **useIdevViewer**: IDev Viewer 기능을 캡슐화한 커스텀 훅
- **ViewerControls**: 뷰어 제어 버튼 컴포넌트
- **useTemplateManager**: 템플릿 관리 로직

### 📁 파일 접근 경로
- **idev-viewer.js**: `%PUBLIC_URL%/idev-viewer.js` (public 디렉토리)
- **idev-app**: `./idev-app/` (public 디렉토리)
- **HTML에서**: `<script src="%PUBLIC_URL%/idev-viewer.js"></script>`
- **JavaScript에서**: `idevAppPath: './idev-app/'`

## 📦 **설치 및 실행**

### **사전 요구사항**

- Node.js 16+ 
- npm 또는 yarn
- Flutter Web 빌드된 앱

### **1. 의존성 설치**

```bash
cd idev-viewer-js/examples/react-example
npm install
```

### **2. 개발 서버 실행**

```bash
npm start
```

브라우저에서 http://localhost:3000 접속

## 🎮 **사용 방법**

### **1. 뷰어 초기화**

- "초기화" 버튼 클릭
- IDev 앱이 iframe에 로드됨
- 모든 컨트롤 버튼이 활성화됨

### **2. 템플릿 업데이트**

- "템플릿 업데이트" 버튼 클릭
- `test-template.json` 파일 로드
- IDev 앱에 그리드 템플릿 전송

### **3. 설정 업데이트**

- "설정 업데이트" 버튼 클릭
- 테마 및 로케일 설정 변경
- IDev 앱에 설정 전송

### **4. API 요청**

- "API 요청" 버튼 클릭
- IDev 앱에 API 요청 전송
- 응답 데이터를 로그에 표시

### **5. 스트림 구독**

- "스트림 구독" 버튼 클릭
- 실시간 데이터 스트림 구독
- 수신된 데이터를 로그에 표시

### **6. 크기 조정**

- "크기 조정" 버튼 클릭
- 뷰어 크기를 800x400으로 조정

### **7. 상태 조회**

- "상태 조회" 버튼 클릭
- 현재 뷰어 상태 정보 요청

### **8. 뷰어 제거**

- "뷰어 제거" 버튼 클릭
- iframe 제거 및 컨테이너 초기화

## 📁 **파일 구조**

```
react-example/
├── public/
│   ├── idev-viewer.js          # IDev Viewer 라이브러리
│   ├── test-template.json      # 테스트용 템플릿
│   ├── index.html              # HTML 진입점
│   └── idev-app/            # IDev 앱 파일들
├── src/
│   ├── App.js                  # 메인 애플리케이션
│   ├── App.css                 # 스타일시트
│   ├── hooks/
│   │   ├── useIdevViewer.js    # IDev Viewer 훅
│   │   └── useTemplateManager.js # 템플릿 관리 훅
│   └── components/
│       └── ViewerControls.js   # 컨트롤 버튼 컴포넌트
└── package.json                # 프로젝트 설정
```

## 🔧 **주요 특징**

### **Vanilla 예제와의 일치점**

- **IDev 앱 경로**: `../../idev-app/` (상대 경로)
- **템플릿 구조**: 동일한 JSON 템플릿 형식
- **콜백 구조**: `onReady`, `onError`, `onTemplateUpdated` 등
- **기능 구현**: 모든 핵심 기능 동일하게 구현

### **React 특화 기능**

- **상태 관리**: `useState`, `useCallback` 등 React hooks 활용
- **컴포넌트 분리**: 기능별 컴포넌트 분리로 유지보수성 향상
- **에러 처리**: try-catch를 통한 안전한 에러 처리
- **로딩 상태**: 각 작업별 로딩 상태 표시

## 🧪 **테스트 시나리오**

### **기본 기능 테스트**

1. **라이브러리 로드 확인**
   - 페이지 로드 시 IDev Viewer 라이브러리 상태 확인
   - 콘솔에서 "✅ IDev Viewer 라이브러리 로드 확인됨" 메시지 확인

2. **뷰어 초기화 테스트**
   - 초기화 버튼 클릭
   - IDev 앱 로드 상태 확인
   - 모든 컨트롤 버튼 활성화 확인

3. **템플릿 업데이트 테스트**
   - 템플릿 업데이트 버튼 클릭
   - JSON 템플릿 로드 확인
   - IDev 앱에 그리드 렌더링 확인

### **고급 기능 테스트**

1. **API 통신 테스트**
   - API 요청 버튼 클릭
   - IDev 앱과의 통신 확인
   - 응답 데이터 로그 확인

2. **스트림 구독 테스트**
   - 스트림 구독 버튼 클릭
   - 실시간 데이터 수신 확인
   - 콜백 함수 동작 확인

3. **크기 조정 테스트**
   - 크기 조정 버튼 클릭
   - iframe 크기 변경 확인

## 🐛 **문제 해결**

### **일반적인 문제**

1. **라이브러리 로드 실패**
   - `public/idev-viewer.js` 파일 존재 확인
   - 브라우저 콘솔에서 오류 메시지 확인

2. **IDev 앱 로드 실패**
   - `public/idev-app/` 디렉토리 존재 확인
   - IDev 앱 빌드 상태 확인

3. **템플릿 로드 실패**
   - `public/test-template.json` 파일 존재 확인
   - JSON 형식 유효성 확인

### **디버깅 팁**

- **브라우저 개발자 도구**: 콘솔과 네트워크 탭 활용
- **로그 패널**: 애플리케이션 내 로그 메시지 확인
- **상태 표시**: 현재 작업 상태 및 오류 메시지 확인

## 📚 **참고 자료**

- [IDev Viewer 통합 가이드](../IDEV_VIEWER_INTEGRATION_GUIDE.md)
- [Vanilla 예제](../vanilla-example/)
- [Flutter Web 문서](https://docs.flutter.dev/web)
- [React 공식 문서](https://reactjs.org/)

## 🤝 **기여하기**

버그 리포트나 기능 제안은 이슈를 통해 제출해주세요.

## 📄 **라이선스**

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
