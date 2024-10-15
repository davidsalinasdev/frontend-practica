import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { JakuService } from '../../../services/jaku.service';


const base_url = environment.base_url;

@Component({
  selector: 'app-servicio-ciudadano',
  templateUrl: './servicio-ciudadano.component.html',
  styleUrl: './servicio-ciudadano.component.css'
})
export class ServicioCiudadanoComponent {

  public baseUrl: string;
  public listJaku: any[] = [];

  constructor(private jakuServices: JakuService) {
    this.baseUrl = base_url;
  }


  ngOnInit(): void {
    this.indexJaku();
  }

  /**
   * indexJaku
   */
  public indexJaku() {
    this.jakuServices.getJaku().subscribe(
      (resp: any) => {
        this.listJaku = resp.jakutv;
        // console.log(this.listJaku);

      }
    )
  }


}
