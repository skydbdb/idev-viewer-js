import { Component, Input } from '@angular/core';
import { LoggerService } from '../../services/logger.service';

@Component({
    selector: 'app-viewer-logs',
    templateUrl: './viewer-logs.component.html',
    styleUrls: ['./viewer-logs.component.css']
})
export class ViewerLogsComponent {
    @Input() logs: string[] = [];
    @Input() status: string = '';

    constructor(private loggerService: LoggerService) { }

    onClearLogs() {
        this.loggerService.clearLogs();
    }
}
