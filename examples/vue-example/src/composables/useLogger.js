import { ref } from 'vue';

export const useLogger = (initialLogs = ['로그가 여기에 표시됩니다...']) => {
    const logs = ref(initialLogs);

    const addLog = (message) => {
        const timestamp = new Date().toLocaleTimeString();
        const newLog = `[${timestamp}] ${message}`;
        logs.value.push(newLog);
    };

    const clearLogs = () => {
        logs.value = ['로그가 여기에 표시됩니다...'];
    };

    const addLogWithoutTimestamp = (message) => {
        logs.value.push(message);
    };

    return {
        logs,
        addLog,
        clearLogs,
        addLogWithoutTimestamp
    };
};
