<script>
    import { createEventDispatcher } from "svelte";

    export let isReady = false;
    export let isLoading = false;
    export let isLibraryLoaded = false;

    const dispatch = createEventDispatcher();

    const handleInit = () => {
        dispatch("init");
    };

    const handleUpdateTemplate = () => {
        dispatch("updateTemplate");
    };

    const handleDestroyViewer = () => {
        dispatch("destroyViewer");
    };
</script>

<div class="controls">
    <h3>🎮 뷰어 제어</h3>

    <div class="button-group">
        <button
            class="btn btn-primary"
            on:click={handleInit}
            disabled={isLoading || !isLibraryLoaded}
        >
            {isLoading ? "초기화 중..." : "🚀 뷰어 초기화"}
        </button>

        <button
            class="btn btn-success"
            on:click={handleUpdateTemplate}
            disabled={!isReady || isLoading}
        >
            📄 템플릿 업데이트
        </button>

        <button
            class="btn btn-danger"
            on:click={handleDestroyViewer}
            disabled={!isReady || isLoading}
        >
            🗑️ 뷰어 제거
        </button>
    </div>

    <div class="status">
        상태: {isLoading ? "로딩 중..." : isReady ? "준비 완료" : "대기 중"}
    </div>
</div>
