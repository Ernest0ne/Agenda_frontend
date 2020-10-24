import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { EmptyDemoComponent } from './demo/Views/emptydemo.component';
import { InicioComponent } from './demo/Components/ConfiguracionyAdministracion/users/login/inicio.component';
import { ProfesoresComponent } from './demo/Components/agenda_profesores/profesores/profesores.component';




export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'AgendApp', component: EmptyDemoComponent },
    { path: 'AgendApp/Profesores', component: ProfesoresComponent }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
});
