import { Component, AfterViewInit } from '@angular/core';
declare var $: any; // Declara jQuery

@Component({
  selector: 'app-semanario',
  templateUrl: './semanario.component.html',
  styleUrl: './semanario.component.css'
})
export class SemanarioComponent implements AfterViewInit {
  ngAfterViewInit() {
    $('#flipbook').turn({
      width: 600,
      height: 400,
      autoCenter: true,
      elevation: 50, // Eleva las páginas
      gradients: true // Agrega sombras
    });
  }
}