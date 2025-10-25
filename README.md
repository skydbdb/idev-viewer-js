# idev-viewer

아이데브(idev.biz)기반 템플릿 뷰어로, 타 프레임워크에서 100% 동일한 렌더링을 보장합니다.

## 🚀 특징

- ✅ **간단한 사용법**: npm install로 설치, 간단한 API로 사용
- ✅ **모든 프레임워크 호환**: React, Vue, Angular, Next.js, Svelte, Vanilla JS 등
- ✅ **TypeScript 지원**: 완전한 타입 정의 제공
- ✅ **빌드 시스템**: Rollup 기반으로 최적화된 번들 제공
- ✅ **완전한 예제**: 각 프레임워크별 완전한 예제 프로젝트 제공
- ✅ **CORS 해결**: 개발 환경에서 프록시 설정으로 CORS 문제 해결

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

### Angular 예제

```typescript
// idev-viewer.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class IdevViewerService {
    private viewer: any = null;
    public isLibraryLoadedSubject = new BehaviorSubject<boolean>(false);
    public isViewerReadySubject = new BehaviorSubject<boolean>(false);

    constructor() {
        this.loadScript();
    }

    private loadScript() {
        const script = document.createElement('script');
        script.src = '/assets/idev-viewer.js';
        script.async = true;
        script.onload = () => {
            this.isLibraryLoadedSubject.next(true);
        };
        document.head.appendChild(script);
    }

    createViewer(options: any) {
        if (!this.isLibraryLoadedSubject.value) {
            throw new Error('IDev Viewer 라이브러리가 아직 로드되지 않았습니다.');
        }

        this.viewer = new (window as any).IdevViewer(options);
        this.isViewerReadySubject.next(true);
        return this.viewer;
    }

    updateTemplate(template: any) {
        if (this.viewer) {
            this.viewer.updateTemplate(template);
        }
    }

    destroyViewer() {
        if (this.viewer) {
            this.viewer.destroy();
            this.viewer = null;
            this.isViewerReadySubject.next(false);
        }
    }
}
```

```typescript
// app.component.ts
import { Component, OnInit } from '@angular/core';
import { IdevViewerService } from './services/idev-viewer.service';

@Component({
    selector: 'app-root',
    template: `
        <div id="viewer-container"></div>
        <button (click)="initViewer()" [disabled]="!isLibraryLoaded">초기화</button>
        <button (click)="updateTemplate()" [disabled]="!isViewerReady">템플릿 업데이트</button>
    `
})
export class AppComponent implements OnInit {
    isLibraryLoaded = false;
    isViewerReady = false;

    constructor(private idevViewerService: IdevViewerService) {}

    ngOnInit() {
        this.idevViewerService.isLibraryLoaded.subscribe(loaded => {
            this.isLibraryLoaded = loaded;
        });

        this.idevViewerService.isViewerReady.subscribe(ready => {
            this.isViewerReady = ready;
        });
    }

    initViewer() {
        this.idevViewerService.createViewer({
            width: '100%',
            height: '600px',
            idevAppPath: './idev-app/',
            template: {
                script: JSON.stringify({ message: 'Hello from Angular!' }),
                templateId: 'angular_template',
                templateNm: 'Angular Template',
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
    }

    updateTemplate() {
        this.idevViewerService.updateTemplate({
            script: JSON.stringify({ message: 'Updated from Angular!' }),
            templateId: 'updated_template',
            templateNm: 'Updated Template',
            commitInfo: 'v1.1.0'
        });
    }
}
```

### Svelte 예제

