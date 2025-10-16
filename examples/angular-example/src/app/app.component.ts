import { Component, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { IdevViewerService } from './services/idev-viewer.service';
import { LoggerService } from './services/logger.service';
import { ViewerStateService } from './services/viewer-state.service';
import { environment } from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
    @ViewChild('viewerContainer', { static: false }) viewerContainer!: ElementRef;

    // 환경 설정을 템플릿에서 사용할 수 있도록 추가
    environment = environment;

    constructor(
        private idevViewerService: IdevViewerService,
        private loggerService: LoggerService,
        private viewerStateService: ViewerStateService
    ) { }

    get isReady() {
        return this.viewerStateService.isReadySubject.value;
    }

    get isLoading() {
        return this.viewerStateService.isLoadingSubject.value;
    }

    get status() {
        return this.viewerStateService.statusSubject.value;
    }

    get logs() {
        return this.loggerService.logsSubject.value;
    }

    get isLibraryLoaded() {
        return this.idevViewerService.isLibraryLoadedSubject.value;
    }

    async handleInitViewer() {
        if (this.isLoading) return;

        try {
            this.viewerStateService.setLoading(true);
            this.loggerService.addLog('🚀 뷰어 초기화 시작...');
            this.viewerStateService.updateStatus('라이브러리 확인 중...');

            // 라이브러리 로드 확인
            if (!this.isLibraryLoaded) {
                this.loggerService.addLog('⏳ IDev Viewer 라이브러리 로딩 중... 잠시 기다려주세요.');
                this.viewerStateService.updateStatus('라이브러리 로딩 중...');

                // 라이브러리가 로드될 때까지 최대 10초 대기
                let attempts = 0;
                const maxAttempts = 10;

                while (!this.isLibraryLoaded && attempts < maxAttempts) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    attempts++;
                    this.loggerService.addLog(`⏳ 라이브러리 로딩 대기 중... (${attempts}/${maxAttempts})`);
                }

                if (!this.isLibraryLoaded) {
                    throw new Error('IDev Viewer 라이브러리가 로드되지 않았습니다. 페이지를 새로고침해주세요.');
                }
            }

            this.loggerService.addLog('✅ IDev Viewer 라이브러리 확인 완료');
            this.viewerStateService.updateStatus('뷰어 초기화 중...');

            // 컨테이너 초기화
            if (this.viewerContainer) {
                this.viewerContainer.nativeElement.innerHTML = '';
                this.loggerService.addLog('🧹 컨테이너 초기화 완료');
            }

            // IDev Viewer 인스턴스 생성
            const viewer = this.idevViewerService.createViewer({
                width: '100%',
                height: '600px',
                idevAppPath: environment.idev.appPath,
                template: {
                    script: null,
                    templateId: 'test_template_initial',
                    templateNm: 'Test Template from Angular',
                    commitInfo: 'v1.0.0'
                },
                config: {
                    apiKey: environment.idev.apiKey,
                    theme: environment.idev.theme,
                    locale: environment.idev.locale
                },
                onReady: (data: any) => {
                    this.loggerService.addLog('✅ 뷰어 준비 완료!');
                    this.loggerService.addLog(`상태: ${data.status || 'ready'}`);
                    this.viewerStateService.updateStatus('뷰어 준비 완료');
                    this.viewerStateService.setReady(true);
                    this.viewerStateService.setLoading(false);
                },
                onError: (error: any) => {
                    this.loggerService.addLog(`❌ 에러 발생: ${error}`);

                    // API 키 관련 에러인지 확인
                    if (typeof error === 'string' && error.includes('API')) {
                        this.loggerService.addLog('🔑 API 키 인증 실패. 환경 설정을 확인해주세요.');
                        this.viewerStateService.updateStatus('API 키 인증 실패');
                    } else {
                        this.viewerStateService.updateStatus(`에러: ${error}`);
                    }

                    this.viewerStateService.setLoading(false);
                },
                onTemplateUpdated: (data: any) => {
                    this.loggerService.addLog(`📝 템플릿 업데이트: ${JSON.stringify(data)}`);
                },
            });

            this.loggerService.addLog('🔧 IDev Viewer 인스턴스 생성 완료');
            this.idevViewerService.mountViewer('#viewer-container');
            this.loggerService.addLog('✅ 뷰어 마운트 완료');

        } catch (error: any) {
            this.loggerService.addLog(`❌ 뷰어 초기화 실패: ${error.message}`);
            this.loggerService.addLog(`❌ 에러 상세: ${error.stack}`);

            // API 키 관련 에러인지 확인
            if (error.message && error.message.includes('API')) {
                this.loggerService.addLog('🔑 API 키 인증 실패. 환경 설정을 확인해주세요.');
                this.viewerStateService.updateStatus('API 키 인증 실패');
            } else {
                this.viewerStateService.updateStatus(`초기화 실패: ${error.message}`);
            }

            this.viewerStateService.setLoading(false);
        }
    }

    async handleUpdateTemplate() {
        if (!this.idevViewerService.isViewerReadyValue) {
            this.loggerService.addLog('❌ 뷰어가 초기화되지 않았습니다.');
            return;
        }

        try {
            this.loggerService.addLog('📄 템플릿 업데이트 시작');
            this.viewerStateService.setLoading(true);

            const response = await fetch('/assets/test-template.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const templateData = await response.json();
            this.loggerService.addLog('✅ 템플릿 데이터 로드 완료');

            const newTemplate = {
                script: JSON.stringify(templateData),
                templateId: 'test_template_updated',
                templateNm: 'Updated Test Template from Angular',
                commitInfo: 'v1.1.0'
            };

            this.loggerService.addLog('🔧 템플릿 객체 생성 완료');
            this.idevViewerService.updateTemplate(newTemplate);
            this.loggerService.addLog('✅ 템플릿 업데이트 요청 완료');

            this.viewerStateService.updateStatus('템플릿 업데이트 완료');
        } catch (error: any) {
            this.loggerService.addLog(`❌ 템플릿 업데이트 실패: ${error.message}`);

            // API 키 관련 에러인지 확인
            if (error.message && error.message.includes('API')) {
                this.loggerService.addLog('🔑 API 키 인증 실패. 환경 설정을 확인해주세요.');
                this.viewerStateService.updateStatus('API 키 인증 실패');
            } else {
                this.viewerStateService.updateStatus(`오류: ${error.message}`);
            }
        } finally {
            this.viewerStateService.setLoading(false);
        }
    }

    async handleDestroyViewer() {
        if (!this.idevViewerService.isViewerReadyValue) {
            this.loggerService.addLog('❌ 뷰어가 초기화되지 않았습니다.');
            return;
        }

        try {
            this.loggerService.addLog('🗑️ 뷰어 제거 시작');
            this.viewerStateService.setLoading(true);

            // 1. 먼저 DOM에서 제거
            if (this.viewerContainer) {
                this.viewerContainer.nativeElement.innerHTML = '';
            }

            // 2. 뷰어 인스턴스 제거
            this.idevViewerService.destroyViewer();

            this.loggerService.addLog('✅ 뷰어 제거 완료');
            this.viewerStateService.updateStatus('뷰어 제거됨');
            this.viewerStateService.setReady(false);

            // 3. 컨테이너 초기화 메시지 표시
            if (this.viewerContainer) {
                this.viewerContainer.nativeElement.innerHTML = '<div style="text-align: center; padding: 50px; color: #6c757d;"><h3>🔄 뷰어 초기화 대기 중...</h3><p>초기화 버튼을 클릭하여 IDev Viewer를 시작하세요.</p></div>';
            }
        } catch (error: any) {
            this.loggerService.addLog(`❌ 뷰어 제거 실패: ${error.message}`);
            this.viewerStateService.updateStatus(`오류: ${error.message}`);
        } finally {
            this.viewerStateService.setLoading(false);
        }
    }

    ngOnDestroy() {
        this.idevViewerService.destroyViewer();
    }
}
