import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class IdevViewerService {
    private viewer: any = null;
    private streamCallbackId: any = null;
    public isLibraryLoadedSubject = new BehaviorSubject<boolean>(false);
    public isViewerReadySubject = new BehaviorSubject<boolean>(false);

    public isLibraryLoaded = this.isLibraryLoadedSubject.asObservable();
    public isViewerReady = this.isViewerReadySubject.asObservable();

    private intervalId: any = null;

    constructor() {
        this.loadScript();
        this.checkLibrary();
        // 주기적으로 라이브러리 확인 (라이브러리가 로드되면 인터벌 정리)
        this.intervalId = setInterval(() => {
            if (this.checkLibrary()) {
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                    this.intervalId = null;
                }
            }
        }, 1000);
    }

    private loadScript() {
        if (typeof document !== 'undefined') {
            const script = document.createElement('script');
            script.src = '/assets/idev-viewer.js';
            script.async = true;
            script.onload = () => {
                console.log('✅ IDev Viewer 스크립트 로드 완료');
                this.checkLibrary();
            };
            script.onerror = () => {
                console.error('❌ IDev Viewer 스크립트 로드 실패');
            };
            document.head.appendChild(script);
        }
    }

    private checkLibrary(): boolean {
        if (typeof window !== 'undefined' && typeof (window as any).IdevViewer !== 'undefined') {
            this.isLibraryLoadedSubject.next(true);
            console.log('✅ IDev Viewer 라이브러리 로드됨');
            return true;
        } else {
            this.isLibraryLoadedSubject.next(false);
            console.log('⏳ IDev Viewer 라이브러리 로딩 중...');
            return false;
        }
    }

    get isLibraryLoadedValue(): boolean {
        return this.isLibraryLoadedSubject.value;
    }

    get isViewerReadyValue(): boolean {
        return this.isViewerReadySubject.value;
    }

    /**
     * API 키 유효성 검증
     */
    private validateApiKey(apiKey: string): boolean {
        if (!apiKey || typeof apiKey !== 'string') {
            console.error('❌ API 키가 제공되지 않았습니다.');
            return false;
        }

        if (apiKey.length < 32) {
            console.error('❌ API 키가 너무 짧습니다. 최소 32자 이상이어야 합니다.');
            return false;
        }

        // 환경 변수와 일치하는지 확인
        if (apiKey !== environment.idev.apiKey) {
            console.warn('⚠️ API 키가 환경 설정과 일치하지 않습니다. 개발 환경에서는 무시됩니다.');
            if (environment.production) {
                console.error('❌ 프로덕션 환경에서는 유효한 API 키가 필요합니다.');
                return false;
            }
        }

        console.log('✅ API 키 검증 완료');
        return true;
    }

    /**
     * 기본 설정 가져오기
     */
    private getDefaultConfig(): any {
        return {
            apiKey: environment.idev.apiKey,
            theme: environment.idev.theme,
            locale: environment.idev.locale
        };
    }

    createViewer(options: any) {
        if (!this.isLibraryLoadedValue) {
            throw new Error('IDev Viewer 라이브러리가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.');
        }

        if (typeof (window as any).IdevViewer === 'undefined') {
            throw new Error('IDev Viewer 라이브러리가 로드되지 않았습니다.');
        }

        // API 키 검증
        const config = options.config || {};
        const apiKey = config.apiKey || this.getDefaultConfig().apiKey;

        if (!this.validateApiKey(apiKey)) {
            throw new Error('유효하지 않은 API 키입니다. 환경 설정을 확인해주세요.');
        }

        // 기존 뷰어 제거
        if (this.viewer) {
            try {
                this.viewer.destroy();
            } catch (error) {
                console.error('기존 뷰어 제거 실패:', error);
            }
            this.viewer = null;
        }

        // 기본 설정과 병합
        const defaultConfig = this.getDefaultConfig();
        const mergedOptions = {
            ...options,
            idevAppPath: options.idevAppPath || environment.idev.appPath,
            config: {
                ...defaultConfig,
                ...config
            }
        };

        // 새 뷰어 생성
        this.viewer = new (window as any).IdevViewer(mergedOptions);
        this.isViewerReadySubject.next(true);
        return this.viewer;
    }

    destroyViewer() {
        if (this.viewer) {
            try {
                console.log('🗑️ 뷰어 제거 시작');

                // 1. 먼저 DOM에서 제거
                const container = document.getElementById('viewer-container');
                if (container) {
                    container.innerHTML = '';
                }

                // 2. 뷰어 인스턴스 제거
                this.viewer.destroy();

                // 3. 참조 초기화
                this.viewer = null;
                this.streamCallbackId = null;
                this.isViewerReadySubject.next(false);

                console.log('✅ 뷰어 제거 완료');
            } catch (error) {
                console.error('뷰어 제거 실패:', error);
            }
        }
    }

    mountViewer(containerSelector: string) {
        if (!this.viewer) {
            throw new Error('뷰어가 초기화되지 않았습니다.');
        }
        this.viewer.mount(containerSelector);
    }

    updateTemplate(template: any) {
        if (!this.viewer) {
            throw new Error('뷰어가 초기화되지 않았습니다.');
        }
        this.viewer.updateTemplate(template);
    }

    updateConfig(config: any) {
        if (!this.viewer) {
            throw new Error('뷰어가 초기화되지 않았습니다.');
        }
        this.viewer.updateConfig(config);
    }

    requestApi(method: string, endpoint: string, data?: any, options?: any) {
        if (!this.viewer) {
            throw new Error('뷰어가 초기화되지 않았습니다.');
        }
        return this.viewer.requestApi(method, endpoint, data, options);
    }

    subscribeToStream(streamType: string, callback: Function) {
        if (!this.viewer) {
            throw new Error('뷰어가 초기화되지 않았습니다.');
        }

        if (this.streamCallbackId) {
            throw new Error('이미 스트림을 구독 중입니다.');
        }

        this.streamCallbackId = this.viewer.subscribeToStream(streamType, callback);
        return this.streamCallbackId;
    }

    resizeViewer(width: string, height: string) {
        if (!this.viewer) {
            throw new Error('뷰어가 초기화되지 않았습니다.');
        }
        this.viewer.resize(width, height);
    }

    getState() {
        if (!this.viewer) {
            throw new Error('뷰어가 초기화되지 않았습니다.');
        }
        this.viewer.getState();
    }
}
