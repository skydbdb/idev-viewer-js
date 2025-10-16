import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewerControlsComponent } from './components/viewer-controls/viewer-controls.component';
import { ViewerLogsComponent } from './components/viewer-logs/viewer-logs.component';

@NgModule({
    declarations: [
        AppComponent,
        ViewerControlsComponent,
        ViewerLogsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