```svelte
<!-- IdevViewer.svelte -->
<script>
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';

    export let template = {};
    export let config = {};
    export let width = '100%';
    export let height = '600px';

    let container;
    let viewer = null;
    let isReady = false;
    let isLibraryLoaded = false;

    onMount(() => {
        if (browser) {
            loadScript();
        }
    });

    onDestroy(() => {
        if (viewer) {
            viewer.destroy();
        }
    });

    function loadScript() {
        if (window.IdevViewer) {
            setIsLibraryLoaded(true);
            return;
        }

        const script = document.createElement('script');
        script.src = '/idev-viewer.js';
        script.async = true;
        script.onload = () => {
            setIsLibraryLoaded(true);
        };
        document.head.appendChild(script);
    }

    function setIsLibraryLoaded(loaded) {
        isLibraryLoaded = loaded;
        if (loaded && container && !viewer) {
            initViewer();
        }
    }

    function initViewer() {
        viewer = new window.IdevViewer({
            width,
            height,
            idevAppPath: './idev-app/',
            template,
            config,
            onReady: (data) => {
                isReady = true;
                console.log('뷰어 준비 완료:', data);
            },
            onError: (error) => {
                console.error('에러 발생:', error);
            }
        });

        viewer.mount(container);
    }

    $: if (viewer && isReady && template) {
        viewer.updateTemplate(template);
    }

    $: if (viewer && isReady && config) {
        viewer.updateConfig(config);
    }
</script>

<div bind:this={container} class="idev-viewer-container" />

<style>
    .idev-viewer-container {
        width: 100%;
        height: 500px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
</style>
```

