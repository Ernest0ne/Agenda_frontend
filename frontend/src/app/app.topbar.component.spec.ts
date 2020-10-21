import { TestBed, async } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppMenuComponent, AppSubMenuComponent } from './app.menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RoleService } from 'src/app/demo/Services/role.service';
import { AppProfileComponent } from './app.profile.component';

import { SocketIoModule } from 'ngx-socket-io';

import { SwiperModule } from 'ngx-swiper-wrapper';


describe('AppTopBarComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                ScrollPanelModule,
                AccordionModule,
                PanelModule,
                ToastModule,
                DialogModule,
                ConfirmDialogModule,
                PerfectScrollbarModule,
                RouterTestingModule,
                SwiperModule, 
                SocketIoModule
            ],
            declarations: [
                AppTopBarComponent,
                AppMenuComponent,
                AppSubMenuComponent,
                AppFooterComponent,
                AppProfileComponent,
            ],
            providers: [RoleService]
        }).compileComponents();
    }));
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppTopBarComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});