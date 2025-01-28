import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BanerCampañaService } from '../../services/baner-campaña.service';
import { environment } from '../../../../environments/environment';



@Component({
  selector: 'app-campanias',
  templateUrl: './campanias.component.html',
  styleUrls: ['./campanias.component.css']
})
export class CampaniasComponent implements OnInit {

  iugId: string | null = null; // Variable para almacenar el parámetro

  public listCampania: any[] = [];

  public campania: any[] = [];

  public base_url = environment.base_url;

  constructor(private listCampaniasServices: BanerCampañaService, private route: ActivatedRoute) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnInit(): void {

    this.iugId = this.route.snapshot.paramMap.get('id');
    if (this.iugId) {


      console.log('El parámetro iug_id es:', this.iugId);
      this.getCampania(this.iugId);
      this.listCampanias(this.iugId);

    } else {
      console.warn('El parámetro iug_id no está presente en la URL');
    }
  }


  /**
   * listCampanias
   */
  public listCampanias(id: any) {
    this.listCampaniasServices.getIndexCampania(id).subscribe((resp: any) => {
      const { listCampanias } = resp;
      this.listCampania = listCampanias;
      // console.log(this.listCampania);
    })
  }

  /**
   * getCampania
   */
  public getCampania(id: any) {
    this.listCampaniasServices.getCampania(id).subscribe((resp: any) => {
      this.campania = resp.campania;


    })
  }


  showModalVideo(): void {
    // Aquí es donde usas jQuery para mostrar el modal
    $(document).ready(() => {
      $('#modalListVideo').modal('show');
    });
  }

  showModalAfiche(): void {
    // Aquí es donde usas jQuery para mostrar el modal
    $(document).ready(() => {
      $('#modalListAfiche').modal('show');
    });
  }

  showModalVolante(): void {
    // Aquí es donde usas jQuery para mostrar el modal
    $(document).ready(() => {
      $('#modalListVolante').modal('show');
    });
  }

  showModalRedes(): void {
    // Aquí es donde usas jQuery para mostrar el modal
    $(document).ready(() => {
      $('#modalListRedes').modal('show');
    });
  }


  showModalHistoria(): void {
    // Aquí es donde usas jQuery para mostrar el modal
    $(document).ready(() => {
      $('#modalListHistoria').modal('show');
    });
  }


}

