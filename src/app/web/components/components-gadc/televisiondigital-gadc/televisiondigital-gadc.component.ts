import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TransmisionService } from '../../../services/transmision.service';
import { EnviardatosService } from '../../../services/enviardatos.service';
import { GobernaciontvService } from '../../../services/gobernaciontv.service';

@Component({
  selector: 'app-televisiondigital-gadc',
  templateUrl: './televisiondigital-gadc.component.html',
  styleUrls: ['./televisiondigital-gadc.component.css']
})
export class TelevisiondigitalGadcComponent implements OnInit {


  public gobernaciontv: any;
  public itemData: any; // Para almacenar los datos recibidos del servicio
  public videoUrlYoutube!: SafeResourceUrl;
  public videoUrlFacebook!: SafeResourceUrl;
  public datosTransmision: any[] = [];
  public urlGlobal: SafeResourceUrl | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    private TransmisionServices: TransmisionService,
    private enviardatosServices: EnviardatosService,
    private gobernaciontvServices: GobernaciontvService
  ) { }

  ngOnInit(): void {
    // Suscribirse a los datos que llegan
    this.indexGobernaciontv();
    this.enviardatosServices.getItem().subscribe(item => {
      this.itemData = item; // Asigna el objeto recibido
      // console.log('Recibido:', this.itemData); // Verificar que se reciba correctamente

      // Si tienes algún método para manejar la transmisión, podrías llamarlo aquí
      this.procesarTransmision(); // Llama a la función para manejar la transmisión
    });

  }

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
        // console.log(gobernaciontv);
        this.itemData = gobernaciontv[0];
        this.procesarTransmision();
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

  // Método para procesar la transmisión
  private procesarTransmision(): void {
    if (this.itemData) {
      // Asignar la plataforma para determinar qué URL usar
      if (this.itemData.plataforma === "youtube" && this.itemData.url_youtube) {
        const embedUrl = this.convertToEmbedUrl(this.itemData.url_youtube);
        this.videoUrlYoutube = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
        this.urlGlobal = this.videoUrlYoutube;
      } else if (this.itemData.plataforma === "facebook" && this.itemData.url_facebook) {
        const embedUrlFacebook = this.convertToFacebookEmbedUrl(this.itemData.url_facebook);
        this.videoUrlFacebook = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrlFacebook);
        this.urlGlobal = this.videoUrlFacebook;
      }
    }
  }

  // Convertir URL de YouTube a formato embed
  convertToEmbedUrl(url: string): string {
    const videoId = this.extractVideoId(url);
    return `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=0&modestbranding=1`;
  }

  // Extraer el ID del video de YouTube
  extractVideoId(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|watch\?v=|watch\?.+&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  // Convertir URL de Facebook a formato embed
  convertToFacebookEmbedUrl(url: string): string {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&autoplay=0&mute=0`;
  }


}
