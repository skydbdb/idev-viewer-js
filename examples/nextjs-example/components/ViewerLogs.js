import styles from '../styles/ViewerLogs.module.css';

export default function ViewerLogs({ logs }) {
    return (
        <div className={styles.logPanel}>
            <h3>📋 뷰어 로그</h3>
            <div className={styles.logContainer}>
                {logs.length === 0 ? (
                    <p className={styles.emptyLog}>로그가 여기에 표시됩니다...</p>
                ) : (
                    logs.map((log, index) => (
                        <p key={index} className={styles.logEntry}>
                            {log}
                        </p>
                    ))
                )}
            </div>
        </div>
    );
}
