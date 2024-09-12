import { Component } from '@angular/core';

// Servicios
import { RadioService } from '../../../services/radio.service';

declare var bootstrap: any;

@Component({
  selector: 'app-navegacion-gadc',
  templateUrl: './navegacion-gadc.component.html',
  styleUrl: './navegacion-gadc.component.css'
})
export class NavegacionGadcComponent {

  constructor(public radioService: RadioService) { }


  ngAfterViewInit() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }


  toggleRadio() {
    this.radioService.toggle();
  }

}
