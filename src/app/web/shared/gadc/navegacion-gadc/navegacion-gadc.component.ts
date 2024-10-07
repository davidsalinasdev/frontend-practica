import { Component } from '@angular/core';

// Servicios
import { RadioService } from '../../../services/radio.service';
import { GobiernoService } from '../../../services/gobierno.service';
import { DomSanitizer } from '@angular/platform-browser';

declare var bootstrap: any;

@Component({
  selector: 'app-navegacion-gadc',
  templateUrl: './navegacion-gadc.component.html',
  styleUrl: './navegacion-gadc.component.css'
})
export class NavegacionGadcComponent {

  public despacho: any;
  public pdfUrl: any;
  public acercaDe: any;

  public menuVisible: boolean = false;

  activeLink: string = '';
  constructor(
    public radioService: RadioService,
    private gobiernoServices: GobiernoService,
    private sanitizer: DomSanitizer
  ) { }


  setActiveLink(link: string) {
    this.activeLink = link;
  }

  // Método para alternar el estado del menú hamburguesa
  toggleMenu() {

    this.menuVisible = !this.menuVisible;
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


  ngAfterViewInit() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }


  toggleRadio() {
    this.radioService.toggle();
  }

}
