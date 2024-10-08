import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { TransmisionService } from '../../services/transmision.service';

// Importa jQuery de forma correcta
declare var $: any;
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  public datosTransmision: any[] = [];
  public modalTv: any[] = [];
  public base_url = environment.base_url;

  constructor(
    private TransmisionServices: TransmisionService) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Peticion para modal
    this.TransmisionServices.getModal().subscribe(
      (resp: any) => {
        this.modalTv = resp.modaltv;

        if (this.modalTv[0]?.estado === "live") {
          setTimeout(() => {
            this.showModal();
          }, 4000);
        }
      }
    )
  }

  public liveCss: boolean = true; // No muestra

  ngOnInit(): void {

    this.setupCloseButtons();

    this.getTransmision();
  }

  showModal(): void {
    // Aquí es donde usas jQuery para mostrar el modal
    $(document).ready(() => {
      $('#welcomeModal').modal('show');
    });
  }

  setupCloseButtons(): void {
    // Cerrar el modal usando jQuery cuando se hace clic en los botones
    $(document).ready(() => {
      // Botón de cierre en el header
      $('#btnCloseModal').click(() => {
        $('#welcomeModal').modal('hide');
      });

      // Botón de cierre en el footer
      $('#btnFooterCloseModal').click(() => {
        $('#welcomeModal').modal('hide');
      });
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    const scrollTop = window.scrollY;
    // console.log('Desplazamiento actual:', scrollTop);
    // Aquí puedes agregar la lógica que necesites al desplazar la página
  }


  /**
 * getTransmision
 */
  public getTransmision() {

    this.liveCss = true; // no muestra
    this.TransmisionServices.getTransmision().subscribe(
      (resp: any) => {

        this.datosTransmision = resp.transmision;

        if (this.datosTransmision[0]?.estado === "live") {

          this.liveCss = false;
          this.datosTransmision = resp.transmision;
        }
        else {
          console.log('no hay live');

          this.liveCss = true;
        }

      })
  }

}
