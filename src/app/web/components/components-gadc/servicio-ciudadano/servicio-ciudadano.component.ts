import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { CiudadanoService } from '../../../services/ciudadano.service';

const base_url = environment.base_url;

// Importa Bootstrap
import * as bootstrap from 'bootstrap';

// Declara una funcion de manera global
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-servicio-ciudadano',
  templateUrl: './servicio-ciudadano.component.html',
  styleUrl: './servicio-ciudadano.component.css'
})
export class ServicioCiudadanoComponent {

  public baseUrl: string;
  public listCiudadano: any[] = [];
  public listInteres: any[] = [];
  public _album: any[] = [];


  constructor(
    private ciudadanoServices: CiudadanoService,
    private _lightbox: Lightbox
  ) {
    this.baseUrl = base_url;
  }

  ngOnInit(): void {
    this.indexJaku();
    this.indexInteres();
  }

  /**
   * indexJaku
   */
  public indexJaku() {
    this.ciudadanoServices.getCiudadano().subscribe(
      (resp: any) => {
        this.listCiudadano = resp.ciudadanotv;
        // console.log(this.listCiudadano);
      }
    )
  }

  /**
  * index de tu interes
  */
  public indexInteres() {
    this.ciudadanoServices.getInteres().subscribe(
      (resp: any) => {
        this.listInteres = resp.interestv;

        for (let i = 0; i < this.listInteres.length; i++) {
          const src = `${this.baseUrl}/storage/uploads/${this.listInteres[i].imagen}`

          const caption = this.listInteres[i].descripcion;
          // const thumb = 'demo/img/image' + i + '-thumb.jpg';
          const album = {
            src: src,
            caption: caption,
            // thumb: thumb
          };

          this._album.push(album);

        }
      })
  }

  open(index: number): void {
    this._lightbox.open(this._album, index, {
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
