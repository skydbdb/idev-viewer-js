import { useState, useEffect } from 'react';
import Head from 'next/head';
import ViewerControls from '../components/ViewerControls';
import ViewerLogs from '../components/ViewerLogs';
import { useIdevViewer } from '../hooks/useIdevViewer';
import styles from '../styles/Home.module.css';

export default function Home() {
    const [logs, setLogs] = useState([]);
    const [isInitialized, setIsInitialized] = useState(false);

    const {
        viewer,
        initializeViewer,
        destroyViewer,
        updateTemplate
    } = useIdevViewer({
        onReady: (data) => {
            addLog('✅ 뷰어 준비 완료!');
            addLog(`상태: ${data.status || 'ready'}`);
            setIsInitialized(true);
        },
        onError: (error) => {
            addLog(`❌ 에러 발생: ${error}`);
        },
        onTemplateUpdated: (data) => {
            addLog(`📝 템플릿 업데이트: ${JSON.stringify(data)}`);
        },
        onConfigUpdated: (data) => {
            addLog(`⚙️ 설정 업데이트: ${JSON.stringify(data)}`);
        },
        onApiResponse: (data) => {
            addLog(`📡 API 응답: ${JSON.stringify(data)}`);
        },
        onStreamData: (streamType, data) => {
            addLog(`🌊 스트림 데이터 (${streamType}): ${JSON.stringify(data)}`);
        },
        onItemTap: (data) => {
            addLog(`👆 아이템 탭: ${JSON.stringify(data)}`);
        },
        onItemEdit: (data) => {
            addLog(`✍️ 아이템 편집: ${JSON.stringify(data)}`);
        },
    });

    const addLog = (message) => {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = `[${timestamp}] ${message}`;
        setLogs(prev => [logEntry, ...prev.slice(0, 49)]); // 최대 50개 로그 유지
    };

    const clearLogs = () => {
        setLogs([]);
    };

    // 컴포넌트 마운트 시 라이브러리 로드 확인
    useEffect(() => {
        addLog('🌐 페이지 로드 완료');
        if (typeof window !== 'undefined' && window.IdevViewer) {
            addLog('✅ IDev Viewer 라이브러리 로드 확인됨');
            addLog(`버전: ${window.IdevViewer.getVersion()}`);
        } else {
            addLog('❌ IDev Viewer 라이브러리 로드 실패');
        }
    }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>IDev Viewer Next.js Example</title>
                <meta name="description" content="Flutter Web 앱을 Next.js에서 iframe으로 렌더링하는 예제" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    🚀 IDev Viewer Next.js Example
                </h1>

                <p className={styles.description}>
                    Flutter Web 앱을 Next.js에서 iframe으로 렌더링하는 테스트 페이지입니다.
                </p>

                <div className={styles.infoPanel}>
                    <h3>📋 테스트 정보</h3>
                    <ul>
                        <li><strong>프레임워크:</strong> Next.js 14</li>
                        <li><strong>IDev 앱 경로:</strong> <code>./idev-app/</code></li>
                        <li><strong>라이브러리:</strong> <code>./idev-viewer.js</code></li>
                        <li><strong>템플릿:</strong> <code>test-template.json</code></li>
                    </ul>
                </div>

                <ViewerControls
                    viewer={viewer}
                    isInitialized={isInitialized}
                    onInitialize={initializeViewer}
                    onDestroy={destroyViewer}
                    onUpdateTemplate={updateTemplate}
                />

                <div className={styles.viewerContainer} id="viewer-container">
                    {!isInitialized && (
                        <div className={styles.placeholder}>
                            <h3>🔄 뷰어 초기화 대기 중...</h3>
                            <p>초기화 버튼을 클릭하여 IDev Viewer를 시작하세요.</p>
                        </div>
                    )}
                </div>

                <ViewerLogs logs={logs} />
            </main>
        </div>
    );
}
