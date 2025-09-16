import { ref } from 'vue';

export const useViewerState = () => {
    const isReady = ref(false);
    const isLoading = ref(false);
    const status = ref('초기화 대기 중');

    const setReady = (ready = true) => {
        isReady.value = ready;
    };

    const setLoading = (loading = true) => {
        isLoading.value = loading;
    };

    const updateStatus = (message) => {
        status.value = message;
    };

    const resetState = () => {
        isReady.value = false;
        isLoading.value = false;
        status.value = '초기화 대기 중';
    };

    return {
        isReady,
        isLoading,
        status,
        setReady,
        setLoading,
        updateStatus,
        resetState
    };
};
