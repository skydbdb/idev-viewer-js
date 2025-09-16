<template>
  <div class="logs-section">
    <div class="status">상태: {{ status }}</div>
    <div class="log">
      <div v-for="(log, index) in logs" :key="index" class="log-item">
        {{ log }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewerLogs",
  props: {
    logs: {
      type: Array,
      default: () => [],
    },
    status: {
      type: String,
      default: "초기화 대기 중",
    },
  },
};
</script>

<style scoped>
.logs-section {
  margin-top: 2rem;
}

.status {
  background: #e9ecef;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-weight: 600;
  color: #495057;
  text-align: center;
}

.log {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 1rem;
  max-height: 300px;
  overflow-y: auto;
  font-family: "Courier New", monospace;
  font-size: 0.9rem;
}

.log-item {
  padding: 0.25rem 0;
  border-bottom: 1px solid #e9ecef;
  color: #495057;
}

.log-item:last-child {
  border-bottom: none;
}

.log-item:hover {
  background: #e9ecef;
  border-radius: 4px;
  padding-left: 0.5rem;
  transition: all 0.2s ease;
}
</style>
