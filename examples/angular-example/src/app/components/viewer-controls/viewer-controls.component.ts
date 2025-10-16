import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-viewer-controls',
    templateUrl: './viewer-controls.component.html',
    styleUrls: ['./viewer-controls.component.css']
})
export class ViewerControlsComponent {
    @Input() isReady: boolean = false;
    @Input() isLoading: boolean = false;
    @Input() isLibraryLoaded: boolean = false;

    @Output() init = new EventEmitter<void>();
    @Output() updateTemplate = new EventEmitter<void>();
    @Output() destroyViewer = new EventEmitter<void>();

    onInit() {
        this.init.emit();
    }

    onUpdateTemplate() {
        this.updateTemplate.emit();
    }

    onDestroyViewer() {
        this.destroyViewer.emit();
    }
}
