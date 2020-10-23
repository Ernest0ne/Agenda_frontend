import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { EmptyDemoComponent } from './demo/Views/emptydemo.component';
import { InicioComponent } from './demo/Components/ConfiguracionyAdministracion/users/login/inicio.component';
import { SaveTiqueteComponent } from './demo/Components/Tiquetes/save-tiquete/save-tiquete.component';
import { SaveRegistrosGeneralesComponent } from './demo/Components/Registros generales/save-registros-generales/save-registros-generales.component';
import { SaveClienteComponent } from './demo/Components/Clientes/save-cliente/save-cliente.component';
import { SaveEmpleadoComponent } from './demo/Components/Empleados/save-empleado/save-empleado.component';
import { PayTiqueteComponent } from './demo/Components/Tiquetes/pay-tiquete/pay-tiquete.component';
import { PriceTiqueteComponent } from './demo/Components/Tiquetes/price-tiquete/price-tiquete.component';
import { SaveMaterialesComponent } from './demo/Components/Registros generales/save-materiales/save-materiales.component';
import { NominaComponent } from './demo/Components/Empleados/nomina/nomina.component';




export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'AgendApp', component: EmptyDemoComponent },
    { path: 'AgendApp/GestiondeTickets', component: SaveTiqueteComponent },
    { path: 'AgendApp/RegistrosGenerales', component: SaveRegistrosGeneralesComponent },
    { path: 'AgendApp/GestiondeClientes', component: SaveClienteComponent },
    { path: 'AgendApp/Empleados', component: SaveEmpleadoComponent },
    { path: 'AgendApp/PagarTickets', component: PayTiqueteComponent },
    { path: 'AgendApp/TabladePrecios', component: PriceTiqueteComponent },
    { path: 'AgendApp/Materiales', component: SaveMaterialesComponent },
    { path: 'AgendApp/Nomina', component: NominaComponent }




];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
});
