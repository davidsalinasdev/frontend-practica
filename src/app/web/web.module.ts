import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';

import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

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
    RadioComponent
  ],
  imports: [
    CommonModule,
    WebRoutingModule,
    SharedModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class WebModule { }
