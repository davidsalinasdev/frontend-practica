import { Component } from '@angular/core';
import { GobiernoService } from '../../services/gobierno.service';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-gobernador',
  templateUrl: './gobernador.component.html',
  styleUrl: './gobernador.component.css'
})
export class GobernadorComponent {

  public despacho: any;
  public pdfUrl: any;
  public acercaDe: any;

  constructor(
    private gobiernoServices: GobiernoService,
    private sanitizer: DomSanitizer
  ) {
    // Mover la página a la parte superior
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnInit(): void {
    this.getDespacho();
  }

  /**
   * getDespacho
  */
  public getDespacho() {
    this.gobiernoServices.getDespacho().subscribe((resp: any) => {
      this.despacho = resp.data;
      const url = this.despacho.despacho.organigrama;
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

      this.acercaDe = this.sanitizer.bypassSecurityTrustHtml(this.despacho?.biografia.resenia);  // Sanitizar contenido HTML
    })
  }


}
