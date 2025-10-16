<script>
    import { createEventDispatcher } from "svelte";
    import { useLogger } from "../stores/useLogger.js";

    export let logs = [];
    export let status = "";

    const dispatch = createEventDispatcher();
    const { clearLogs } = useLogger();

    const handleClearLogs = () => {
        clearLogs();
    };

    // logs가 배열인지 확인하고 안전하게 처리
    $: safeLogs = Array.isArray(logs) ? logs : [];
</script>

<div class="logs">
    <h3>📋 로그 및 상태</h3>

    <div class="status">
        현재 상태: {status}
    </div>

    <div class="log-content">
        {#each safeLogs as log}
            <div class="log-entry">{log}</div>
        {/each}
        {#if safeLogs.length === 0}
            <div class="log-entry" style="color: #6c757d;">
                로그가 없습니다.
            </div>
        {/if}
    </div>

    <button class="btn btn-primary clear-logs" on:click={handleClearLogs}>
        🧹 로그 지우기
    </button>
</div>
