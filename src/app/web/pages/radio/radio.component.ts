import { Component } from '@angular/core';
import { RadioService } from '../../services/radio.service';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.css'
})
export class RadioComponent {

  public isPlaying = false;  // Estado de la reproducción

  constructor(public radioService: RadioService) { }

  // Función para reproducir la radio
  playRadio() {
    // Aquí puedes agregar la lógica para reproducir la radio (streaming, audio API, etc.)
    console.log('Reproduciendo radio');
    this.isPlaying = true; // Cambia el estado a "reproduciendo"
    this.radioService.toggle();
  }

  // Función para pausar/detener la radio
  pauseRadio() {
    // Aquí agregas la lógica para detener la radio
    console.log('Radio detenida');
    this.isPlaying = false; // Cambia el estado a "pausado"
    this.radioService.toggle();
  }

  toggleRadio() {
    this.radioService.toggle();
  }

}
