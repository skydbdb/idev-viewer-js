import { writable } from 'svelte/store';

export const useIdevViewer = () => {
    const viewer = writable(null);
    const streamCallbackId = writable(null);
    const isLibraryLoaded = writable(false);

    // 라이브러리 로드 상태 확인
    const checkLibrary = () => {
        if (typeof window !== 'undefined' && typeof window.IdevViewer !== 'undefined') {
            isLibraryLoaded.set(true);
            console.log('✅ IDev Viewer 라이브러리 로드됨');
            return true;
        } else {
            isLibraryLoaded.set(false);
            console.log('⏳ IDev Viewer 라이브러리 로딩 중...');
            return false;
        }
    };

    const loadScript = () => {
        if (typeof document !== 'undefined') {
            const script = document.createElement('script');
            script.src = '/idev-viewer.js';
            script.async = true;
            script.onload = () => {
                console.log('✅ IDev Viewer 스크립트 로드 완료');
                checkLibrary();
            };
            script.onerror = () => {
                console.error('❌ IDev Viewer 스크립트 로드 실패');
            };
            document.head.appendChild(script);
        }
    };

    // 주기적으로 라이브러리 확인
    let intervalId = null;

    if (typeof window !== 'undefined') {
        loadScript();
        checkLibrary();
        intervalId = setInterval(() => {
            if (checkLibrary()) {
                // 라이브러리가 로드되면 인터벌 정리
                if (intervalId) {
                    clearInterval(intervalId);
                    intervalId = null;
                }
            }
        }, 1000);
    }

    const isViewerReady = writable(false);

    const createViewer = (options) => {
        let currentLibraryLoaded;
        isLibraryLoaded.subscribe(value => currentLibraryLoaded = value)();

        if (!currentLibraryLoaded) {
            throw new Error('IDev Viewer 라이브러리가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.');
        }

        if (typeof window.IdevViewer === 'undefined') {
            throw new Error('IDev Viewer 라이브러리가 로드되지 않았습니다.');
        }

        // 기존 뷰어 제거
        let currentViewer;
        viewer.subscribe(value => currentViewer = value)();

        if (currentViewer) {
            try {
                currentViewer.destroy();
            } catch (error) {
                console.error('기존 뷰어 제거 실패:', error);
            }
            viewer.set(null);
        }

        // 새 뷰어 생성
        const newViewer = new window.IdevViewer(options);
        viewer.set(newViewer);
        isViewerReady.set(true);
        return newViewer;
    };

    const destroyViewer = () => {
        let currentViewer;
        viewer.subscribe(value => currentViewer = value)();

        if (currentViewer) {
            try {
                console.log('🗑️ 뷰어 제거 시작');

                // 1. 먼저 DOM에서 제거
                const container = document.getElementById('viewer-container');
                if (container) {
                    container.innerHTML = '';
                }

                // 2. 뷰어 인스턴스 제거
                currentViewer.destroy();

                // 3. 참조 초기화
                viewer.set(null);
                streamCallbackId.set(null);
                isViewerReady.set(false);

                console.log('✅ 뷰어 제거 완료');
            } catch (error) {
                console.error('뷰어 제거 실패:', error);
            }
        }
    };

    const mountViewer = (containerSelector) => {
        let currentViewer;
        viewer.subscribe(value => currentViewer = value)();

        if (!currentViewer) {
            throw new Error('뷰어가 초기화되지 않았습니다.');
        }
        currentViewer.mount(containerSelector);
    };

    const updateTemplate = (template) => {
        let currentViewer;
        viewer.subscribe(value => currentViewer = value)();

        if (!currentViewer) {
            throw new Error('뷰어가 초기화되지 않았습니다.');
        }
        currentViewer.updateTemplate(template);
    };

    const updateConfig = (config) => {
        let currentViewer;
        viewer.subscribe(value => currentViewer = value)();

        if (!currentViewer) {
            throw new Error('뷰어가 초기화되지 않았습니다.');
        }
        currentViewer.updateConfig(config);
    };

    const requestApi = (method, endpoint, data, options) => {
        let currentViewer;
        viewer.subscribe(value => currentViewer = value)();

        if (!currentViewer) {
            throw new Error('뷰어가 초기화되지 않았습니다.');
        }
        return currentViewer.requestApi(method, endpoint, data, options);
    };

    const subscribeToStream = (streamType, callback) => {
        let currentViewer;
        viewer.subscribe(value => currentViewer = value)();

        if (!currentViewer) {
            throw new Error('뷰어가 초기화되지 않았습니다.');
        }

        let currentCallbackId;
        streamCallbackId.subscribe(value => currentCallbackId = value)();

        if (currentCallbackId) {
            throw new Error('이미 스트림을 구독 중입니다.');
        }

        const callbackId = currentViewer.subscribeToStream(streamType, callback);
        streamCallbackId.set(callbackId);
        return callbackId;
    };

    const resizeViewer = (width, height) => {
        let currentViewer;
        viewer.subscribe(value => currentViewer = value)();

        if (!currentViewer) {
            throw new Error('뷰어가 초기화되지 않았습니다.');
        }
        currentViewer.resize(width, height);
    };

    const getState = () => {
        let currentViewer;
        viewer.subscribe(value => currentViewer = value)();

        if (!currentViewer) {
            throw new Error('뷰어가 초기화되지 않았습니다.');
        }
        currentViewer.getState();
    };

    return {
        viewer,
        isLibraryLoaded,
        isViewerReady,
        createViewer,
        destroyViewer,
        mountViewer,
        updateTemplate,
        updateConfig,
        requestApi,
        subscribeToStream,
        resizeViewer,
        getState
    };
};
