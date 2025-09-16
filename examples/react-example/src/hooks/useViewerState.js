import { useState, useCallback } from 'react';

export const useViewerState = () => {
    const [isReady, setIsReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState('초기화 대기 중');

    const setReady = useCallback((ready = true) => {
        setIsReady(ready);
    }, []);

    const setLoading = useCallback((loading = true) => {
        setIsLoading(loading);
    }, []);

    const updateStatus = useCallback((message) => {
        setStatus(message);
    }, []);

    const resetState = useCallback(() => {
        setIsReady(false);
        setIsLoading(false);
        setStatus('초기화 대기 중');
    }, []);

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
