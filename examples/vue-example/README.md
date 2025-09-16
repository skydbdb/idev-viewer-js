# IDev Viewer Vue Example

Vue 3에서 IDev Viewer를 사용하여 Flutter Web 앱을 iframe으로 렌더링하는 예제입니다.

## 🚀 **주요 기능**

- **IDev 앱 통합**: iframe을 통해 Flutter Web 앱 렌더링
- **템플릿 관리**: JSON 템플릿을 통한 동적 UI 구성
- **실시간 통신**: PostMessage API를 통한 양방향 통신
- **반응형 UI**: Vue 3 Composition API 기반의 사용자 인터페이스
- **상태 관리**: Vue 3의 반응형 시스템을 통한 효율적인 상태 관리

## 🏗️ **아키텍처**

```
Vue 앱 (localhost:8080)
├── IDev Viewer 라이브러리
├── IDev 앱 (iframe)
└── PostMessage 통신
```

### **핵심 컴포넌트**

- **App.vue**: 메인 애플리케이션 컴포넌트
- **useIdevViewer**: IDev Viewer 기능을 캡슐화한 컴포지션 함수
- **ViewerControls**: 뷰어 제어 버튼 컴포넌트
- **ViewerLogs**: 로그 표시 컴포넌트

### **컴포지션 API 훅**

- **useLogger**: 로깅 기능 관리
- **useViewerState**: 뷰어 상태 관리

### 📁 파일 접근 경로
- **idev-viewer.js**: `idev-viewer.js` (public 디렉토리)
- **idev-app**: `./idev-app/` (public 디렉토리)
- **HTML에서**: `<script src="idev-viewer.js"></script>`
- **JavaScript에서**: `idevAppPath: "./idev-app/"`

## 📦 **설치 및 실행**

### **사전 요구사항**

- Node.js 16+ 
- npm 또는 yarn
- Flutter Web 빌드된 앱

### **1. 의존성 설치**

```bash
cd idev-viewer-js/examples/vue-example
npm install
```

### **2. 개발 서버 실행**

```bash
npm run serve
```

브라우저에서 http://localhost:8080 접속

## 🎮 **사용 방법**

### **1. 뷰어 초기화**

- "초기화" 버튼 클릭
- IDev 앱이 iframe에 로드됨
- 모든 컨트롤 버튼이 활성화됨

### **2. 템플릿 업데이트**

- "템플릿 업데이트" 버튼 클릭
- `test-template.json` 파일 로드
- IDev 앱에 그리드 템플릿 전송

### **3. 뷰어 제거**

- "뷰어 제거" 버튼 클릭
- iframe 제거 및 컨테이너 초기화

## 📁 **파일 구조**

```
vue-example/
├── public/
│   ├── idev-viewer.js          # IDev Viewer 라이브러리
│   ├── test-template.json      # 테스트용 템플릿
│   ├── index.html              # HTML 진입점
│   └── idev-app/            # IDev 앱 파일들
├── src/
│   ├── App.vue                 # 메인 애플리케이션
│   ├── main.js                 # Vue 앱 진입점
│   ├── composables/
│   │   ├── useIdevViewer.js    # IDev Viewer 컴포지션 함수
│   │   ├── useLogger.js        # 로깅 컴포지션 함수
│   │   └── useViewerState.js   # 상태 관리 컴포지션 함수
│   └── components/
│       ├── ViewerControls.vue  # 컨트롤 버튼 컴포넌트
│       └── ViewerLogs.vue      # 로그 표시 컴포넌트
└── package.json                # 프로젝트 설정
```

## 🔧 **주요 특징**

### **Vanilla 예제와의 일치점**

- **IDev 앱 경로**: `../../idev-app/` (상대 경로)
- **템플릿 구조**: 동일한 JSON 템플릿 형식
- **콜백 구조**: `onReady`, `onError`, `onTemplateUpdated` 등
- **기능 구현**: 핵심 기능 동일하게 구현

### **Vue 3 특화 기능**

- **Composition API**: `ref`, `computed`, `watch` 등 Vue 3 기능 활용
- **컴포넌트 분리**: 기능별 컴포넌트 분리로 유지보수성 향상
- **에러 처리**: try-catch를 통한 안전한 에러 처리
- **로딩 상태**: 각 작업별 로딩 상태 표시
- **반응형 시스템**: Vue의 반응형 시스템을 통한 자동 UI 업데이트

## 🧪 **테스트 시나리오**

### **기본 기능 테스트**

1. **라이브러리 로드 확인**
   - 페이지 로드 시 IDev Viewer 라이브러리 상태 확인
   - 브라우저 콘솔에서 오류 메시지 확인

2. **뷰어 초기화 테스트**
   - 초기화 버튼 클릭
   - IDev 앱 로드 상태 확인
   - 모든 컨트롤 버튼 활성화 확인

3. **템플릿 업데이트 테스트**
   - 템플릿 업데이트 버튼 클릭
   - JSON 템플릿 로드 확인
   - IDev 앱에 그리드 렌더링 확인

## 🐛 **문제 해결**

### **일반적인 문제**

1. **라이브러리 로드 실패**
   - `public/idev-viewer.js` 파일 존재 확인
   - 브라우저 콘솔에서 오류 메시지 확인

2. **IDev 앱 로드 실패**
   - `../../idev-app/` 디렉토리 존재 확인
   - IDev 앱 빌드 상태 확인

3. **템플릿 로드 실패**
   - `public/test-template.json` 파일 존재 확인
   - JSON 형식 유효성 확인

### **디버깅 팁**

- **브라우저 개발자 도구**: 콘솔과 네트워크 탭 활용
- **로그 패널**: 애플리케이션 내 로그 메시지 확인
- **상태 표시**: 현재 작업 상태 및 오류 메시지 확인
- **Vue DevTools**: Vue 컴포넌트 상태 및 props 확인

## 📚 **참고 자료**

- [Vanilla 예제](../vanilla-example/)
- [React 예제](../react-example/)
- [Flutter Web 문서](https://docs.flutter.dev/web)
- [Vue 3 공식 문서](https://vuejs.org/)

## 🤝 **기여하기**

버그 리포트나 기능 제안은 이슈를 통해 제출해주세요.

## 📄 **라이선스**

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
