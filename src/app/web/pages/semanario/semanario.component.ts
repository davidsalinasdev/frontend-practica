import { Component, AfterViewInit } from '@angular/core';

declare var $: any; // Importar jQuery

import 'turn.js';

@Component({
  selector: 'app-semanario',
  templateUrl: './semanario.component.html',
  styleUrls: ['./semanario.component.css']
})
export class SemanarioComponent implements AfterViewInit {
  ngAfterViewInit() {
    this.initFlipbook();
    window.addEventListener('resize', this.initFlipbook.bind(this));
  }

  initFlipbook() {
    const flipbook = $('#flipbook').turn({
      width: Math.min(window.innerWidth * 0.9, 1150),  // 90% del ancho de la ventana, máximo 1200
      height: Math.min(window.innerHeight * 0.8, 680), // 80% de la altura de la ventana, máximo 700
      autoCenter: false,
      duration: 1000,
      elevation: 50,
      gradients: true
    });

    // Funciones para los botones
    $('#prev').on('click', function () {
      flipbook.turn('previous');
    });

    $('#next').on('click', function () {
      flipbook.turn('next');
    });
  }
}