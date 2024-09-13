import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componente que pertenecen a Web
import { WebLayoutComponent } from './layout/web-layout/web-layout.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { GacetaComponent } from './pages/gaceta/gaceta.component';
import { AuditoriaComponent } from './pages/auditoria/auditoria.component';
import { RadioComponent } from './pages/radio/radio.component';

const routes: Routes = [
  {
    path: '', component: WebLayoutComponent, data: { titulo: 'Renderzacion de componentes WEB' },
    // Definiendo rutas hijas de este modulo
    children: [ // ruta hija depende del padre
      { path: 'inicio', component: InicioComponent }, // Path inicial
      { path: 'gaceta', component: GacetaComponent },
      { path: 'auditoria', component: AuditoriaComponent },
      { path: 'radio', component: RadioComponent },
      { path: '**', redirectTo: 'fullscreen' } // Es la primera ruta que se muestra para este MODULO.
    ]
  } // Path inicial



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
