import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { EmptyDemoComponent } from './demo/Views/emptydemo.component';
import { InicioComponent } from './demo/Components/ConfiguracionyAdministracion/users/login/inicio.component';
import { ProfesoresComponent } from './demo/Components/agenda_profesores/profesores/profesores.component';
import { AgendasComponent } from './demo/Components/agenda_agendas/agendas/agendas.component';
import { CitasComponent } from './demo/Components/agenda_citas/citas/citas.component';
import { NotasComponent } from './demo/Components/agenda_notas/notas/notas.component';




export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'AgendApp', component: EmptyDemoComponent },
    { path: 'AgendApp/Profesores', component: ProfesoresComponent },
    { path: 'AgendApp/Agendas', component: AgendasComponent },
    { path: 'AgendApp/Citas', component: CitasComponent },
    { path: 'AgendApp/Notas', component: NotasComponent }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
});
