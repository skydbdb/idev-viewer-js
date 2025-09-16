import { ref, computed, onMounted, onUnmounted } from 'vue';

export const useIdevViewer = () => {
    const viewer = ref(null);
    const streamCallbackId = ref(null);
    const isLibraryLoaded = ref(false);

    // 라이브러리 로드 상태 확인
    const checkLibrary = () => {
        if (typeof window.IdevViewer !== 'undefined') {
            isLibraryLoaded.value = true;
        } else {
            isLibraryLoaded.value = false;
        }
    };

    // 주기적으로 라이브러리 확인
    let intervalId = null;

    onMounted(() => {
        checkLibrary();
        intervalId = setInterval(checkLibrary, 2000);
    });

    onUnmounted(() => {
        if (intervalId) {
            clearInterval(intervalId);
        }
    });

    const isViewerReady = computed(() => viewer.value !== null);

    const createViewer = (options) => {
        if (!isLibraryLoaded.value) {
            throw new Error('IDev Viewer 라이브러리가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.');
        }

        if (typeof window.IdevViewer === 'undefined') {
            throw new Error('IDev Viewer 라이브러리가 로드되지 않았습니다.');
        }

        // 기존 뷰어 제거
        if (viewer.value) {
            try {
                viewer.value.destroy();
            } catch (error) {
                console.error('기존 뷰어 제거 실패:', error);
            }
            viewer.value = null;
        }

        // 새 뷰어 생성
        viewer.value = new window.IdevViewer(options);
        return viewer.value;
    };

    const destroyViewer = () => {
        if (viewer.value) {
            try {
                viewer.value.destroy();
                viewer.value = null;
                streamCallbackId.value = null;
            } catch (error) {
                console.error('뷰어 제거 실패:', error);
            }
        }
    };

    const mountViewer = (containerSelector) => {
        if (!viewer.value) {
            throw new Error('뷰어가 초기화되지 않았습니다.');
        }
        viewer.value.mount(containerSelector);
    };

    const updateTemplate = (template) => {
        if (!viewer.value) {
            throw new Error('뷰어가 초기화되지 않았습니다.');
        }
        viewer.value.updateTemplate(template);
    };

    const updateConfig = (config) => {
        if (!viewer.value) {
            throw new Error('뷰어가 초기화되지 않았습니다.');
        }
        viewer.value.updateConfig(config);
    };

    const requestApi = (method, endpoint, data, options) => {
        if (!viewer.value) {
            throw new Error('뷰어가 초기화되지 않았습니다.');
        }
        return viewer.value.requestApi(method, endpoint, data, options);
    };

    const subscribeToStream = (streamType, callback) => {
        if (!viewer.value) {
            throw new Error('뷰어가 초기화되지 않았습니다.');
        }

        if (streamCallbackId.value) {
            throw new Error('이미 스트림을 구독 중입니다.');
        }

        streamCallbackId.value = viewer.value.subscribeToStream(streamType, callback);
        return streamCallbackId.value;
    };

    const resizeViewer = (width, height) => {
        if (!viewer.value) {
            throw new Error('뷰어가 초기화되지 않았습니다.');
        }
        viewer.value.resize(width, height);
    };

    const getState = () => {
        if (!viewer.value) {
            throw new Error('뷰어가 초기화되지 않았습니다.');
        }
        viewer.value.getState();
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
