# IDev Viewer Vanilla JavaScript 예제

순수 HTML, CSS, JavaScript를 사용하여 IDev Viewer를 통합하는 예제입니다.

## 🚀 기능

- **뷰어 초기화**: Flutter Web 앱 로드 및 마운트
- **템플릿 업데이트**: JSON 템플릿 데이터 동적 변경
- **설정 업데이트**: 테마, 로케일 등 설정 변경
- **API 요청**: 테스트 API 호출 및 응답 처리
- **스트림 구독**: 실시간 데이터 스트림 구독
- **크기 조정**: 뷰어 크기 동적 변경
- **뷰어 제거**: 인스턴스 정리 및 메모리 해제
- **상태 조회**: 현재 뷰어 상태 정보 조회
- **로그 관리**: 실시간 로그 표시 및 에러 처리

## 🏗️ 아키텍처

### 순수 JavaScript 구조
```
vanilla-example/
├── index.html              # 메인 HTML 파일
├── test-template.json     # 템플릿 데이터
├── idev-viewer.js         # IDev Viewer 라이브러리
├── idev-app/           # Flutter Web 앱 디렉토리
│   ├── index.html         # IDev 앱 HTML
│   ├── main.dart.js       # IDev 앱 JavaScript
│   ├── flutter.js         # Flutter 엔진
│   └── ...                # 기타 IDev 앱 파일들
└── README.md              # 이 파일
```

### 핵심 특징
- **DOM 직접 조작**: 순수 JavaScript로 DOM 요소 제어
- **이벤트 핸들링**: addEventListener를 통한 사용자 상호작용
- **비동기 처리**: async/await를 사용한 템플릿 로드
- **상태 관리**: 전역 변수를 통한 뷰어 인스턴스 관리
- **에러 처리**: try-catch와 에러 패널을 통한 안전한 에러 처리

### 📁 파일 접근 경로
- **idev-viewer.js**: `./idev-viewer.js` (루트 디렉토리)
- **idev-app**: `./idev-app/` (루트 디렉토리)
- **HTML에서**: `<script src="idev-viewer.js"></script>`
- **JavaScript에서**: `idevAppPath: './idev-app/'`

## 📦 설치 및 실행

### 1. 파일 준비
```bash
# 프로젝트 루트에서
npm run build
```

### 2. HTTP 서버 실행
```bash
# 바닐라 예제 디렉토리에서 실행
cd idev-viewer-js/examples/vanilla-example
python3 -m http.server 8082
```

### 3. 브라우저 접속
- URL: `http://localhost:8082/`
- 예상 결과: 순수 HTML/JS 앱 정상 로드
- **중요**: 서버는 반드시 바닐라 예제 디렉토리에서 실행해야 합니다

### 4. 실행 경로 확인
- **서버 실행 위치**: 바닐라 예제 디렉토리 (`idev-viewer-js/examples/vanilla-example/`)
- **접속 URL**: `http://localhost:8082/`
- **파일 경로**: `idev-viewer-js/examples/vanilla-example/`
- **상대 경로**: 모든 파일이 로컬 디렉토리 내에 위치

## 🔧 사용 방법

### 1. 앱 접속
브라우저에서 `http://localhost:8082/` 접속

**실행 경로 확인**:
- 서버 실행 위치: 바닐라 예제 디렉토리 (`idev-viewer-js/examples/vanilla-example/`)
- 접속 URL: `http://localhost:8082/`
- 파일 경로: `idev-viewer-js/examples/vanilla-example/`

### 2. 뷰어 초기화
1. **초기화** 버튼 클릭
2. IDev Viewer 인스턴스 생성
3. Flutter Web 앱 iframe으로 렌더링
4. 모든 컨트롤 버튼 활성화

### 3. 기능 테스트
- **템플릿 업데이트**: JSON 데이터 동적 변경
- **설정 업데이트**: 테마, 로케일 변경
- **API 요청**: GET 요청 테스트
- **스트림 구독**: JSON 메뉴, API 응답 등 스트림 구독
- **크기 조정**: 뷰어 크기 변경 (800x400)
- **상태 조회**: 현재 뷰어 상태 정보 조회
- **뷰어 제거**: 인스턴스 정리 및 컨테이너 초기화

## 📁 파일 구조

```
vanilla-example/
├── index.html              # 메인 HTML 파일 (모든 기능 포함)
├── test-template.json     # JSON 템플릿 데이터
├── idev-viewer.js         # IDev Viewer 라이브러리
├── idev-app/           # Flutter Web 앱 디렉토리
│   ├── index.html         # IDev 앱 HTML
│   ├── main.dart.js       # IDev 앱 JavaScript
│   ├── flutter.js         # Flutter 엔진
│   └── ...                # 기타 IDev 앱 파일들
└── README.md              # 이 파일
```

