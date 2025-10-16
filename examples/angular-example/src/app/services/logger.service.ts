import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoggerService {
    public logsSubject = new BehaviorSubject<string[]>([]);
    public logs = this.logsSubject.asObservable();

    addLog(message: string) {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = `[${timestamp}] ${message}`;

        const currentLogs = this.logsSubject.value;
        this.logsSubject.next([...currentLogs, logEntry]);
    }

    clearLogs() {
        this.logsSubject.next([]);
    }
}
