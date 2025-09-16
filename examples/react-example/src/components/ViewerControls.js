import React from 'react';

const ViewerControls = ({
    isReady,
    isLoading,
    isLibraryLoaded,
    onInit,
    onUpdateTemplate,
    onDestroyViewer
}) => {
    return (
        <div className="controls">
            <h3>🎮 컨트롤</h3>
            <button onClick={onInit} disabled={isLoading || !isLibraryLoaded}>
                {isLoading ? '초기화 중...' :
                    !isLibraryLoaded ? '라이브러리 로드 대기...' : '초기화'}
            </button>
            <button onClick={onUpdateTemplate} disabled={!isReady}>
                템플릿 업데이트
            </button>
            <button onClick={onDestroyViewer} disabled={!isReady}>
                뷰어 제거
            </button>
        </div>
    );
};

export default ViewerControls;
