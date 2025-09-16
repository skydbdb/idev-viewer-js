<template>
  <div id="app">
    <div class="container">
      <h1>🚀 IDev Viewer Vue Example</h1>
      <p>Flutter Web 앱을 iframe으로 렌더링하는 Vue 테스트 페이지입니다.</p>

      <div class="info-panel">
        <h3>📋 테스트 정보</h3>
        <ul>
          <li><strong>IDev 앱 경로:</strong> <code>../../idev-app/</code></li>
          <li><strong>라이브러리:</strong> <code>/idev-viewer.js</code></li>
          <li><strong>템플릿:</strong> <code>/test-template.json</code></li>
          <li><strong>라이브러리 상태:</strong>
            <span v-if="isLibraryLoaded" style="color: green">✅ 로드됨</span>
            <span v-else style="color: red">❌ 로드되지 않음</span>
          </li>
        </ul>
      </div>

      <ViewerControls
        :isReady="isReady"
        :isLoading="isLoading"
        :isLibraryLoaded="isLibraryLoaded"
        @init="handleInitViewer"
        @updateTemplate="handleUpdateTemplate"
        @destroyViewer="handleDestroyViewer"
      />

      <div class="viewer-container" ref="containerRef" id="viewer-container">
        <div style="text-align: center; padding: 50px; color: #6c757d;">
          <h3>🔄 뷰어 초기화 대기 중...</h3>
          <p>초기화 버튼을 클릭하여 IDev Viewer를 시작하세요.</p>
        </div>
      </div>

      <ViewerLogs :logs="logs" :status="status" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";

// 컴포넌트들
import ViewerControls from "./components/ViewerControls.vue";
import ViewerLogs from "./components/ViewerLogs.vue";

// 컴포지션 API 훅들
import { useIdevViewer } from "./composables/useIdevViewer";
import { useLogger } from "./composables/useLogger";
import { useViewerState } from "./composables/useViewerState";

export default {
  name: "App",
  components: {
    ViewerControls,
    ViewerLogs,
  },
  setup() {
    const containerRef = ref(null);

    // 컴포지션 API 훅들 사용
    const { logs, addLog, clearLogs } = useLogger();
    const {
      isReady,
      isLoading,
      status,
      setReady,
      setLoading,
      updateStatus,
      resetState,
    } = useViewerState();
    const {
      viewer,
      isViewerReady,
      isLibraryLoaded,
      createViewer,
      destroyViewer,
      mountViewer,
      updateTemplate: updateViewerTemplate,
    } = useIdevViewer();

    // 뷰어 초기화
    const handleInitViewer = async () => {
      if (isLoading.value) return;

      try {
        setLoading(true);
        addLog("🚀 뷰어 초기화 시작...");
        updateStatus("뷰어 초기화 중...");

        // 컨테이너 초기화
        if (containerRef.value) {
          containerRef.value.innerHTML = "";
          addLog("🧹 컨테이너 초기화 완료");
        }

        // IDev Viewer 인스턴스 생성
        const viewer = createViewer({
          width: "100%",
          height: "600px",
          idevAppPath: "./idev-app/",
          template: {
            script: null,
            templateId: "test_template_initial",
            templateNm: "Test Template from Vue",
            commitInfo: "v1.0.0",
          },
          config: {
            apiKey: "7e074a90e6128deeab38d98765e82abe39ec87449f077d7ec85f328357f96b50",
            theme: "dark",
            locale: "ko",
          },
          onReady: (data) => {
            addLog("✅ 뷰어 준비 완료!");
            addLog(`상태: ${data.status || "ready"}`);
            updateStatus("뷰어 준비 완료");
            setReady(true);
            setLoading(false);
          },
          onError: (error) => {
            addLog(`❌ 에러 발생: ${error}`);
            updateStatus(`에러: ${error}`);
            setLoading(false);
          },
          onTemplateUpdated: (data) => {
            addLog(`📝 템플릿 업데이트: ${JSON.stringify(data)}`);
          },
        });

        addLog("🔧 IDev Viewer 인스턴스 생성 완료");
        mountViewer("#viewer-container");
        addLog("✅ 뷰어 마운트 완료");

      } catch (error) {
        addLog(`❌ 뷰어 초기화 실패: ${error.message}`);
        addLog(`❌ 에러 상세: ${error.stack}`);
        updateStatus(`초기화 실패: ${error.message}`);
        setLoading(false);
      }
    };

    // 템플릿 업데이트
    const handleUpdateTemplate = async () => {
      if (!isViewerReady.value) {
        addLog("❌ 뷰어가 초기화되지 않았습니다.");
        return;
      }

      try {
        addLog("📄 템플릿 업데이트 시작");
        setLoading(true);

        const response = await fetch("/test-template.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const templateData = await response.json();
        addLog("✅ 템플릿 데이터 로드 완료");

        const newTemplate = {
          script: JSON.stringify(templateData),
          templateId: "test_template_updated",
          templateNm: "Updated Test Template from Vue",
          commitInfo: "v1.1.0",
        };

        addLog("🔧 템플릿 객체 생성 완료");
        
        if (viewer.value) {
          try {
            viewer.value.updateTemplate(newTemplate);
            addLog("✅ 템플릿 업데이트 성공");
          } catch (error) {
            updateViewerTemplate(newTemplate);
            addLog("✅ 템플릿 업데이트 성공 (훅 사용)");
          }
        } else {
          throw new Error("뷰어 인스턴스가 초기화되지 않았습니다");
        }

        updateStatus("템플릿 업데이트 완료");
      } catch (error) {
        addLog(`❌ 템플릿 업데이트 실패: ${error.message}`);
        updateStatus(`오류: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    // 뷰어 제거
    const handleDestroyViewer = async () => {
      if (!isViewerReady.value) {
        addLog("❌ 뷰어가 초기화되지 않았습니다.");
        return;
      }

      try {
        addLog("🗑️ 뷰어 제거 시작");
        setLoading(true);

        destroyViewer();
        addLog("✅ 뷰어 제거 완료");
        updateStatus("뷰어 제거됨");
        setReady(false);

        // 컨테이너 초기화
        if (containerRef.value) {
          containerRef.value.innerHTML =
            '<div style="text-align: center; padding: 50px; color: #6c757d;"><h3>🔄 뷰어 초기화 대기 중...</h3><p>초기화 버튼을 클릭하여 IDev Viewer를 시작하세요.</p></div>';
        }
      } catch (error) {
        addLog(`❌ 뷰어 제거 실패: ${error.message}`);
        updateStatus(`오류: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    // 컴포넌트 언마운트 시 정리
    onUnmounted(() => {
      destroyViewer();
    });

    return {
      containerRef,
      logs,
      isReady,
      isLoading,
      status,
      isLibraryLoaded,
      handleInitViewer,
      handleUpdateTemplate,
      handleDestroyViewer,
    };
  },
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
  background-color: #f5f5f5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.info-panel {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #e3f2fd;
  border-radius: 5px;
  border-left: 4px solid #2196f3;
}

.info-panel h3 {
  margin-top: 0;
  color: #1976d2;
}

.info-panel ul {
  margin: 10px 0;
  padding-left: 20px;
}

.info-panel li {
  margin-bottom: 5px;
}

.info-panel code {
  background-color: #f5f5f5;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: monospace;
}

.viewer-container {
  border: 2px dashed #dee2e6;
  border-radius: 8px;
  min-height: 600px;
  position: relative;
  background-color: #f8f9fa;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .container {
    padding: 15px;
  }
}
</style>
