/**
 * IDev Viewer JavaScript Library
 * Flutter 앱을 iframe으로 임베드하여 사용할 수 있는 JavaScript 라이브러리
 */

class IdevViewer {
    constructor(options = {}) {
        // 기본 옵션 설정
        this.options = {
            width: '100%',
            height: '600px',
            template: null,
            config: {},
            onReady: null,
            onError: null,
            onStateUpdate: null,
            onTemplateUpdated: null,
            onConfigUpdated: null,
            onApiResponse: null,
            onStreamData: null,
            onItemTap: null,
            onItemEdit: null,
            autoCreateIframe: true,
            autoSetupMessageHandlers: true,
            idevAppPath: './idev-app/',
            ...options
        };

        this.iframe = null;
        this.isReady = false;
        this.messageQueue = new Map();
        this.messageHandlers = new Map();
        this.streamSubscriptions = new Map();
        this.apiCallbacks = new Map();
        this.requestId = 0;
        this.eventListeners = new Map();

        // 자동 설정
        if (this.options.autoSetupMessageHandlers) {
            this._setupMessageHandlers();
        }
        if (this.options.autoCreateIframe) {
            this._createIframe();
        }
    }

    /**
     * 메시지 핸들러 설정
     */
    _setupMessageHandlers() {
        this.messageHandlers.set('ready', (data) => {
            this.isReady = true;
            if (this.options.onReady) {
                this.options.onReady(data);
            }
            this._processMessageQueue();
        });

        this.messageHandlers.set('success', (data) => {
            console.log('Success:', data.message);
        });

        this.messageHandlers.set('error', (data) => {
            console.error('Error:', data.message);
            if (this.options.onError) {
                this.options.onError(data.message);
            }
        });

        this.messageHandlers.set('stream_data', (data) => {
            const { streamType, callbackId, data: streamData } = data;
            if (this.streamSubscriptions.has(callbackId)) {
                this.streamSubscriptions.get(callbackId)(streamData);
            }
            if (this.options.onStreamData) {
                this.options.onStreamData(streamType, streamData);
            }
        });

        this.messageHandlers.set('api_response', (data) => {
            if (this.options.onApiResponse) {
                this.options.onApiResponse(data);
            }
        });

        this.messageHandlers.set('item_tap', (data) => {
            if (this.options.onItemTap) {
                this.options.onItemTap(data);
            }
        });

        this.messageHandlers.set('item_edit', (data) => {
            if (this.options.onItemEdit) {
                this.options.onItemEdit(data);
            }
        });

        this.messageHandlers.set('json_menu_update', (data) => {
            if (this.options.onTemplateUpdated) {
                this.options.onTemplateUpdated(data);
            }
        });

        this.messageHandlers.set('api_menu_update', (data) => {
            if (this.options.onConfigUpdated) {
                this.options.onConfigUpdated(data);
            }
        });

        // Flutter 앱 관련 메시지
        this.messageHandlers.set('flutter-ready', (data) => {
            console.log('Flutter 앱 준비 완료:', data);
            this.isReady = true;
            this._processMessageQueue();
            if (this.options.onReady) {
                this.options.onReady(data);
            }
        });

        this.messageHandlers.set('flutter-error', (data) => {
            console.error('Flutter 앱 오류:', data);
            if (this.options.onError) {
                this.options.onError(data.error || 'Flutter 앱 오류 발생');
            }
        });
    }

    /**
     * iframe 생성
     */
    _createIframe() {
        const idevAppPath = this.options.idevAppPath || './idev-app/';

        this.iframe = document.createElement('iframe');
        this.iframe.src = idevAppPath;
        this.iframe.width = this.options.width;
        this.iframe.height = this.options.height;
        this.iframe.frameBorder = '0';
        this.iframe.style.border = 'none';
        this.iframe.style.borderRadius = '8px';
        this.iframe.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        this.iframe.allow = 'clipboard-write';
        this.iframe.title = 'IDev Viewer';

        this.iframe.onload = () => {
            console.log('iframe 로드 완료:', this.iframe.src);
            this._initializeViewer();
        };

        this.iframe.onerror = (error) => {
            console.error('iframe 로드 오류:', error);
        };

        // 메시지 리스너 등록
        window.addEventListener('message', (event) => {
            this._handleMessage(event);
        });
    }

    /**
     * 메시지 처리
     */
    _handleMessage(event) {
        try {
            let data;
            if (typeof event.data === 'string') {
                data = JSON.parse(event.data);
            } else if (typeof event.data === 'object') {
                data = event.data;
            } else {
                console.error('Invalid message data type:', typeof event.data);
                return;
            }

            if (!data.type) {
                console.warn('메시지 타입이 없습니다:', data);
                return;
            }

            const handler = this.messageHandlers.get(data.type);
            if (handler) {
                handler(data.data || data);
            } else {
                console.log('Unknown message type:', data.type, 'Data:', data);
            }
        } catch (error) {
            console.error('Failed to parse message:', error);
            console.error('Message data:', event.data);
            console.error('Message data type:', typeof event.data);
        }
    }

