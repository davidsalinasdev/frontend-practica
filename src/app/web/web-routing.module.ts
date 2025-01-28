import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componente que pertenecen a Web
import { WebLayoutComponent } from './layout/web-layout/web-layout.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { GacetaComponent } from './pages/gaceta/gaceta.component';
import { AuditoriaComponent } from './pages/auditoria/auditoria.component';
import { RadioComponent } from './pages/radio/radio.component';
import { ConvocatoriasComponent } from './pages/convocatorias/convocatorias.component';
import { RendicionCuentasComponent } from './pages/rendicion-cuentas/rendicion-cuentas.component';
import { SusgerenciasComponent } from './pages/susgerencias/susgerencias.component';
import { DenunciasComponent } from './pages/denuncias/denuncias.component';
import { MediatekaComponent } from './pages/mediateka/mediateka.component';
import { SemanarioComponent } from './pages/semanario/semanario.component';
import { DetalleNoticiasComponent } from './pages/detalle-noticias/detalle-noticias.component';
import { SecretariasComponent } from './pages/secretarias/secretarias.component';
import { GobernadorComponent } from './pages/gobernador/gobernador.component';
import { GobernacionTvComponent } from './pages/gobernacion-tv/gobernacion-tv.component';
import { JakuComponent } from './pages/jaku/jaku.component';
import { JakuDetalleComponent } from './pages/jaku-detalle/jaku-detalle.component';
import { PlanesComponent } from './pages/planes/planes.component';
import { CampaniasComponent } from './pages/campanias/campanias.component';

const routes: Routes = [
  {
    path: '', component: WebLayoutComponent, data: { titulo: 'Renderzacion de componentes WEB' },
    // Definiendo rutas hijas de este modulo
    children: [ // ruta hija depende del padre
      { path: 'inicio', component: InicioComponent }, // Path inicial
      { path: 'gaceta/:tipo', component: GacetaComponent },
      { path: 'auditoria', component: AuditoriaComponent },
      { path: 'radio', component: RadioComponent },
      { path: 'convocatorias', component: ConvocatoriasComponent },
      { path: 'rendicion-cuentas', component: RendicionCuentasComponent },
      { path: 'sugerencias', component: SusgerenciasComponent },
      { path: 'denuncias', component: DenunciasComponent },
      { path: 'mediateka', component: MediatekaComponent },
      { path: 'semanario', component: SemanarioComponent },
      { path: 'detalle-noticias/:titulo/:otroParametro', component: DetalleNoticiasComponent },
      { path: 'secretarias/:id', component: SecretariasComponent },
      { path: 'gobierno', component: GobernadorComponent },
      { path: 'gobernaciontv', component: GobernacionTvComponent },
      { path: 'jaku', component: JakuComponent },
      { path: 'jaku-detalle/:id/:descripcion', component: JakuDetalleComponent },
      { path: 'planes', component: PlanesComponent },
      { path: 'campanias/:id', component: CampaniasComponent },
      { path: '**', redirectTo: 'fullscreen' } // Es la primera ruta que se muestra para este MODULO.
    ]
  } // Path inicial

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
