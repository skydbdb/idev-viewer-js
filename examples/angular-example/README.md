# IDev Viewer Angular Example

이 프로젝트는 Angular 프레임워크에서 IDev Viewer를 사용하는 예제입니다.

## 🚀 실행 방법

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm start
```

### 3. 브라우저에서 확인
- http://localhost:4200 으로 접속
- IDev Viewer가 Angular 앱에 통합되어 렌더링되는 것을 확인

## 🔧 주요 기능

### Angular 서비스 기반 상태 관리
- **IdevViewerService**: IDev Viewer 인스턴스 관리
- **LoggerService**: 로그 관리
- **ViewerStateService**: 뷰어 상태 관리

### 컴포넌트 구조
- **AppComponent**: 메인 애플리케이션 컴포넌트
- **ViewerControlsComponent**: 뷰어 제어 버튼들
- **ViewerLogsComponent**: 로그 표시 컴포넌트

### 주요 기능
- **뷰어 초기화**: IDev Viewer 인스턴스 생성 및 마운트
- **템플릿 업데이트**: 동적 템플릿 변경
- **뷰어 제거**: 인스턴스 정리 및 DOM 정리
- **실시간 로그**: 모든 작업의 로그 기록
- **상태 관리**: RxJS BehaviorSubject를 통한 반응형 상태 관리

## 📁 프로젝트 구조

```
angular-example/
├── src/
│   ├── index.html              # 메인 HTML 파일
│   ├── main.ts                 # 애플리케이션 진입점
│   ├── polyfills.ts            # 폴리필
│   ├── styles.css              # 전역 스타일
│   ├── test.ts                 # 테스트 설정
│   ├── idev-viewer.js          # IDev Viewer 라이브러리
│   ├── test-template.json       # 테스트 템플릿
│   ├── idev-app/               # Flutter 웹 앱 파일들
│   └── app/
│       ├── app.component.ts     # 메인 앱 컴포넌트
│       ├── app.component.html  # 메인 앱 템플릿
│       ├── app.component.css   # 메인 앱 스타일
│       ├── app.module.ts       # 앱 모듈
│       ├── app-routing.module.ts # 라우팅 모듈
│       ├── components/         # 컴포넌트들
│       │   ├── viewer-controls/
│       │   └── viewer-logs/
│       └── services/           # Angular 서비스들
│           ├── idev-viewer.service.ts
│           ├── logger.service.ts
│           └── viewer-state.service.ts
├── angular.json                 # Angular CLI 설정
├── package.json                 # 프로젝트 설정
├── tsconfig.app.json           # TypeScript 설정
├── tsconfig.spec.json          # 테스트 TypeScript 설정
└── README.md                   # 이 파일
```

## 🛠️ 개발 가이드

### 새로운 기능 추가
1. 필요한 서비스 메서드 추가
2. 컴포넌트에서 서비스 사용
3. 이벤트 바인딩을 통한 컴포넌트 간 통신

### 커스터마이징
- **스타일**: 각 컴포넌트의 CSS 파일에서 스타일 수정
- **서비스**: 서비스에서 비즈니스 로직 수정
- **상태**: BehaviorSubject를 통한 상태 관리 수정

## 📚 추가 리소스

- [Angular 공식 문서](https://angular.io/)
- [RxJS 문서](https://rxjs.dev/)
- [IDev Viewer 메인 문서](../../README.md)
- [API 참조](../../README.md#api-참조)

## 🤝 기여하기

새로운 기능이나 개선사항을 제안하고 싶으시다면:

1. 이슈를 생성하여 아이디어 공유
2. Pull Request를 통해 코드 기여
3. 문서 개선 및 번역 참여

## 📄 라이선스

MIT License
