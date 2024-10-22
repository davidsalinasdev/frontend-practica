import { Component } from '@angular/core';
import { BannerPublicidadService } from '../../../services/banner-publicidad.service';
// Importa Bootstrap
import * as bootstrap from 'bootstrap';
@Component({
  selector: 'app-banner-publicidad',
  templateUrl: './banner-publicidad.component.html',
  styleUrl: './banner-publicidad.component.css'
})
export class BannerPublicidadComponent {

  public bannerPublicidad: any[] = [];

  constructor(private bannerPublicidadServices: BannerPublicidadService) { }

  ngOnInit(): void {
    this.indexBannerPublicidad();

  }

  /**
   * indexBannerPublicidad
   */
  public indexBannerPublicidad() {
    this.bannerPublicidadServices.indexBannerPublicidad().subscribe({
      next: (resp: any) => {
        // console.log(resp);

        this.bannerPublicidad = resp.data.data;
        // console.log(this.bannerPublicidad);

      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        // console.log('complete') 
      }
    })
  }

  ngAfterViewInit(): void {
    // Obtener el elemento del carrusel
    const carouselElement = document.querySelector('#banerPubli');

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
