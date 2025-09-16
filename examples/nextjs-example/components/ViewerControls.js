import styles from '../styles/ViewerControls.module.css';

export default function ViewerControls({
    viewer,
    isInitialized,
    onInitialize,
    onDestroy,
    onUpdateTemplate
}) {
    const handleInitialize = () => {
        if (viewer) {
            console.warn('⚠️ 뷰어가 이미 초기화되었습니다. 먼저 제거하세요.');
            return;
        }
        onInitialize();
    };

    const handleDestroy = () => {
        if (viewer) {
            onDestroy();
        } else {
            console.warn('⚠️ 뷰어가 초기화되지 않았습니다.');
        }
    };

    const handleUpdateTemplate = async () => {
        if (!viewer) {
            console.warn('⚠️ 뷰어가 초기화되지 않았습니다.');
            return;
        }

        try {
            // test-template.json 파일을 로드
            const response = await fetch('/test-template.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const templateData = await response.json();

            const newTemplate = {
                script: JSON.stringify(templateData),
                templateId: 'test_template_nextjs',
                templateNm: 'Updated Template from Next.js (test-template.json)',
                commitInfo: 'v1.0.0'
            };
            onUpdateTemplate(newTemplate);
        } catch (error) {
            console.error('❌ 템플릿 로드 실패:', error);
            // 폴백으로 기본 템플릿 사용
            const newTemplate = {
                script: JSON.stringify({ message: 'Hello from Next.js!' }),
                templateId: 'test_template_nextjs',
                templateNm: 'Updated Template from Next.js (fallback)',
                commitInfo: 'v1.0.0'
            };
            onUpdateTemplate(newTemplate);
        }
    };

    return (
        <div className={styles.controls}>
            <div className={styles.buttonGroup}>
                <button
                    className={`${styles.button} ${styles.primary}`}
                    onClick={handleInitialize}
                    disabled={isInitialized}
                >
                    뷰어 초기화
                </button>

                <button
                    className={`${styles.button} ${styles.secondary}`}
                    onClick={handleUpdateTemplate}
                    disabled={!isInitialized}
                >
                    템플릿 업데이트
                </button>

                <button
                    className={`${styles.button} ${styles.danger}`}
                    onClick={handleDestroy}
                    disabled={!isInitialized}
                >
                    뷰어 제거
                </button>
            </div>
        </div>
    );
}
