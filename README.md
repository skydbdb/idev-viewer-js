# idev-viewer

아이데브(idev.biz)기반 템플릿 뷰어로, 타 프레임워크에서 100% 동일한 렌더링을 보장합니다.

## 🚀 특징

- ✅ **간단한 사용법**: npm install로 설치, 간단한 API로 사용
- ✅ **모든 프레임워크 호환**: React, Vue, Angular, Next.js, Vanilla JS 등
- ✅ **TypeScript 지원**: 완전한 타입 정의 제공
- ✅ **빌드 시스템**: Rollup 기반으로 최적화된 번들 제공

## 📦 설치

```bash
npm install idev-viewer
```

## 🎯 사용법

### 기본 사용법

```javascript
import { IdevViewer } from 'idev-viewer';

const viewer = new IdevViewer({
    width: '100%',
    height: '600px',
    idevAppPath: './idev-app/',
    template: {
        script: JSON.stringify(templateData),
        templateId: 'my_template',
        templateNm: 'My Template',
        commitInfo: 'v1.0.0'
    },
    config: {
        theme: 'dark',
        locale: 'ko'
    },
    onReady: (data) => {
        console.log('뷰어 준비 완료:', data);
    },
    onError: (error) => {
        console.error('에러 발생:', error);
    }
});

// DOM에 마운트
viewer.mount(document.getElementById('viewer-container'));
```

### React 예제

```jsx
import React, { useEffect, useRef, useState } from 'react';
import { IdevViewer } from 'idev-viewer';

function IdevViewerComponent({ template, config }) {
    const containerRef = useRef(null);
    const viewerRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (containerRef.current && !viewerRef.current) {
            viewerRef.current = new IdevViewer({
                width: '100%',
                height: '500px',
                idevAppPath: './idev-app/',
                template,
                config,
                onReady: (data) => {
                    setIsReady(true);
                    console.log('뷰어 준비 완료:', data);
                },
                onError: (error) => {
                    console.error('에러 발생:', error);
                }
            });

            viewerRef.current.mount(containerRef.current);
        }

        return () => {
            if (viewerRef.current) {
                viewerRef.current.destroy();
                viewerRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (viewerRef.current && isReady) {
            viewerRef.current.updateTemplate(template);
        }
    }, [template, isReady]);

    return (
        <div ref={containerRef} className="idev-viewer-container" />
    );
}

export default IdevViewerComponent;
```

### Vue 예제

```vue
<template>
    <div ref="containerRef" class="idev-viewer-container" />
</template>

<script>
import { IdevViewer } from 'idev-viewer';

export default {
    name: 'IdevViewerComponent',
    props: {
        template: {
            type: Object,
            required: true
        },
        config: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            viewer: null,
            isReady: false
        };
    },
    mounted() {
        this.initViewer();
    },
    beforeUnmount() {
        if (this.viewer) {
            this.viewer.destroy();
            this.viewer = null;
        }
    },
    watch: {
        template: {
            handler(newTemplate) {
                if (this.viewer && this.isReady) {
                    this.viewer.updateTemplate(newTemplate);
                }
            },
            deep: true
        },
        config: {
            handler(newConfig) {
                if (this.viewer && this.isReady) {
                    this.viewer.updateConfig(newConfig);
                }
            },
            deep: true
        }
    },
    methods: {
        initViewer() {
            this.viewer = new IdevViewer({
                width: '100%',
                height: '500px',
                idevAppPath: './idev-app/',
                template: this.template,
                config: this.config,
                onReady: (data) => {
                    this.isReady = true;
                    console.log('뷰어 준비 완료:', data);
                },
                onError: (error) => {
                    console.error('에러 발생:', error);
                }
            });

            this.viewer.mount(this.$refs.containerRef);
        }
    }
};
</script>

<style scoped>
.idev-viewer-container {
    width: 100%;
    height: 500px;
    border: 1px solid #ddd;
    border-radius: 4px;
}
</style>
```

