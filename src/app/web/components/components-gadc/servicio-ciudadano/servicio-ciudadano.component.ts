import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { CiudadanoService } from '../../../services/ciudadano.service';

const base_url = environment.base_url;

// Importa Bootstrap
import * as bootstrap from 'bootstrap';

// Declara una funcion de manera global


@Component({
  selector: 'app-servicio-ciudadano',
  templateUrl: './servicio-ciudadano.component.html',
  styleUrl: './servicio-ciudadano.component.css'
})
export class ServicioCiudadanoComponent {

  public baseUrl: string;
  public listCiudadano: any[] = [];
  public listInteres: any[] = [];

  constructor(private ciudadanoServices: CiudadanoService) {
    this.baseUrl = base_url;
  }

  ngOnInit(): void {
    this.indexJaku();
    this.indexInteres();
  }

  /**
   * indexJaku
   */
  public indexJaku() {
    this.ciudadanoServices.getCiudadano().subscribe(
      (resp: any) => {
        this.listCiudadano = resp.ciudadanotv;
        // console.log(this.listCiudadano);
      }
    )
  }

  /**
  * index de tu interes
  */
  public indexInteres() {
    this.ciudadanoServices.getInteres().subscribe(
      (resp: any) => {
        this.listInteres = resp.interestv;
        console.log(this.listInteres);
      }
    )
  }



}
