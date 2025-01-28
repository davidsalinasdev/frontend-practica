import { Component, AfterViewInit, OnInit } from '@angular/core';
import { BannerPublicidadService } from '../../../services/banner-publicidad.service';
import * as bootstrap from 'bootstrap';
// Declara una funcion de manera global
import { Lightbox, LightboxEvent, LIGHTBOX_EVENT } from 'ngx-lightbox';
import { environment } from '../../../../../environments/environment';
import { Subscription } from 'rxjs';

const base_url = environment.base_url;
@Component({
  selector: 'app-banner-publicidad',
  templateUrl: './banner-publicidad.component.html',
  styleUrls: ['./banner-publicidad.component.css']
})
export class BannerPublicidadComponent implements OnInit, AfterViewInit {

  public bannerPublicidad: any[] = [];
  public groupedItems: any[] = [];
  public baseUrl: string;
  public _album: any[] = [];
  private _subscription!: Subscription;

  constructor(private bannerPublicidadServices: BannerPublicidadService,
    private _lightbox: Lightbox,
    private _lightboxEvent: LightboxEvent
  ) {
    this.baseUrl = base_url;
  }

  ngOnInit(): void {
    this.indexBannerPublicidad();
  }

  public indexBannerPublicidad() {
    this.bannerPublicidadServices.indexBannerPublicidad().subscribe({
      next: (resp: any) => {
        this.bannerPublicidad = resp.data.data;

        console.log(resp);


        // Lightbox
        for (let i = 0; i < this.bannerPublicidad.length; i++) {

          const src = this.bannerPublicidad[i].imagen
          const caption = this.bannerPublicidad[i].titulo;
          // const thumb = 'demo/img/image' + i + '-thumb.jpg';
          const album = {
            src: src,
            caption: caption,
            // thumb: thumb
          };


          this._album.push(album);
        }
        // console.log('hola mundo');


        this.groupImages();

      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngAfterViewInit(): void {
    const carouselElement = document.querySelector('#banerPubli');
    if (carouselElement) {
      const carousel = new bootstrap.Carousel(carouselElement, {
        interval: 3000,
        ride: 'carousel'
      });
    } else {
      console.error('El elemento del carrusel no fue encontrado');
    }
  }

  private groupImages(): void {
    for (let i = 0; i < this._album.length; i += 3) {
      this.groupedItems.push(this._album.slice(i, i + 3));
    }
  }

  open(item: any, index: number): void {

    this._subscription = this._lightboxEvent.lightboxEvent$
      .subscribe(event => this._onReceivedEvent(event));

    this._lightbox.open(item, index, {
      positionFromTop: 20,
      fitImageInViewPort: true,
      wrapAround: true,
    });
  }


  private _onReceivedEvent(event: any): void {
    // remember to unsubscribe the event when lightbox is closed
    if (event.id === LIGHTBOX_EVENT.CLOSE) {
      // event CLOSED is fired
      this._subscription.unsubscribe();
    }

    if (event.id === LIGHTBOX_EVENT.OPEN) {
      // event OPEN is fired
      console.log(event);

      // Seleccionar la imagen visible en el Lightbox
      setTimeout(() => {
        const contenedor = document.querySelector('#outerContainer') as HTMLImageElement;
        const lightboxImage = document.querySelector('#image') as HTMLImageElement;
        console.log(lightboxImage);
        if (lightboxImage) {
          // O estilos inline como alternativa
          lightboxImage.style.width = '1110px';
          lightboxImage.style.height = '600px';
          contenedor.style.height = '1110px';
          contenedor.style.height = '600px';
        }

      }, 500);


    }

    if (event.id === LIGHTBOX_EVENT.CHANGE_PAGE) {
      // event change page is fired
      // console.log(event.data); // -> image index that lightbox is switched to

      // Seleccionar la imagen visible en el Lightbox
      setTimeout(() => {
        const contenedor = document.querySelector('#outerContainer') as HTMLImageElement;
        const lightboxImage = document.querySelector('#image') as HTMLImageElement;
        console.log(lightboxImage);
        if (lightboxImage) {
          // O estilos inline como alternativa
          lightboxImage.style.width = '1110px';
          lightboxImage.style.height = '600px';
          contenedor.style.height = '1110px';
          contenedor.style.height = '600px';
        }

      }, 500);
    }
  }





  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

}
