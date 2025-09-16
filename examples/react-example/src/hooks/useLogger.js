import { useState, useCallback, useMemo } from 'react';

export const useLogger = (initialLogs = ['로그가 여기에 표시됩니다...']) => {
    const [logs, setLogs] = useState(initialLogs);

    const addLog = useCallback((message) => {
        const timestamp = new Date().toLocaleTimeString();
        const newLog = `[${timestamp}] ${message}`;
        setLogs(prev => [...prev, newLog]);
    }, []);

    const clearLogs = useCallback(() => {
        setLogs(['로그가 여기에 표시됩니다...']);
    }, []);

    const addLogWithoutTimestamp = useCallback((message) => {
        setLogs(prev => [...prev, message]);
    }, []);

    const logsWithTimestamps = useMemo(() => logs, [logs]);

    return {
        logs: logsWithTimestamps,
        addLog,
        clearLogs,
        addLogWithoutTimestamp
    };
};
