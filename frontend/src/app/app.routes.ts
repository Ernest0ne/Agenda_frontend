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
    { path: 'Shoes', component: EmptyDemoComponent },
    { path: 'Shoes/GestiondeTickets', component: SaveTiqueteComponent },
    { path: 'Shoes/RegistrosGenerales', component: SaveRegistrosGeneralesComponent },
    { path: 'Shoes/GestiondeClientes', component: SaveClienteComponent },
    { path: 'Shoes/Empleados', component: SaveEmpleadoComponent },
    { path: 'Shoes/PagarTickets', component: PayTiqueteComponent },
    { path: 'Shoes/TabladePrecios', component: PriceTiqueteComponent },
    { path: 'Shoes/Materiales', component: SaveMaterialesComponent },
    { path: 'Shoes/Nomina', component: NominaComponent }




];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
});
