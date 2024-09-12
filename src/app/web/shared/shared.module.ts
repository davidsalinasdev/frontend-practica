import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Comonentes de SHARED
import { NavegacionGadcComponent } from './gadc/navegacion-gadc/navegacion-gadc.component';
import { FooterGadcComponent } from './gadc/footer-gadc/footer-gadc.component';
import { SeedebarGadcComponent } from './gadc/seedebar-gadc/seedebar-gadc.component';
import { HeaderGadcComponent } from './gadc/header-gadc/header-gadc.component';

@NgModule({
  declarations: [
    NavegacionGadcComponent,
    FooterGadcComponent,
    SeedebarGadcComponent,
    HeaderGadcComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavegacionGadcComponent,
    FooterGadcComponent,
    SeedebarGadcComponent,
    HeaderGadcComponent
  ]
})
export class SharedModule { }
