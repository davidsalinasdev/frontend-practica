import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';

import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Modulo SHARED
import { SharedModule } from './shared/shared.module';

// Componentes que pertenecen a Web
import { WebLayoutComponent } from './layout/web-layout/web-layout.component';
import { InicioComponent } from './pages/inicio/inicio.component';

// web/componenents

import { TelevisionComponent } from './components/television/television.component';
import { UltimasNoticiasComponent } from './components/components-gadc/ultimas-noticias/ultimas-noticias.component';
import { TelevisionGadcComponent } from './components/components-gadc/television-gadc/television-gadc.component';
import { PilargestionGadcComponent } from './components/components-gadc/pilargestion-gadc/pilargestion-gadc.component';
import { GobiernoGadcComponent } from './components/components-gadc/gobierno-gadc/gobierno-gadc.component';
import { ChatComponent } from './pages/chat/chat.component';
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
import { BannerPublicidadComponent } from './components/components-gadc/banner-publicidad/banner-publicidad.component';
import { SecretariasComponent } from './pages/secretarias/secretarias.component';
import { GobernadorComponent } from './pages/gobernador/gobernador.component';





@NgModule({
  declarations: [
    WebLayoutComponent,
    InicioComponent,
    TelevisionComponent,
    UltimasNoticiasComponent,
    TelevisionGadcComponent,
    PilargestionGadcComponent,
    GobiernoGadcComponent,
    ChatComponent,
    GacetaComponent,
    AuditoriaComponent,
    RadioComponent,
    ConvocatoriasComponent,
    RendicionCuentasComponent,
    SusgerenciasComponent,
    DenunciasComponent,
    MediatekaComponent,
    SemanarioComponent,
    DetalleNoticiasComponent,
    BannerPublicidadComponent,
    SecretariasComponent,
    GobernadorComponent
  ],
  imports: [
    CommonModule,
    WebRoutingModule,
    SharedModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class WebModule { }
