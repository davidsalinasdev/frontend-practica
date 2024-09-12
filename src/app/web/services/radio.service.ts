import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RadioService {

  private audio = new Audio('https://live.turadiotv.com/8110/stream');
  private isPlaying = false;

  constructor() {
    const savedState = localStorage.getItem('radioPlaying');
    if (savedState === 'true') {
      this.play();
    }
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

