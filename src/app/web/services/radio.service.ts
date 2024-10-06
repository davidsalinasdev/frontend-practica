import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class RadioService {

  // private audio = new Audio('https://kexp-mp3-128.streamguys1.com/kexp128.mp3');
  private audio = new Audio('https://live.turadiotv.com/8110/stream');
  // private audio: any;
  private isPlaying = false;

  constructor(private http: HttpClient) {
    this.indexRadio();
    const savedState = localStorage.getItem('radioPlaying');
    if (savedState === 'true') {
      this.play();
    }
  }

  /**
  * index
  */
  public indexRadio() {

    this.http.get(`${base_url}/api/radio/radioenlinea`).subscribe((resp: any) => {

      const { radiotv } = resp;

      if (radiotv[0].estado === 'live') {
        this.audio = new Audio(radiotv[0].url_radio); // esto no funciona por que es dinamico
      } else {
        this.audio = new Audio('https://kexp-mp3-128');
      }


    })

  }

  play() {
    if (!this.isPlaying) {
      this.audio.play();
      this.isPlaying = true;
      localStorage.setItem('radioPlaying', 'true');
    }
  }

  stop() {
    if (this.isPlaying) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
      localStorage.setItem('radioPlaying', 'false');
    }
  }

  toggle() {
    this.isPlaying ? this.stop() : this.play();
  }

  get playing(): boolean {
    return this.isPlaying;
  }

}

