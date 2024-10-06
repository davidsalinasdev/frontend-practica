import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GobernaciontvService } from '../../services/gobernaciontv.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EnviardatosService } from '../../services/enviardatos.service';
import { environment } from '../../../../environments/environment';

const baseUrl = environment.base_url;

@Component({
  selector: 'app-gobernacion-tv',
  templateUrl: './gobernacion-tv.component.html',
  styleUrls: ['./gobernacion-tv.component.css']
})
export class GobernacionTvComponent implements OnInit {

  public gobernaciontv: any[] = [];

  public itemVideo: any;

  public base_url: any;

  constructor(
    private gobernaciontvServices: GobernaciontvService,
    private sanitizer: DomSanitizer, // Inyecta DomSanitizer para sanitizar URLs
    private cd: ChangeDetectorRef,
    private enviardatosServices: EnviardatosService // Inyecta ChangeDetectorRef
  ) {
    this.base_url = baseUrl;
  }

  ngOnInit(): void {
    this.indexGobernaciontv();
  }

  /**
   * indexGobernaciontv
   */
  public indexGobernaciontv() {
    this.gobernaciontvServices.getGobernaciontv().subscribe({
      next: (resp: any) => {
        const { gobernaciontv } = resp;

        // Mapea los datos para sanitizar las URLs de Facebook o YouTube
        this.gobernaciontv = gobernaciontv.map((item: any) => {
          // Si es plataforma de YouTube, convertimos el enlace a formato embebido
          if (item.plataforma === 'youtube' && item.url_youtube) {
            item.url_video = this.transformYouTubeUrl(item.url_youtube);
          }
          // Si es plataforma de Facebook, usamos el url_facebook
          else if (item.plataforma === 'facebook' && item.url_facebook) {
            item.url_video = this.transformFacebookUrl(item.url_facebook);
          }
          return item;
        });
        // console.log(this.gobernaciontv);
      }
    });
  }

  /**
   * Transforma la URL de YouTube para que sea embebible
   */
  private transformYouTubeUrl(url: string): string {
    return url.replace('watch?v=', 'embed/');
  }

  /**
   * Transforma la URL de Facebook para que sea embebible
   */
  private transformFacebookUrl(url: string): string {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=500`;
  }

  /**
   * Sanitiza la URL de los videos
   */
  public getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  /**
   * enviarItem
   */
  public enviarItem(item: any): void {
    // Mover la página a la parte superior
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.enviardatosServices.setItem(item); // Envía el objeto al servicio
    // console.log('Enviado:', item); // Verificar que se envíe correctamente
  }
}
