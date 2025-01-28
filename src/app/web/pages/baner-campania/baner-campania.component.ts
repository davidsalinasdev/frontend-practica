import { Component, Input, OnInit } from '@angular/core';

// Importa Bootstrap
import { DomSanitizer } from '@angular/platform-browser';
import * as bootstrap from 'bootstrap';

import { environment } from '../../../../environments/environment';
import { BanerCampañaService } from '../../services/baner-campaña.service';
const base_url = environment.base_url;


@Component({
  selector: 'app-baner-campania',
  templateUrl: './baner-campania.component.html',
  styleUrl: './baner-campania.component.css'
})
export class BanerCampaniaComponent {
  public listBanners: any = [];
  public baseUrl: string = base_url
  @Input() iugId: string | null = null; // Recibe el valor del componente padre

  constructor(private bannerServices: BanerCampañaService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    console.log('ID recibido:', this.iugId); // Aquí puedes utilizar el parámetro recibido
    this.indexBaners(this.iugId);

  }

  /**
 * indexBaners
 */
  public indexBaners(id: any) {
    this.bannerServices.getBannerCampania(this.iugId).subscribe({
      next: (resp: any) => {
        const { banners } = resp;
        this.listBanners = banners.map((banner: any) => {
          // Sanitiza la URL del video
          if (banner.imagen_banner) {
            banner.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
              `${this.baseUrl}/storage/uploads/${banner.imagen_banner}`
            );
          }
          return banner;
        });
        console.log(this.listBanners[0]?.videoUrl);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => { }
    })
  }


}
