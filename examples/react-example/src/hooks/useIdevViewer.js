import { useRef, useCallback, useMemo, useEffect, useState } from 'react';

export const useIdevViewer = () => {
    const viewerRef = useRef(null);
    const streamCallbackIdRef = useRef(null);
    const [isLibraryLoaded, setIsLibraryLoaded] = useState(false);

    // 라이브러리 로드 상태 확인
    useEffect(() => {
        const checkLibrary = () => {
            console.log('🔍 IDev Viewer 라이브러리 확인 중...');
            console.log('window.IdevViewer:', typeof window.IdevViewer);
            console.log('window 객체:', Object.keys(window).filter(key => key.includes('Idev') || key.includes('idev')));

            if (typeof window.IdevViewer !== 'undefined') {
                setIsLibraryLoaded(true);
                console.log('✅ IDev Viewer 라이브러리 로드 완료');
                try {
                    console.log(`📦 버전: ${window.IdevViewer.getVersion()}`);
                    console.log(`🔧 지원 여부: ${window.IdevViewer.isSupported()}`);
                } catch (error) {
                    console.error('라이브러리 메서드 호출 오류:', error);
                }
            } else {
                setIsLibraryLoaded(false);
                console.error('❌ IDev Viewer 라이브러리가 로드되지 않았습니다.');
                console.log('전체 window 객체 키:', Object.keys(window).slice(0, 20));
            }
        };

        // 초기 확인
        checkLibrary();

        // 주기적으로 확인 (라이브러리가 늦게 로드될 수 있음)
        const interval = setInterval(checkLibrary, 2000);

        return () => clearInterval(interval);
    }, []);

    const isViewerReady = useCallback(() => {
        return viewerRef.current !== null;
    }, []);

    const createViewer = useCallback((options) => {
        if (!isLibraryLoaded) {
            throw new Error('IDev Viewer 라이브러리가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.');
        }

        if (typeof window.IdevViewer === 'undefined') {
            throw new Error('IDev Viewer 라이브러리가 로드되지 않았습니다.');
        }

        // 기존 뷰어 제거
        if (viewerRef.current) {
            try {
                viewerRef.current.destroy();
            } catch (error) {
                console.error('기존 뷰어 제거 실패:', error);
            }
            viewerRef.current = null;
        }

        // 새 뷰어 생성
        viewerRef.current = new window.IdevViewer(options);
        return viewerRef.current;
    }, [isLibraryLoaded]);

    const destroyViewer = useCallback(() => {
        if (viewerRef.current) {
            try {
                viewerRef.current.destroy();
                viewerRef.current = null;
                streamCallbackIdRef.current = null;
            } catch (error) {
                console.error('뷰어 제거 실패:', error);
            }
        }
    }, []);

    const mountViewer = useCallback((containerSelector) => {
        if (!viewerRef.current) {
            throw new Error('뷰어가 초기화되지 않았습니다.');
        }
        viewerRef.current.mount(containerSelector);
    }, []);

    const updateTemplate = useCallback((template) => {
        if (!viewerRef.current) {
            throw new Error('뷰어가 초기화되지 않았습니다.');
        }
        viewerRef.current.updateTemplate(template);
    }, []);

    const updateConfig = useCallback((config) => {
        if (!viewerRef.current) {
            throw new Error('뷰어가 초기화되지 않았습니다.');
        }
        viewerRef.current.updateConfig(config);
    }, []);

    const requestApi = useCallback((method, endpoint, data, options) => {
        if (!viewerRef.current) {
            throw new Error('뷰어가 초기화되지 않았습니다.');
        }
        return viewerRef.current.requestApi(method, endpoint, data, options);
    }, []);

    const subscribeToStream = useCallback((streamType, callback) => {
        if (!viewerRef.current) {
            throw new Error('뷰어가 초기화되지 않았습니다.');
        }

        if (streamCallbackIdRef.current) {
            throw new Error('이미 스트림을 구독 중입니다.');
        }

        streamCallbackIdRef.current = viewerRef.current.subscribeToStream(streamType, callback);
        return streamCallbackIdRef.current;
    }, []);

    const resizeViewer = useCallback((width, height) => {
        if (!viewerRef.current) {
            throw new Error('뷰어가 초기화되지 않았습니다.');
        }
        viewerRef.current.resize(width, height);
    }, []);

    const getState = useCallback(() => {
        if (!viewerRef.current) {
            throw new Error('뷰어가 초기화되지 않았습니다.');
        }
        viewerRef.current.getState();
    }, []);

    const viewerInstance = useMemo(() => viewerRef.current, []);

    return {
        viewerInstance,
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
