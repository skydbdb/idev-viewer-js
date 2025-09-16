import { useState, useCallback, useEffect } from 'react';

export function useIdevViewer(options = {}) {
    const [viewer, setViewer] = useState(null);
    const [isReady, setIsReady] = useState(false);

    const initializeViewer = useCallback(() => {
        if (typeof window === 'undefined' || !window.IdevViewer) {
            console.error('❌ IDev Viewer 라이브러리가 로드되지 않았습니다.');
            return;
        }

        if (viewer) {
            console.warn('⚠️ 뷰어가 이미 초기화되었습니다.');
            return;
        }

        const viewerInstance = new window.IdevViewer({
            width: '100%',
            height: '600px',
            idevAppPath: '/idev-app/',
            template: {
                script: null,
                templateId: 'test_template_initial',
                templateNm: 'Test Template from Next.js',
                commitInfo: 'v1.0.0'
            },
            config: {
                apiKey: '7e074a90e6128deeab38d98765e82abe39ec87449f077d7ec85f328357f96b50',
                theme: 'dark',
                locale: 'ko'
            },
            onReady: (data) => {
                setIsReady(true);
                options.onReady?.(data);
            },
            onError: (error) => {
                console.error('❌ 뷰어 에러:', error);
                options.onError?.(error);
            },
            onTemplateUpdated: (data) => {
                options.onTemplateUpdated?.(data);
            },
            onConfigUpdated: (data) => {
                options.onConfigUpdated?.(data);
            },
            onApiResponse: (data) => {
                options.onApiResponse?.(data);
            },
            onStreamData: (streamType, data) => {
                options.onStreamData?.(streamType, data);
            },
            onItemTap: (data) => {
                options.onItemTap?.(data);
            },
            onItemEdit: (data) => {
                options.onItemEdit?.(data);
            },
        });

        // 뷰어를 DOM에 마운트
        const container = document.getElementById('viewer-container');
        if (container) {
            viewerInstance.mount('#viewer-container');
            setViewer(viewerInstance);
        } else {
            console.error('❌ 뷰어 컨테이너를 찾을 수 없습니다.');
        }
    }, [viewer, options]);

    const destroyViewer = useCallback(() => {
        if (viewer) {
            viewer.destroy();
            setViewer(null);
            setIsReady(false);

            // 컨테이너 초기화
            const container = document.getElementById('viewer-container');
            if (container) {
                container.innerHTML = '';
            }
        }
    }, [viewer]);

    const updateTemplate = useCallback((template) => {
        if (viewer && isReady) {
            viewer.updateTemplate(template);
        } else {
            console.warn('⚠️ 뷰어가 준비되지 않았습니다.');
        }
    }, [viewer, isReady]);


    // 컴포넌트 언마운트 시 정리
    useEffect(() => {
        return () => {
            if (viewer) {
                viewer.destroy();
            }
        };
    }, [viewer]);

    return {
        viewer,
        isReady,
        initializeViewer,
        destroyViewer,
        updateTemplate
    };
}
