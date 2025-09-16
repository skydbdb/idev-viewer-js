import React from 'react';

const ViewerLogs = ({ logs, status }) => {
    return (
        <>
            <div className="status">
                상태: {status}
            </div>
            <div className="log">
                {logs.map((log, index) => (
                    <div key={index}>{log}</div>
                ))}
            </div>
        </>
    );
};

export default ViewerLogs;
