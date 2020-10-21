import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppTopBarComponent } from './app.topbar.component';
import { AppBreadcrumbComponent } from './app.breadcrumb.component';
import { AppProfileComponent } from './app.profile.component';
import { BreadcrumbService } from './breadcrumb.service';
import { AppFooterComponent } from './app.footer.component';
import { AppMenuComponent, AppSubMenuComponent } from './app.menu.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MessageService } from 'primeng/components/common/api';

import { HttpClientModule } from '@angular/common/http';

import { DeviceDetectorService } from 'ngx-device-detector';
import { SwUpdate, ServiceWorkerModule } from '@angular/service-worker';

import { SocketIoModule } from 'ngx-socket-io';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule, 
                RouterTestingModule, 
                ScrollPanelModule, 
                AccordionModule, 
                PanelModule, 
                ToastModule, 
                DialogModule, 
                FormsModule, 
                ReactiveFormsModule, 
                PerfectScrollbarModule, 
                ConfirmDialogModule, 
                SocketIoModule,
                HttpClientModule, 
            ],
            declarations: [
                AppComponent,
                AppTopBarComponent,
                AppMenuComponent,
                AppSubMenuComponent,
                AppProfileComponent,
                AppFooterComponent,
                AppBreadcrumbComponent
            ],
            providers: [BreadcrumbService, MessageService, DeviceDetectorService, SwUpdate, ServiceWorkerModule]
        }).compileComponents();
    }));
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