### Vanilla JavaScript 예제

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IDev Viewer Vanilla Example</title>
    <style>
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        .controls {
            margin-bottom: 20px;
        }
        button {
            margin-right: 10px;
            padding: 10px 20px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:disabled {
            background: #ccc;
            cursor: not-allowed;
        }
        #viewer-container {
            width: 100%;
            height: 600px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>IDev Viewer Vanilla JavaScript Example</h1>
        
        <div class="controls">
            <button id="initBtn" disabled>초기화</button>
            <button id="updateBtn" disabled>템플릿 업데이트</button>
            <button id="destroyBtn" disabled>제거</button>
        </div>
        
        <div id="viewer-container"></div>
    </div>

    <script src="./idev-viewer.js"></script>
    <script>
        class IdevViewerManager {
            constructor() {
                this.viewer = null;
                this.isLibraryLoaded = false;
                this.isReady = false;
                
                this.initBtn = document.getElementById('initBtn');
                this.updateBtn = document.getElementById('updateBtn');
                this.destroyBtn = document.getElementById('destroyBtn');
                this.container = document.getElementById('viewer-container');
                
                this.setupEventListeners();
                this.checkLibraryLoaded();
            }

            setupEventListeners() {
                this.initBtn.addEventListener('click', () => this.initViewer());
                this.updateBtn.addEventListener('click', () => this.updateTemplate());
                this.destroyBtn.addEventListener('click', () => this.destroyViewer());
            }

            checkLibraryLoaded() {
                const checkInterval = setInterval(() => {
                    if (window.IdevViewer) {
                        this.isLibraryLoaded = true;
                        this.initBtn.disabled = false;
                        clearInterval(checkInterval);
                    }
                }, 100);
            }

            initViewer() {
                if (!this.isLibraryLoaded) {
                    alert('라이브러리가 아직 로드되지 않았습니다.');
                    return;
                }

                this.viewer = new window.IdevViewer({
                    width: '100%',
                    height: '600px',
                    idevAppPath: './idev-app/',
                    template: {
                        script: JSON.stringify({
                            message: 'Hello from Vanilla JavaScript!',
                            widgets: [],
                            layout: {}
                        }),
                        templateId: 'vanilla_template',
                        templateNm: 'Vanilla Template',
                        commitInfo: 'v1.0.0'
                    },
                    config: {
                        theme: 'dark',
                        locale: 'ko'
                    },
                    onReady: (data) => {
                        this.isReady = true;
                        this.updateBtn.disabled = false;
                        this.destroyBtn.disabled = false;
                        console.log('뷰어 준비 완료:', data);
                    },
                    onError: (error) => {
                        console.error('에러 발생:', error);
                        alert('뷰어 초기화 중 오류가 발생했습니다.');
                    }
                });

                this.viewer.mount(this.container);
            }

            updateTemplate() {
                if (!this.viewer || !this.isReady) {
                    alert('뷰어가 초기화되지 않았습니다.');
                    return;
                }

                this.viewer.updateTemplate({
                    script: JSON.stringify({
                        message: 'Updated from Vanilla JavaScript!',
                        widgets: [],
                        layout: {}
                    }),
                    templateId: 'updated_template',
                    templateNm: 'Updated Template',
                    commitInfo: 'v1.1.0'
                });
            }

            destroyViewer() {
                if (this.viewer) {
                    this.viewer.destroy();
                    this.viewer = null;
                    this.isReady = false;
                    this.updateBtn.disabled = true;
                    this.destroyBtn.disabled = true;
                    this.container.innerHTML = '';
                }
            }
        }

        // 페이지 로드 시 매니저 초기화
        document.addEventListener('DOMContentLoaded', () => {
            new IdevViewerManager();
        });
    </script>
</body>
</html>
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

## 📁 예제 프로젝트

각 프레임워크별로 완전한 예제 프로젝트가 제공됩니다:

### 🚀 빠른 시작

```bash
# 예제 프로젝트 클론
git clone https://github.com/skydbdb/idev-viewer-js.git
cd idev-viewer-js/examples

# 원하는 프레임워크 예제 실행
cd angular-example && npm install && npm start
cd react-example && npm install && npm start
cd vue-example && npm install && npm run dev
cd nextjs-example && npm install && npm run dev
cd svelte-example && npm install && npm run dev
cd vanilla-example && python3 -m http.server 8080
```

### 📋 예제 프로젝트 목록

| 프레임워크 | 디렉토리 | 포트 | 특징 |
|-----------|----------|------|------|
| **Angular** | `angular-example/` | 3000 | TypeScript, RxJS, 서비스 패턴 |
| **React** | `react-example/` | 3000 | Hooks, 커스텀 훅 패턴 |
| **Vue** | `vue-example/` | 3000 | Composition API, 컴포저블 패턴 |
| **Next.js** | `nextjs-example/` | 3000 | SSR, App Router, 프록시 설정 |
| **Svelte** | `svelte-example/` | 3000 | 반응형 스토어, 컴포넌트 패턴 |
| **Vanilla JS** | `vanilla-example/` | 8080 | 순수 JavaScript, 클래스 패턴 |

### 🔧 각 예제의 주요 기능

- ✅ **뷰어 초기화/제거**: 동적 뷰어 생성 및 정리
- ✅ **템플릿 업데이트**: 실시간 템플릿 데이터 변경
- ✅ **설정 관리**: 테마, 언어 등 설정 변경
- ✅ **에러 핸들링**: 상세한 에러 처리 및 로깅
- ✅ **상태 관리**: 뷰어 상태 추적 및 UI 반영
- ✅ **CORS 해결**: 개발 환경 프록시 설정

## 🏗️ 프로젝트 구조

```
idev-viewer-js/
├── dist/                    # JavaScript 라이브러리
│   ├── idev-viewer.js       # UMD 번들
│   ├── idev-viewer.esm.js   # ES 모듈 번들
│   └── idev-viewer.d.ts     # TypeScript 타입 정의
├── examples/                # 예제 프로젝트들
│   ├── angular-example/     # Angular 예제
│   ├── react-example/       # React 예제
│   ├── vue-example/         # Vue 예제
│   ├── nextjs-example/      # Next.js 예제
│   ├── svelte-example/      # Svelte 예제
│   └── vanilla-example/     # Vanilla JS 예제
├── src/                     # 소스 코드
│   └── idev-viewer.js       # 메인 라이브러리
├── idev-app/                # IDev Web 앱 (각 예제에 복사됨)
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