import React, { useRef, useEffect, useCallback } from 'react';
import './App.css';

// 커스텀 훅들
import { useIdevViewer } from './hooks/useIdevViewer';
import { useLogger } from './hooks/useLogger';
import { useViewerState } from './hooks/useViewerState';

// 컴포넌트들
import ViewerControls from './components/ViewerControls';
import ViewerLogs from './components/ViewerLogs';

const App = () => {
    const containerRef = useRef(null);

    // 커스텀 훅들 사용
    const { logs, addLog, clearLogs } = useLogger();
    const { isReady, isLoading, status, setReady, setLoading, updateStatus, resetState } = useViewerState();
    const {
        isViewerReady,
        isLibraryLoaded,
        createViewer,
        destroyViewer,
        mountViewer,
        updateTemplate: updateViewerTemplate,
    } = useIdevViewer();

    // 컴포넌트 언마운트 시 정리
    useEffect(() => {
        return () => {
            destroyViewer();
        };
    }, [destroyViewer]);

    // 뷰어 초기화
    const handleInitViewer = useCallback(async () => {
        if (isLoading) return;

        try {
            setLoading(true);
            addLog('🚀 뷰어 초기화 시작...');
            updateStatus('뷰어 초기화 중...');

            // 컨테이너 초기화
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
                addLog('🧹 컨테이너 초기화 완료');
            }

            // IDev Viewer 인스턴스 생성
            const viewer = createViewer({
                width: '100%',
                height: '600px',
                idevAppPath: './idev-app/',

                template: {
                    script: null,
                    templateId: 'test_template_initial',
                    templateNm: 'Test Template from React',
                    commitInfo: 'v1.0.0'
                },
                config: {
                    apiKey: '7e074a90e6128deeab38d98765e82abe39ec87449f077d7ec85f328357f96b50',
                    theme: 'dark',
                    locale: 'ko'
                },
                onReady: (data) => {
                    addLog('✅ 뷰어 준비 완료!');
                    addLog(`상태: ${data.status || 'ready'}`);
                    updateStatus('뷰어 준비 완료');
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

            addLog('🔧 IDev Viewer 인스턴스 생성 완료');
            mountViewer('#viewer-container');
            addLog('✅ 뷰어 마운트 완료');

        } catch (error) {
            addLog(`❌ 뷰어 초기화 실패: ${error.message}`);
            addLog(`❌ 에러 상세: ${error.stack}`);
            updateStatus(`초기화 실패: ${error.message}`);
            setLoading(false);
        }
    }, [isLoading, setLoading, addLog, updateStatus, setReady, createViewer, mountViewer]);

    // 템플릿 업데이트
    const handleUpdateTemplate = async () => {
        if (!isViewerReady) {
            addLog('❌ 뷰어가 초기화되지 않았습니다.');
            return;
        }

        try {
            addLog('📄 템플릿 업데이트 시작');
            setLoading(true);

            // vanilla 예제와 동일한 방식으로 템플릿 로드
            const response = await fetch('/test-template.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const templateData = await response.json();
            addLog('✅ 템플릿 데이터 로드 완료');

            // vanilla 예제와 동일한 템플릿 객체 생성
            const newTemplate = {
                script: JSON.stringify(templateData),
                templateId: 'test_template_updated',
                templateNm: 'Updated Test Template from React',
                commitInfo: 'v1.1.0'
            };

            addLog('🔧 템플릿 객체 생성 완료');
            updateViewerTemplate(newTemplate);
            addLog('✅ 템플릿 업데이트 요청 완료');

            updateStatus('템플릿 업데이트 완료');
        } catch (error) {
            addLog(`❌ 템플릿 업데이트 실패: ${error.message}`);
            updateStatus(`오류: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // 뷰어 제거
    const handleDestroyViewer = async () => {
        if (!isViewerReady) {
            addLog('❌ 뷰어가 초기화되지 않았습니다.');
            return;
        }

        try {
            addLog('🗑️ 뷰어 제거 시작');
            setLoading(true);

            destroyViewer();
            addLog('✅ 뷰어 제거 완료');
            updateStatus('뷰어 제거됨');
            setReady(false);

            // 컨테이너 초기화
            if (containerRef.current) {
                containerRef.current.innerHTML = '<div style="text-align: center; padding: 50px; color: #6c757d;"><h3>🔄 뷰어 초기화 대기 중...</h3><p>초기화 버튼을 클릭하여 IDev Viewer를 시작하세요.</p></div>';
            }
        } catch (error) {
            addLog(`❌ 뷰어 제거 실패: ${error.message}`);
            updateStatus(`오류: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <div className="container">
                <h1>🚀 IDev Viewer React Example</h1>
                <p>Flutter Web 앱을 iframe으로 렌더링하는 React 테스트 페이지입니다.</p>

                <div className="info-panel">
                    <h3>📋 테스트 정보</h3>
                    <ul>
                        <li><strong>IDev 앱 경로:</strong> <code>../../idev-app/</code></li>
                        <li><strong>라이브러리:</strong> <code>/idev-viewer.js</code></li>
                        <li><strong>템플릿:</strong> <code>/test-template.json</code></li>
                        <li><strong>라이브러리 상태:</strong>
                            {isLibraryLoaded ?
                                <span style={{ color: 'green' }}>✅ 로드됨</span> :
                                <span style={{ color: 'red' }}>❌ 로드되지 않음</span>
                            }
                        </li>
                    </ul>
                </div>

                <ViewerControls
                    isReady={isReady}
                    isLoading={isLoading}
                    isLibraryLoaded={isLibraryLoaded}
                    onInit={handleInitViewer}
                    onUpdateTemplate={handleUpdateTemplate}
                    onDestroyViewer={handleDestroyViewer}
                />

                <div className="viewer-container" ref={containerRef} id="viewer-container">
                    <div style={{ textAlign: 'center', padding: '50px', color: '#6c757d' }}>
                        <h3>🔄 뷰어 초기화 대기 중...</h3>
                        <p>초기화 버튼을 클릭하여 IDev Viewer를 시작하세요.</p>
                    </div>
                </div>

                <ViewerLogs logs={logs} status={status} />
            </div>
        </div>
    );
};

export default App;
