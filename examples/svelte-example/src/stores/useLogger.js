import { writable } from 'svelte/store';

export const useLogger = () => {
    const logs = writable([]);

    const addLog = (message) => {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = `[${timestamp}] ${message}`;

        logs.update(currentLogs => [...currentLogs, logEntry]);
    };

    const clearLogs = () => {
        logs.set([]);
    };

    return {
        logs,
        addLog,
        clearLogs
    };
};
