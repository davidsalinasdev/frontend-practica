import { Component } from '@angular/core';
import { GobiernoService } from '../../../services/gobierno.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-footer-gadc',
  templateUrl: './footer-gadc.component.html',
  styleUrl: './footer-gadc.component.css'
})
export class FooterGadcComponent {

  public despacho: any;
  public pdfUrl: any;
  public acercaDe: any;

  public years = new Date().getFullYear();

  constructor(
    private gobiernoServices: GobiernoService,
    private sanitizer: DomSanitizer
  ) {

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
