import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioComponent } from './inicio.component';

import { AppFooterComponent } from 'src/app/app.footer.component';
import { MessageService } from 'primeng/components/common/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BreadcrumbModule, ChartModule, OrganizationChartModule, RadioButtonModule } from 'primeng/primeng';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from '../../../../../app.component';
import { AppTopBarComponent } from '../../../../../app.topbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { EmptyDemoComponent } from 'src/app/demo/Views/emptydemo.component';
import { AppMenuComponent, AppSubMenuComponent } from 'src/app/app.menu.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { AppBreadcrumbComponent } from 'src/app/app.breadcrumb.component';
import { ShowLoaderComponent } from '../../../Loader/show-loader/show-loader.component';
import { AppProfileComponent } from 'src/app/app.profile.component';
import { Renderer2 } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SwUpdate, ServiceWorkerModule } from '@angular/service-worker';
import { NgswCommChannel } from '@angular/service-worker/src/low_level';

describe('InicioComponent', () => {
  let component: InicioComponent;
  let fixture: ComponentFixture<InicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BreadcrumbModule,
        ButtonModule,
        DialogModule,
        ToastModule,
        FormsModule, ReactiveFormsModule,
        HttpClientModule,
        BrowserModule,
        PerfectScrollbarModule,
        ScrollPanelModule,
        ConfirmDialogModule,
        ChartModule,
        OrganizationChartModule,
        RadioButtonModule,
      ],
      declarations: [
        InicioComponent,
        AppFooterComponent,
        AppTopBarComponent,
        EmptyDemoComponent,
        AppMenuComponent,
        AppSubMenuComponent,
        AppBreadcrumbComponent, 
        ShowLoaderComponent, 
        AppProfileComponent, 
      ],
      providers: [
        MessageService,
        AppComponent,
        BreadcrumbService, 
        Renderer2, 
        ServiceWorkerModule,
        DeviceDetectorService, 
        SwUpdate, 
        NgswCommChannel
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
