import { writable } from 'svelte/store';

export const useViewerState = () => {
    const isReady = writable(false);
    const isLoading = writable(false);
    const status = writable('대기 중...');

    const setReady = (ready) => {
        isReady.set(ready);
    };

    const setLoading = (loading) => {
        isLoading.set(loading);
    };

    const updateStatus = (newStatus) => {
        status.set(newStatus);
    };

    const resetState = () => {
        isReady.set(false);
        isLoading.set(false);
        status.set('대기 중...');
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