## 🎯 주요 특징

### 순수 JavaScript 최적화
- **DOM 조작**: 직접적인 DOM 요소 제어
- **이벤트 시스템**: addEventListener를 통한 이벤트 처리
- **비동기 처리**: fetch API와 async/await 활용
- **에러 처리**: try-catch와 에러 패널로 안전한 에러 처리

### IDev Viewer 통합
- **라이브러리 참조**: `./idev-viewer.js` 로컬 파일 참조
- **IDev 앱 경로**: `./idev-app/` 로컬 디렉토리 사용
- **템플릿 처리**: `script: null`로 초기 템플릿 없이 시작
- **라이프사이클 관리**: 전역 변수로 인스턴스 관리
- **상태 동기화**: DOM 상태와 뷰어 상태 연동

### UI/UX 디자인
- **모던 디자인**: 깔끔한 카드 스타일과 그림자 효과
- **반응형 레이아웃**: 모바일과 데스크톱 최적화
- **인터랙티브 요소**: 호버 효과와 버튼 상태 관리
- **정보 패널**: 테스트 정보와 에러 표시 패널
- **색상 코딩**: 기능별 버튼 색상 구분

## 🔧 코드 구조

### HTML 구조
```html
<div class="container">
  <div class="info-panel">테스트 정보</div>
  <div class="controls">컨트롤 버튼들</div>
  <div class="viewer-container">뷰어 컨테이너</div>
  <div class="status">상태 표시</div>
  <div class="log">로그 영역</div>
</div>
```

### JavaScript 함수들
```javascript
// 핵심 함수들
initViewer()                    // 뷰어 초기화
updateTemplate()                 // 템플릿 업데이트
updateConfig()                   // 설정 업데이트
requestApi()                     // API 요청
subscribeStream()                // 스트림 구독
resizeViewer()                   // 크기 조정
getState()                       // 상태 조회
destroyViewer()                  // 뷰어 제거

// 유틸리티 함수들
log(message)                     // 로그 추가
updateStatus(message)            // 상태 업데이트
showError(message)               // 에러 패널 표시
```

### CSS 스타일링
```css
/* 카드 스타일 */
.container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* 정보 패널 */
.info-panel {
  background-color: #e3f2fd;
  border-left: 4px solid #2196f3;
}

/* 에러 패널 */
.error-panel {
  background-color: #ffebee;
  border-left: 4px solid #f44336;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .controls button { margin: 2px; }
}
```

## 🐛 문제 해결

### 일반적인 문제들

#### 1. 라이브러리 로드 실패
**증상**: 콘솔에 "IDev Viewer 라이브러리 로드 실패" 에러
**해결방법**:
```bash
# 프로젝트 루트에서 재빌드
npm run build

# 참조 경로 확인
# ./idev-viewer.js
```

#### 2. IDev 앱 로드 실패
**증상**: iframe이 로드되지 않음
**해결방법**:
- `idev-app` 디렉토리 존재 여부 확인
- 경로: `./idev-app/`
- iframe 보안 정책 확인

#### 3. 포트 충돌
**증상**: "Address already in use" 에러
**해결방법**:
```bash
# 포트 사용 중인 프로세스 확인
lsof -i :8082

# 프로세스 종료
kill [PID]
```

#### 4. 상대 경로 문제
**증상**: 404 에러로 파일을 찾을 수 없음
**해결방법**:
- 서버를 프로젝트 루트 디렉토리에서 실행
- URL: `http://localhost:8082/idev-viewer-js/examples/vanilla-example/`
- **중요**: 서버 실행 위치가 올바른지 확인

## 🔧 개발 팁

### JavaScript 모범 사례
```javascript
// 전역 변수 관리
let viewer = null;
let streamCallbackId = null;

// 에러 처리
try {
  // 뷰어 초기화 로직
} catch (error) {
  log(`❌ 초기화 실패: ${error.message}`);
  showError(`뷰어 초기화 실패: ${error.message}`);
}

// DOM 조작
const container = document.getElementById('viewer-container');
container.innerHTML = `
  <div style="text-align: center; padding: 50px; color: #6c757d;">
    <h3>🔄 뷰어 초기화 대기 중...</h3>
    <p>초기화 버튼을 클릭하여 IDev Viewer를 시작하세요.</p>
  </div>
