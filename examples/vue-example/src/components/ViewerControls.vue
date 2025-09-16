<template>
  <div class="controls">
    <h3>🎮 컨트롤</h3>
    <button @click="onInit" :disabled="isLoading" class="control-btn">
      {{ isLoading ? "초기화 중..." : "초기화" }}
    </button>
    <button @click="onUpdateTemplate" :disabled="!isReady" class="control-btn">
      템플릿 업데이트
    </button>
    <button @click="onDestroyViewer" :disabled="!isReady" class="control-btn">
      뷰어 제거
    </button>
  </div>
</template>

<script>
export default {
  name: "ViewerControls",
  props: {
    isReady: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    isLibraryLoaded: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["init", "updateTemplate", "destroyViewer"],
  setup(props, { emit }) {
    const onInit = () => emit("init");
    const onUpdateTemplate = () => emit("updateTemplate");
    const onDestroyViewer = () => emit("destroyViewer");

    return {
      onInit,
      onUpdateTemplate,
      onDestroyViewer,
    };
  },
};
</script>

<style scoped>
.controls {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 5px;
}

.controls h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
  font-size: 1.2rem;
}

.control-btn {
  margin: 5px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.control-btn:hover:not(:disabled) {
  background-color: #0056b3;
}

.control-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .controls {
    text-align: center;
  }
  
  .control-btn {
    display: block;
    width: 100%;
    margin: 5px 0;
  }
}
</style>