### Next.js 예제

```jsx
import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

function IdevViewerComponent({ template, config }) {
    const containerRef = useRef(null);
    const viewerRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const [isLibraryLoaded, setIsLibraryLoaded] = useState(false);

    useEffect(() => {
        if (isLibraryLoaded && containerRef.current && !viewerRef.current) {
            viewerRef.current = new window.IdevViewer({
                width: '100%',
                height: '500px',
                idevAppPath: '/idev-app/',
                template,
                config,
                onReady: (data) => {
                    setIsReady(true);
                    console.log('뷰어 준비 완료:', data);
                },
                onError: (error) => {
                    console.error('에러 발생:', error);
                }
            });

            viewerRef.current.mount(containerRef.current);
        }

        return () => {
            if (viewerRef.current) {
                viewerRef.current.destroy();
                viewerRef.current = null;
            }
        };
    }, [isLibraryLoaded]);

    return (
        <>
            <Script
                src="/idev-viewer.js"
                onLoad={() => setIsLibraryLoaded(true)}
            />
            <div ref={containerRef} className="idev-viewer-container" />
        </>
    );
}

export default IdevViewerComponent;
```

## 📋 API 레퍼런스

### 생성자 옵션

| 옵션 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `width` | string | '100%' | 뷰어 너비 (CSS 값) |
| `height` | string | '600px' | 뷰어 높이 (CSS 값) |
| `idevAppPath` | string | './idev-app/' | IDev 앱 경로 |
| `template` | object | null | 템플릿 정보 |
| `config` | object | {} | 설정 정보 |
| `onReady` | function | null | 준비 완료 콜백 |
| `onError` | function | null | 에러 콜백 |
| `onStateUpdate` | function | null | 상태 업데이트 콜백 |
| `onTemplateUpdated` | function | null | 템플릿 업데이트 콜백 |
| `onConfigUpdated` | function | null | 설정 업데이트 콜백 |
| `onApiResponse` | function | null | API 응답 콜백 |
| `onStreamData` | function | null | 스트림 데이터 콜백 |
| `onItemTap` | function | null | 아이템 탭 콜백 |
| `onItemEdit` | function | null | 아이템 편집 콜백 |
| `autoCreateIframe` | boolean | true | 자동 iframe 생성 |
| `autoSetupMessageHandlers` | boolean | true | 자동 메시지 핸들러 설정 |

### 메서드

#### `mount(container)`
뷰어를 DOM 컨테이너에 마운트합니다.

```javascript
viewer.mount(document.getElementById('viewer-container'));
```

#### `updateTemplate(template)`
템플릿을 업데이트합니다.

```javascript
viewer.updateTemplate({
    script: JSON.stringify(newTemplateData),
    templateId: 'updated_template',
    templateNm: 'Updated Template',
    commitInfo: 'v1.1.0'
});
```

#### `updateConfig(config)`
설정을 업데이트합니다.

```javascript
viewer.updateConfig({
    theme: 'light',
    locale: 'en'
});
```

#### `requestApi(method, endpoint, data, options)`
API 요청을 전송합니다.

```javascript
viewer.requestApi('GET', '/api/data', null, {
    timeout: 5000
});
```

#### `subscribeToStream(streamType, callback)`
스트림 데이터를 구독합니다.

```javascript
const subscriptionId = viewer.subscribeToStream('realtime', (data) => {
    console.log('스트림 데이터:', data);
});
```

#### `resize(width, height)`
뷰어 크기를 조정합니다.

```javascript
viewer.resize('800px', '600px');
```

#### `getState()`
현재 뷰어 상태를 가져옵니다.

```javascript
const state = viewer.getState();
```

#### `destroy()`
뷰어를 제거하고 리소스를 정리합니다.

```javascript
viewer.destroy();
```

## 🏗️ 프로젝트 구조