`;
```

### 성능 최적화
- **이벤트 위임**: addEventListener를 통한 이벤트 처리
- **DOM 캐싱**: 자주 사용하는 DOM 요소 캐시
- **메모리 관리**: 뷰어 제거 시 전역 변수 정리
- **에러 처리**: 사용자 친화적인 에러 메시지 표시

## 🧪 테스트 시나리오

### 테스트 1: 기본 초기화
1. 페이지 로드 후 라이브러리 로드 확인
2. "초기화" 버튼 클릭
3. IDev 앱 iframe 로드 확인
4. 모든 컨트롤 버튼 활성화 확인

**실행 경로 확인**:
- 서버 실행 위치: 프로젝트 루트 디렉토리 (`idev_viewer/`)
- 접속 URL: `http://localhost:8082/idev-viewer-js/examples/vanilla-example/`
- 파일 경로: `idev-viewer-js/examples/vanilla-example/`

### 테스트 2: 기능 테스트
1. "템플릿 업데이트" 버튼으로 템플릿 변경
2. "설정 업데이트" 버튼으로 설정 변경
3. "API 요청" 버튼으로 API 통신 테스트
4. "스트림 구독" 버튼으로 스트림 구독 테스트
5. "크기 조정" 버튼으로 뷰어 크기 변경
6. "상태 조회" 버튼으로 현재 상태 확인

### 테스트 3: 정리 테스트
1. "뷰어 제거" 버튼으로 인스턴스 정리
2. 컨테이너 초기화 확인
3. 모든 버튼 비활성화 확인

## 🔗 관련 링크

- [IDev Viewer 메인 문서](../../README.md)
- [React 예제](../react-example/README.md)
- [Vue 예제](../vue-example/README.md)
- [통합 가이드](../../../IDEV_VIEWER_INTEGRATION_GUIDE.md)

## 📍 실행 경로 요약

**바닐라 예제 실행을 위한 정확한 경로**:
- 서버 실행 위치: `idev-viewer-js/` 디렉토리
- 접속 URL: `http://localhost:8082/examples/vanilla-example/`
- 파일 경로: `idev-viewer-js/examples/vanilla-example/`
- 상대 경로: 모든 파일이 로컬 디렉토리 내에 위치

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🚀 빠른 실행 가이드

**바닐라 예제를 빠르게 실행하려면**:

1. **서버 실행**:
   ```bash
   # 바닐라 예제 디렉토리에서 실행
   cd idev-viewer-js/examples/vanilla-example
   python3 -m http.server 8082
   ```

2. **브라우저 접속**:
   - URL: `http://localhost:8082/`

3. **뷰어 초기화**:
   - "초기화" 버튼 클릭
   - IDev 앱 로드 확인

**중요**: 서버는 반드시 바닐라 예제 디렉토리에서 실행해야 합니다!

## 📍 실행 경로 체크리스트

**실행 전 확인사항**:
- [ ] 서버가 바닐라 예제 디렉토리에서 실행되고 있는가?
- [ ] 접속 URL이 `http://localhost:8082/`인가?
- [ ] `idev-viewer.js` 파일이 로컬에 존재하는가?
- [ ] `idev-app/` 디렉토리가 로컬에 존재하는가?
- [ ] `test-template.json` 파일이 로컬에 존재하는가?

## 🔧 실행 경로 문제 해결

**문제**: 404 에러로 파일을 찾을 수 없음
**해결**: 서버를 프로젝트 루트 디렉토리에서 실행

**문제**: iframe이 로드되지 않음
**해결**: `idev-app` 디렉토리 존재 여부 확인

**문제**: 라이브러리 로드 실패
**해결**: `idev-viewer.js` 파일 존재 여부 확인

## 📋 실행 경로 요약

**바닐라 예제 실행을 위한 정확한 경로**:
- 서버 실행 위치: 프로젝트 루트 디렉토리 (`idev_viewer/`)
- 접속 URL: `http://localhost:8082/idev-viewer-js/examples/vanilla-example/`
- 파일 경로: `idev-viewer-js/examples/vanilla-example/`
- 상대 경로: 모든 파일이 로컬 디렉토리 내에 위치

**중요**: 서버는 반드시 프로젝트 루트 디렉토리에서 실행해야 합니다!

## 🚀 빠른 실행 명령어

```bash
# 1. 서버 실행 (프로젝트 루트 디렉토리에서)
python3 -m http.server 8082

# 2. 브라우저 접속
open http://localhost:8082/idev-viewer-js/examples/vanilla-example/
```
