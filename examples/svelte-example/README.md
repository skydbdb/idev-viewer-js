# IDev Viewer Svelte Example

이 프로젝트는 Svelte 프레임워크에서 IDev Viewer를 사용하는 예제입니다.

## 🚀 실행 방법

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

### 3. 브라우저에서 확인
- http://localhost:3000 으로 접속
- IDev Viewer가 Svelte 앱에 통합되어 렌더링되는 것을 확인

## 🔧 주요 기능

### Svelte 스토어 기반 상태 관리
- **useIdevViewer**: IDev Viewer 인스턴스 관리
- **useLogger**: 로그 관리
- **useViewerState**: 뷰어 상태 관리

### 컴포넌트 구조
- **App.svelte**: 메인 애플리케이션 컴포넌트
- **ViewerControls.svelte**: 뷰어 제어 버튼들
- **ViewerLogs.svelte**: 로그 표시 컴포넌트

### 주요 기능
- **뷰어 초기화**: IDev Viewer 인스턴스 생성 및 마운트
- **템플릿 업데이트**: 동적 템플릿 변경
- **뷰어 제거**: 인스턴스 정리 및 DOM 정리
- **실시간 로그**: 모든 작업의 로그 기록
- **상태 관리**: Svelte 스토어를 통한 반응형 상태 관리

## 📁 프로젝트 구조

```
svelte-example/
├── public/
│   ├── index.html          # 메인 HTML 파일
│   ├── global.css          # 전역 스타일
│   ├── idev-viewer.js      # IDev Viewer 라이브러리
│   ├── test-template.json  # 테스트 템플릿
│   └── idev-app/           # Flutter 웹 앱 파일들
├── src/
│   ├── main.js             # 애플리케이션 진입점
│   ├── App.svelte          # 메인 앱 컴포넌트
│   ├── components/         # 컴포넌트들
│   │   ├── ViewerControls.svelte
│   │   └── ViewerLogs.svelte
│   └── stores/             # Svelte 스토어들
│       ├── useIdevViewer.js
│       ├── useLogger.js
│       └── useViewerState.js
├── package.json            # 프로젝트 설정
├── rollup.config.js        # Rollup 빌드 설정
└── README.md               # 이 파일
```

## 🛠️ 개발 가이드

### 새로운 기능 추가
1. 필요한 스토어 함수 추가
2. 컴포넌트에서 스토어 사용
3. 이벤트 디스패처를 통한 컴포넌트 간 통신

### 커스터마이징
- **스타일**: `global.css`에서 전역 스타일 수정
- **컴포넌트**: 각 `.svelte` 파일에서 컴포넌트별 스타일 추가
- **상태**: 스토어에서 상태 관리 로직 수정

## 📚 추가 리소스

- [Svelte 공식 문서](https://svelte.dev/)
- [IDev Viewer 메인 문서](../../README.md)
- [API 참조](../../README.md#api-참조)

## 🤝 기여하기

새로운 기능이나 개선사항을 제안하고 싶으시다면:

1. 이슈를 생성하여 아이디어 공유
2. Pull Request를 통해 코드 기여
3. 문서 개선 및 번역 참여

## 📄 라이선스

MIT License
