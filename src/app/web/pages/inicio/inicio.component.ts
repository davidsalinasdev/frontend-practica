import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { TransmisionService } from '../../services/transmision.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  public datosTransmision: any[] = [];

  constructor(
    private TransmisionServices: TransmisionService) { }

  public liveCss: boolean = true; // No muestra

  ngOnInit(): void {
    // Desplazarse a la parte superior de la página cuando se inicia el componente
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Usa 'auto' si no quieres la animación suave
    });

    this.getTransmision();
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
          this.liveCss = true;
        }

      })
  }

}
