import { Component } from '@angular/core';
import { BannerPublicidadService } from '../../../services/banner-publicidad.service';

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


}
