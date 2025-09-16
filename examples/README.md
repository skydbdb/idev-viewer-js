# IDev Viewer Examples

이 폴더에는 IDev Viewer를 다양한 프레임워크에서 사용하는 예제들이 포함되어 있습니다.

## 📁 폴더 구조

```
examples/
├── react-example/          # React 예제 프로젝트
│   ├── src/
│   │   ├── App.js         # 메인 앱 컴포넌트
│   │   ├── App.css        # 앱 스타일
│   │   └── components/
│   │       └── IdevViewerComponent.js  # IDev Viewer 래퍼 컴포넌트
│   └── package.json       # React 프로젝트 설정
├── vue-example/            # Vue 예제 프로젝트
│   ├── src/
│   │   ├── App.vue        # 메인 앱 컴포넌트
│   │   └── components/
│   │       └── IdevViewerComponent.vue # IDev Viewer 래퍼 컴포넌트
│   └── package.json       # Vue 프로젝트 설정
├── nextjs-example/         # Next.js 예제 프로젝트
│   ├── pages/
│   │   ├── _app.js        # Next.js 전역 앱 컴포넌트
│   │   └── index.js       # 메인 페이지
│   ├── components/
│   │   ├── ViewerControls.js    # 뷰어 제어 컴포넌트
│   │   └── ViewerLogs.js        # 로그 표시 컴포넌트
│   ├── hooks/
│   │   └── useIdevViewer.js     # IDev Viewer 커스텀 훅
│   ├── styles/            # CSS 모듈 스타일
│   └── package.json       # Next.js 프로젝트 설정
├── vanilla-example/        # Vanilla JS 예제 프로젝트
│   ├── index.html         # 메인 HTML 파일
│   ├── idev-viewer.js     # IDev Viewer 라이브러리
│   └── idev-app/       # Flutter 웹 앱 파일들
└── README.md               # 이 파일
```

## 🚀 React 예제 실행

### 1. 의존성 설치
```bash
cd examples/react-example
npm install
```

### 2. 개발 서버 실행
```bash
npm start
```

### 3. 브라우저에서 확인
- http://localhost:3000 으로 접속
- IDev Viewer가 React 앱에 통합되어 렌더링되는 것을 확인

## 🚀 Vue 예제 실행

### 1. 의존성 설치
```bash
cd examples/vue-example
npm install
```

### 2. 개발 서버 실행
```bash
npm run serve
```

### 3. 브라우저에서 확인
- http://localhost:8080 으로 접속
- IDev Viewer가 Vue 앱에 통합되어 렌더링되는 것을 확인

## 🚀 Next.js 예제 실행

### 1. 의존성 설치
```bash
cd examples/nextjs-example
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

### 3. 브라우저에서 확인
- http://localhost:3000 으로 접속
- IDev Viewer가 Next.js 앱에 통합되어 렌더링되는 것을 확인

## 🚀 Vanilla JS 예제 실행

### 1. HTTP 서버 실행
```bash
cd examples/vanilla-example
python3 -m http.server 8082
```

### 2. 브라우저에서 확인
- http://localhost:8082 으로 접속
- IDev Viewer가 순수 HTML/JS 앱에 통합되어 렌더링되는 것을 확인

## 🔧 주요 기능

### React 예제
- **상태 관리**: useState를 사용한 템플릿 및 설정 상태 관리
- **이벤트 핸들링**: 템플릿 업데이트, 설정 변경 버튼
- **컴포넌트 통합**: IdevViewerComponent를 통한 IDev Viewer 래핑
- **반응형 디자인**: 모바일 및 데스크톱 최적화

### Vue 예제
- **반응형 데이터**: Vue의 반응형 시스템을 활용한 상태 관리
- **이벤트 핸들링**: Vue 이벤트 시스템을 사용한 사용자 상호작용
- **컴포넌트 통합**: Vue SFC를 사용한 IDev Viewer 래핑
- **스타일링**: Scoped CSS를 사용한 컴포넌트별 스타일 관리

### Next.js 예제
- **SSR/SSG 지원**: Next.js의 서버사이드 렌더링 및 정적 생성
- **커스텀 훅**: React 생명주기와 통합된 뷰어 관리
- **CSS 모듈**: 컴포넌트별 스코프된 스타일링
- **최적화**: Next.js 내장 최적화 기능 활용

### Vanilla JS 예제
- **순수 JavaScript**: 프레임워크 없이 순수 HTML/CSS/JS 사용
- **직접 통합**: IDev Viewer 라이브러리 직접 사용
- **간단한 구조**: 최소한의 의존성으로 빠른 시작
- **정적 서빙**: Python HTTP 서버를 통한 정적 파일 서빙

## 📱 공통 기능

### IDev Viewer 통합
- **iframe 렌더링**: Flutter Web 앱을 iframe으로 렌더링
- **PostMessage 통신**: 부모 앱과 IDev 앱 간의 양방향 통신
- **API 요청**: 외부 API 호출 및 응답 처리
- **스트림 구독**: 실시간 데이터 스트림 구독
- **크기 조정**: 동적 크기 변경 지원

### 사용자 인터페이스
- **로딩 상태**: 뷰어 초기화 및 로딩 상태 표시
- **에러 처리**: 오류 발생 시 사용자 친화적 메시지
- **상태 표시**: 현재 뷰어 상태를 실시간으로 표시
- **반응형 레이아웃**: 다양한 화면 크기에 최적화

## 🛠️ 개발 가이드

### 새로운 예제 추가
1. `examples/` 폴더에 새 폴더 생성
2. 해당 프레임워크의 기본 프로젝트 구조 설정
3. `IdevViewer` 클래스 통합
4. PostMessage 통신 구현
5. 사용자 인터페이스 구성

### 커스터마이징
- **테마**: CSS 변수를 사용한 테마 시스템
- **레이아웃**: Flexbox 및 Grid를 사용한 반응형 레이아웃
- **애니메이션**: CSS 트랜지션 및 키프레임 애니메이션
- **접근성**: ARIA 라벨 및 키보드 네비게이션 지원

## 📚 추가 리소스

- [IDev Viewer 메인 문서](../../README.md)
- [API 참조](../../README.md#api-참조)
- [설치 가이드](../../README.md#설치)
- [문제 해결](../../README.md#문제-해결)

## 🤝 기여하기

새로운 예제나 개선사항을 제안하고 싶으시다면:

1. 이슈를 생성하여 아이디어 공유
2. Pull Request를 통해 코드 기여
3. 문서 개선 및 번역 참여

## 📄 라이선스

MIT License

---

**IDev Viewer Examples** - Flutter Web 앱을 다양한 프레임워크에서 사용하는 방법을 보여주는 예제 모음입니다.