    /**
     * 뷰어 초기화
     */
    _initializeViewer() {
        if (this.options.template) {
            this.updateTemplate(this.options.template);
        }
        if (this.options.config) {
            this.updateConfig(this.options.config);
        }
    }

    /**
     * 메시지 전송
     */
    _sendMessage(type, data = {}) {
        const message = {
            type: type,
            ...data,
            timestamp: Date.now()
        };

        if (this.isReady && this.iframe?.contentWindow) {
            this.iframe.contentWindow.postMessage(JSON.stringify(message), '*');
        } else {
            this.messageQueue.set(message.timestamp, message);
        }
    }

    /**
     * 대기 중인 메시지 처리
     */
    _processMessageQueue() {
        while (this.messageQueue.size > 0) {
            const message = this.messageQueue.values().next().value;
            this.messageQueue.delete(message.timestamp);
            if (this.iframe?.contentWindow) {
                this.iframe.contentWindow.postMessage(JSON.stringify(message), '*');
            }
        }
    }

    /**
     * 템플릿 업데이트
     */
    updateTemplate(template) {
        this._sendMessage('update_template', { template });
    }

    /**
     * 설정 업데이트
     */
    updateConfig(config) {
        this._sendMessage('update_config', { config });
    }

    /**
     * API 요청
     */
    requestApi(method, apiId, params = {}, options = {}) {
        const requestId = ++this.requestId;

        return new Promise((resolve, reject) => {
            this.apiCallbacks.set(requestId, { resolve, reject });

            this._sendMessage('api_request', {
                method,
                apiId,
                params,
                requestId,
                ...options
            });

            // 타임아웃 설정
            setTimeout(() => {
                if (this.apiCallbacks.has(requestId)) {
                    this.apiCallbacks.delete(requestId);
                    reject(new Error('API request timeout'));
                }
            }, options.timeout || 30000);
        });
    }

    /**
     * 스트림 구독
     */
    subscribeToStream(streamType, callback) {
        const callbackId = `stream_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.streamSubscriptions.set(callbackId, callback);

        this._sendMessage('subscribe_stream', {
            streamType,
            callbackId
        });

        return callbackId;
    }

    /**
     * 스트림 구독 해제
     */
    unsubscribeFromStream(callbackId) {
        this.streamSubscriptions.delete(callbackId);
        this._sendMessage('unsubscribe_stream', {
            callbackId
        });
    }

    /**
     * 이벤트 리스너 추가
     */
    addEventListener(event, callback) {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, []);
        }
        this.eventListeners.get(event).push(callback);
    }

    /**
     * 이벤트 리스너 제거
     */
    removeEventListener(event, callback) {
        if (this.eventListeners.has(event)) {
            const callbacks = this.eventListeners.get(event);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }

    }

    /**
     * 상태 조회
     */
    getState() {
        this._sendMessage('get_state');
    }

    /**
     * 크기 조정
     */
    resize(width, height) {
        this._sendMessage('resize', { width, height });
        if (this.iframe) {
            this.iframe.width = width;
            this.iframe.height = height;
        }
    }

    /**
     * 뷰어 파괴
     */
    destroy() {
        if (this.iframe && this.iframe.parentNode) {
            this.iframe.parentNode.removeChild(this.iframe);
        }
        this.iframe = null;
        this.isReady = false;
        this.streamSubscriptions.clear();
        this.apiCallbacks.clear();
        this.eventListeners.clear();
    }

    /**
     * iframe 수동 생성
     */
    createIframe() {
        if (this.iframe) {
            console.warn('Iframe already exists');
            return;
        }
        this._createIframe();
    }

    /**
     * 메시지 핸들러 수동 설정
     */
    setupMessageHandlers() {
        if (this.messageHandlers.size > 0) {
            console.warn('Message handlers already set up');
            return;
        }
        this._setupMessageHandlers();
    }

    /**
     * iframe 존재 여부 확인
     */
    hasIframe() {
        return this.iframe !== null;
    }

    /**
     * iframe 제거
     */
    removeIframe() {
        if (this.iframe && this.iframe.parentNode) {
            this.iframe.parentNode.removeChild(this.iframe);
        }
        this.iframe = null;
        this.isReady = false;
    }

    /**
     * 컨테이너에 마운트
     */
    mount(container) {
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }

        if (!container) {
            throw new Error('Container not found');
        }

        if (!this.iframe) {
            this._createIframe();
        }

        container.appendChild(this.iframe);
    }

    /**
     * HTML 반환
     */
    getHTML() {
        return this.iframe.outerHTML;
    }

    /**
     * 버전 정보
     */
    static getVersion() {
        return '1.0.0';
    }

    /**
     * 지원 여부 확인
     */
    static isSupported() {
        return typeof window !== 'undefined' && window.postMessage;
    }
}

// 브라우저 환경에서 전역 객체로 등록
if (typeof window !== 'undefined') {
    window.IdevViewer = IdevViewer;
}

// 모듈 시스템 지원
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IdevViewer;
}

// AMD 지원
if (typeof define === 'function' && define.amd) {
    define([], function () {
        return IdevViewer;
    });
}
export default IdevViewer;