```
node_modules/idev-viewer/
├── dist/                    # JavaScript 라이브러리
│   ├── idev-viewer.js       # UMD 번들
│   ├── idev-viewer.esm.js   # ES 모듈 번들
│   └── idev-viewer.d.ts     # TypeScript 타입 정의
├── idev-app/                # IDev Web 앱
│   ├── index.html           # 메인 HTML 파일
│   ├── main.dart.js         # IDev 앱 메인 코드
│   ├── flutter.js           # IDev 런타임
│   ├── assets/              # IDev 앱 리소스들
│   └── canvaskit/           # IDev 렌더링 엔진
└── README.md                # 이 문서
```

## 🔧 설정

### IDev 앱 경로 설정

```javascript
// 상대 경로 (권장)
idevAppPath: './idev-app/'

// 절대 경로
idevAppPath: '/idev-app/'

// CDN 경로
idevAppPath: 'https://cdn.example.com/idev-app/'
```

### 템플릿 데이터 형식

```javascript
const template = {
    script: JSON.stringify({
        // IDev 앱에서 사용할 데이터
        widgets: [...],
        layout: {...},
        config: {...}
    }),
    templateId: 'unique_template_id',
    templateNm: 'Template Display Name',
    commitInfo: 'v1.0.0'
};
```

### 설정 옵션

```javascript
const config = {
    theme: 'dark',           // 'light' | 'dark'
    locale: 'ko',            // 'ko' | 'en' | 'ja'
    apiKey: 'your_api_key',  // API 키 (선택사항)
    debug: false             // 디버그 모드
};
```

## 🧪 테스트

### 로컬 테스트

```bash
# Python HTTP 서버 시작
python3 -m http.server 8080

# 브라우저에서 접속
# http://localhost:8080/your-project/
```

### 프레임워크별 테스트

```bash
# React
npm start

# Vue
npm run serve

# Next.js
npm run dev
```

## 🚨 문제 해결

### 일반적인 문제들

#### 1. IDev 앱이 로드되지 않음
- `idevAppPath`가 올바른지 확인
- IDev Web 빌드가 최신인지 확인
- 브라우저 콘솔에서 에러 메시지 확인
- CORS 설정 확인

#### 2. 템플릿이 렌더링되지 않음
- `template.script`가 올바른 JSON 형식인지 확인
- IDev 앱에서 템플릿을 받았는지 확인
- `onReady` 콜백이 호출되었는지 확인

#### 3. CORS 오류
- 개발 서버에서 프록시 설정 확인
- IDev 앱과 메인 앱이 같은 도메인에서 실행되는지 확인
- Next.js의 경우 `next.config.js`에서 rewrites 설정 확인

#### 4. 라이브러리가 로드되지 않음
- 스크립트 태그의 경로가 올바른지 확인
- 네트워크 탭에서 파일 로드 상태 확인
- 브라우저 캐시 클리어

### 디버깅 팁

1. **콘솔 로그 확인**: IDev 앱과 JavaScript 간의 메시지 통신 확인
2. **네트워크 탭**: IDev 앱 파일들이 올바르게 로드되는지 확인
3. **IDev DevTools**: IDev 앱의 상태와 위젯 트리 확인
4. **PostMessage 디버깅**: 브라우저 개발자 도구에서 메시지 이벤트 모니터링

## 📚 추가 리소스

- [IDev Web 공식 문서](https://docs.flutter.dev/platform-integration/web)
- [PostMessage API 문서](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
- [iframe 통신 가이드](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe)
- [React 공식 문서](https://react.dev/)
- [Vue 공식 문서](https://vuejs.org/)
- [Next.js 공식 문서](https://nextjs.org/)

## 🤝 기여하기

버그 리포트나 기능 요청은 GitHub Issues를 통해 제출해주세요.

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

---

**idev-viewer** - IDev Web 앱을 모든 프레임워크에서 사용하세요! 🚀