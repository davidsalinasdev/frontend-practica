import { Component } from '@angular/core';

// Servicios
import { RadioService } from '../../../services/radio.service';
import { GobiernoService } from '../../../services/gobierno.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CiudadanoService } from '../../../services/ciudadano.service';

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
  public ciudadano: any[] = [];

  public menuVisible: boolean = false;

  activeLink: string = '';
  constructor(
    public radioService: RadioService,
    private gobiernoServices: GobiernoService,
    private sanitizer: DomSanitizer,
    private ciudadanoServices: CiudadanoService
  ) { }


  setActiveLink(link: string) {
    this.activeLink = link;
  }

  // Método para alternar el estado del menú hamburguesa
  toggleMenu() {

    this.menuVisible = !this.menuVisible;
  }


  isDropdownOpenComunicacion = false;

  toggleDropdownComunicacion() {
    this.isDropdownOpenComunicacion = !this.isDropdownOpenComunicacion;
  }


  isDropdownOpenCiudadano = false;

  toggleDropdownCiudadano() {
    this.isDropdownOpenCiudadano = !this.isDropdownOpenCiudadano;
  }

  isDropdownOpenTransparencia = false;

  toggleDropdownTransparencia() {
    this.isDropdownOpenTransparencia = !this.isDropdownOpenTransparencia;
  }

  isDropdownOpenGaceta = false;

  toggleDropdownGaceta() {
    this.isDropdownOpenGaceta = !this.isDropdownOpenGaceta;
  }



  ngOnInit(): void {
    this.indexCiudadano();
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

  /**
   * indexCiudadano
   */
  public indexCiudadano() {
    this.ciudadanoServices.getCiudadano().subscribe((resp: any) => {

      const { ciudadanotv } = resp;
      this.ciudadano = ciudadanotv;
      // console.log(this.ciudadano);

    })
  }

}
