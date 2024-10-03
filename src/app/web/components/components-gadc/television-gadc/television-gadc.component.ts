import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-television-gadc',
  templateUrl: './television-gadc.component.html',
  styleUrls: ['./television-gadc.component.css']
})
export class TelevisionGadcComponent implements OnInit {

  public videoUrlYoutube!: SafeResourceUrl;
  public videoUrlFacebook!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    // Sanitizamos la URL del video en vivo para youtube
    const LiveUrl = "https://www.youtube.com/watch?v=TZspKqY2_wM";
    const embedUrl = this.convertToEmbedUrl(LiveUrl);
    this.videoUrlYoutube = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);

    // Sanitizamos la URL del video en vivo para facebook
    // URL del video en vivo de Facebook
    const LiveFacebookUrl = "https://www.facebook.com/lobojzz/videos/1083374333507996/";
    const embedUrlFacebook = this.convertToFacebookEmbedUrl(LiveFacebookUrl);
    this.videoUrlFacebook = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrlFacebook);

  }

  convertToEmbedUrl(url: string): string {
    const videoId = this.extractVideoId(url);
    // Añadimos los parámetros de autoplay y mute
    // Añadimos el parámetro `modestbranding=1` para ocultar el logo de YouTube
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&modestbranding=1`;
  }

  extractVideoId(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|watch\?v=|watch\?.+&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }


  // Logica para facebook
  convertToFacebookEmbedUrl(url: string): string {
    // Parametrizamos para autoplay y mute
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&autoplay=true&mute=false`;

  }

}
