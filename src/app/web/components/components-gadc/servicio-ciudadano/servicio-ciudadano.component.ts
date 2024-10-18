import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { CiudadanoService } from '../../../services/ciudadano.service';

const base_url = environment.base_url;

@Component({
  selector: 'app-servicio-ciudadano',
  templateUrl: './servicio-ciudadano.component.html',
  styleUrl: './servicio-ciudadano.component.css'
})
export class ServicioCiudadanoComponent {

  public baseUrl: string;
  public listCiudadano: any[] = [];

  constructor(private ciudadanoServices: CiudadanoService) {
    this.baseUrl = base_url;
  }

  ngOnInit(): void {
    this.indexJaku();
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


}
