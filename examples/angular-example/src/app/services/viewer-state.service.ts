import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ViewerStateService {
    public isReadySubject = new BehaviorSubject<boolean>(false);
    public isLoadingSubject = new BehaviorSubject<boolean>(false);
    public statusSubject = new BehaviorSubject<string>('대기 중...');

    public isReady = this.isReadySubject.asObservable();
    public isLoading = this.isLoadingSubject.asObservable();
    public status = this.statusSubject.asObservable();

    setReady(ready: boolean) {
        this.isReadySubject.next(ready);
    }

    setLoading(loading: boolean) {
        this.isLoadingSubject.next(loading);
    }

    updateStatus(newStatus: string) {
        this.statusSubject.next(newStatus);
    }

    resetState() {
        this.isReadySubject.next(false);
        this.isLoadingSubject.next(false);
        this.statusSubject.next('대기 중...');
    }
}
