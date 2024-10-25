import { Component, AfterViewInit, OnInit } from '@angular/core';
import { BannerPublicidadService } from '../../../services/banner-publicidad.service';
import * as bootstrap from 'bootstrap';
// Declara una funcion de manera global
import { Lightbox } from 'ngx-lightbox';
import { environment } from '../../../../../environments/environment';

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

  constructor(private bannerPublicidadServices: BannerPublicidadService, private _lightbox: Lightbox) {
    this.baseUrl = base_url;
  }

  ngOnInit(): void {
    this.indexBannerPublicidad();
  }

  public indexBannerPublicidad() {
    this.bannerPublicidadServices.indexBannerPublicidad().subscribe({
      next: (resp: any) => {
        this.bannerPublicidad = resp.data.data;

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

    console.log(item);
    console.log(index);

    this._lightbox.open(item, index, {
      wrapAround: true,
      showImageNumberLabel: false,
      centerVertically: false,
      fitImageInViewPort: true, // Aquí es donde se agrega la opción
    });
  }



  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

}
