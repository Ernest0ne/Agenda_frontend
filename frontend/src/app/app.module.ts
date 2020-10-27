import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutes, routes } from './app.routes';
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { GalleriaModule } from 'primeng/galleria';
import { GrowlModule } from 'primeng/growl';
import { InplaceModule } from 'primeng/inplace';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { LightboxModule } from 'primeng/lightbox';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SpinnerModule } from 'primeng/spinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { AppComponent } from './app.component';
import { AppProfileComponent } from './app.profile.component';
import { AppMenuComponent, AppSubMenuComponent } from './app.menu.component';
import { AppBreadcrumbComponent } from './app.breadcrumb.component';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { EmptyDemoComponent } from './demo/Views/emptydemo.component';
import { EventService } from './demo/Services/eventservice';
import { NodeService } from './demo/Services/nodeservice';
import { BreadcrumbService } from './breadcrumb.service';
import { InicioComponent } from './demo/Components/ConfiguracionyAdministracion/users/login/inicio.component';
import { MessageService } from 'primeng/api';
import { AccessComponent } from './demo/Views/access.component';
import { DataTableModule } from 'primeng/primeng';
//import { FindAllTerminalComponent } from './demo/Components/ConfiguracionyAdministracion/terminals/find-all/find-all.component';
import { UtilitiesConfigDates } from './demo/utilities/utilities-config-dates.service';
import { UtilitiesConfigNumber } from './demo/utilities/utilities-config-number.service';
import { UtilitiesConfigString } from './demo/utilities/utilities-config-string.service';

import { UserIdleModule } from 'angular-user-idle';
import { FileUploadModule } from 'ng2-file-upload';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FuncionesGenerales } from './demo/Components/FuncionesGenerales/funcionesGenerales';
import { ConfigColor } from '../configColor';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Svg } from './demo/svgPath/svg';
import { MatTabsModule } from '@angular/material';
import { AuthInterceptorService } from './demo/interceptors/auth-interceptor.service';
import { Title } from '@angular/platform-browser';
import { SaveTiqueteComponent } from './demo/Components/Tiquetes/save-tiquete/save-tiquete.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { SaveRegistrosGeneralesComponent } from './demo/Components/Registros generales/save-registros-generales/save-registros-generales.component';
import { SaveClienteComponent } from './demo/Components/Clientes/save-cliente/save-cliente.component';
import { SaveEmpleadoComponent } from './demo/Components/Empleados/save-empleado/save-empleado.component';
import { PayTiqueteComponent } from './demo/Components/Tiquetes/pay-tiquete/pay-tiquete.component';
import { PriceTiqueteComponent } from './demo/Components/Tiquetes/price-tiquete/price-tiquete.component';
import { SaveMaterialesComponent } from './demo/Components/Registros generales/save-materiales/save-materiales.component';
import { NominaComponent } from './demo/Components/Empleados/nomina/nomina.component';
import { ProfesoresComponent } from './demo/Components/agenda_profesores/profesores/profesores.component';
import { ConfigTables } from './demo/utilities/config-tables.service';
import { ExcelService } from './demo/utilities/excel.service';
import { AgendasComponent } from './demo/Components/agenda_agendas/agendas/agendas.component';
import { CitasComponent } from './demo/Components/agenda_citas/citas/citas.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin

FullCalendarModule.registerPlugins([
    dayGridPlugin,
    interactionPlugin
]);

const config: SocketIoConfig = { url: environment.urlSockect, options: { autoConnect: false } };

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    direction: 'vertical',
    slidesPerView: 'auto'
};

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: false
};

@NgModule({
    imports: [
        MatTabsModule,
        BrowserModule,
        FormsModule,
        AppRoutes,
        HttpClientModule,
        BrowserAnimationsModule,
        AccordionModule,
        AutoCompleteModule,
        BreadcrumbModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        CarouselModule,
        ChartModule,
        CheckboxModule,
        ChipsModule,
        CodeHighlighterModule,
        ConfirmDialogModule,
        ColorPickerModule,
        ContextMenuModule,
        DataViewModule,
        DialogModule,
        DropdownModule,
        EditorModule,
        FieldsetModule,
        FileUploadModule,
        FullCalendarModule,
        GalleriaModule,
        GrowlModule,
        InplaceModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        LightboxModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        OrderListModule,
        OrganizationChartModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        ScrollPanelModule,
        SelectButtonModule,
        SlideMenuModule,
        SliderModule,
        SpinnerModule,
        SplitButtonModule,
        StepsModule,
        TableModule,
        TabMenuModule,
        TabViewModule,
        TerminalModule,
        TieredMenuModule,
        ToastModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeTableModule,
        VirtualScrollerModule,
        DataTableModule,
        ReactiveFormsModule,
        UserIdleModule.forRoot({ idle: 1795, timeout: 3, ping: 0 }),
        LeafletModule.forRoot(),
        LeafletModule,
        DeviceDetectorModule.forRoot(),
        PerfectScrollbarModule,
        SwiperModule,
        SocketIoModule.forRoot(config),
        RouterModule.forChild(routes),
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production
        }),
        NgxBarcodeModule
    ],
    declarations: [
        InicioComponent,
        AppComponent,
        AppMenuComponent,
        AppSubMenuComponent,
        AppProfileComponent,
        AppBreadcrumbComponent,
        AppTopBarComponent,
        AppFooterComponent,
        EmptyDemoComponent,
        AccessComponent,
        SaveTiqueteComponent,
        SaveRegistrosGeneralesComponent,
        SaveClienteComponent,
        SaveEmpleadoComponent,
        PayTiqueteComponent,
        PriceTiqueteComponent,
        SaveMaterialesComponent,
        NominaComponent,
        ProfesoresComponent,
        AgendasComponent,
        CitasComponent
    ],
    providers: [
        Title,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        },
        {
            provide: SWIPER_CONFIG,
            useValue: DEFAULT_SWIPER_CONFIG
        },
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        EventService,
        NodeService,
        BreadcrumbService,
        MessageService,
        FuncionesGenerales,
        Svg,
        ConfigColor,
        UtilitiesConfigDates,
        UtilitiesConfigNumber,
        UtilitiesConfigString,
        ExcelService,
        ConfigTables
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
