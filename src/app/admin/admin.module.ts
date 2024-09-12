import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from './shared/shared.module';

// Componenetes de Admin Module
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PersonaComponent } from './pages/persona/persona.component';
import { ModalPersonaComponent } from './pages/persona/modal-persona/modal-persona.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ModalUsuariosComponent } from './pages/usuarios/modal-usuarios/modal-usuarios.component';
import { InicioSeccionWebComponent } from './pages/inicio-seccion-web/inicio-seccion-web.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardComponent,
    PersonaComponent,
    ModalPersonaComponent,
    UsuariosComponent,
    ModalUsuariosComponent,
    InicioSeccionWebComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
