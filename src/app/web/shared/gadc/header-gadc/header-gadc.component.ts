import { Component } from '@angular/core';
import { InicioService } from '../../../services/inicio.service';
// Importa Bootstrap
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-header-gadc',
  templateUrl: './header-gadc.component.html',
  styleUrl: './header-gadc.component.css'
})
export class HeaderGadcComponent {
  public listBanners: any = [];

  constructor(private inicioServices: InicioService) { }

  ngOnInit(): void {
    this.indexBaners();
  }

  /**
 * indexBaners
 */
  public indexBaners() {
    this.inicioServices.indexCarrusel().subscribe({
      next: (resp: any) => {

        const { data } = resp;
        this.listBanners = data;
        // console.log(this.listBanners);

      },
      error: (err) => {
        console.log(err);
      },
      complete: () => { }
    })
  }
  ngAfterViewInit(): void {
    // Obtener el elemento del carrusel
    const carouselElement = document.querySelector('#carouselExampleIndicators2');

    // Verificar que el elemento no sea null
    if (carouselElement) {
      // Inicializar el carrusel con el elemento
      const carousel = new bootstrap.Carousel(carouselElement, {
        interval: 3000,  // Cambiar de imagen cada 3 segundos
        ride: 'carousel'
      });
    } else {
      console.error('El elemento del carrusel no fue encontrado');
    }
  }

}
