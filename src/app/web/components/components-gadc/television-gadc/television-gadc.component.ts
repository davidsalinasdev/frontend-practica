import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TransmisionService } from '../../../services/transmision.service';

@Component({
  selector: 'app-television-gadc',
  templateUrl: './television-gadc.component.html',
  styleUrls: ['./television-gadc.component.css']
})
export class TelevisionGadcComponent implements OnInit {

  public videoUrlYoutube!: SafeResourceUrl;
  public videoUrlFacebook!: SafeResourceUrl;
  public datosTransmision: any[] = [];

  public urlGlobal: any;

  constructor(
    private sanitizer: DomSanitizer,
    private TransmisionServices: TransmisionService) { }

  ngOnInit(): void {

    this.getTransmision();

  }

  convertToEmbedUrl(url: string): string {
    const videoId = this.extractVideoId(url);
    // Añadimos los parámetros de autoplay y mute
    // Añadimos el parámetro `modestbranding=1` para ocultar el logo de YouTube
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
  }




  extractVideoId(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|watch\?v=|watch\?.+&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }


  // Logica para facebook
  convertToFacebookEmbedUrl(url: string): string {
    // Parametrizamos para autoplay y mute
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&autoplay=true&mute=1`;

  }





  /**
   * getTransmision
   */
  public getTransmision() {
    this.TransmisionServices.getTransmision().subscribe(
      (resp: any) => {
        this.datosTransmision = resp.transmision;

        if (this.datosTransmision[0]?.plataforma === "youtube") {
          // const LiveUrl = this.datosTransmision[0]?.url_youtube;
          const LiveUrl = this.datosTransmision[0]?.url_youtube;
          const embedUrl = this.convertToEmbedUrl(LiveUrl);
          // console.log('URL de YouTube:', embedUrl); // Verifica la URL aquí
          this.videoUrlYoutube = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
          this.urlGlobal = this.videoUrlYoutube;
        } else {
          const LiveFacebookUrl = this.datosTransmision[0]?.url_facebook;
          const embedUrlFacebook = this.convertToFacebookEmbedUrl(LiveFacebookUrl);
          // console.log('URL de Facebook:', embedUrlFacebook); // Verifica la URL aquí
          this.videoUrlFacebook = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrlFacebook);
          this.urlGlobal = this.videoUrlFacebook;
        }
      }
    );
  }


}
