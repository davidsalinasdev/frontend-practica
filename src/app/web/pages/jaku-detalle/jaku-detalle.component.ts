import { Component } from '@angular/core';
import { JakuService } from '../../services/jaku.service';
import { environment } from '../../../../environments/environment';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GestionjakuService } from '../../services/gestionjaku.service';

const base_url = environment.base_url;

@Component({
  selector: 'app-jaku-detalle',
  templateUrl: './jaku-detalle.component.html',
  styleUrl: './jaku-detalle.component.css'
})
export class JakuDetalleComponent {

  public baseUrl: string;
  public listJaku: any[] = [];
  public listGestionJaku: any[] = [];

  public idJaku: any;
  public categoriaJaku: any;

  id$: Observable<string | null> = new Observable();
  descripcion$: Observable<string | null> = new Observable();

  constructor(
    private jakuServices: JakuService,
    private route: ActivatedRoute,
    private gestionjakuServices: GestionjakuService
  ) {
    this.baseUrl = base_url;
  }


  ngOnInit(): void {

    // Usando Observables para los parámetros de la ruta
    this.id$ = this.route.params.pipe(map(params => params['id']));
    this.descripcion$ = this.route.params.pipe(map(params => params['descripcion']));

    // Si deseas manejar los valores en el template con el pipe "async", ya no necesitas suscribirte aquí
    // Si necesitas los valores dentro de tu componente, suscríbete a los Observables
    this.id$.subscribe(id => {
      console.log('ID:', id);

      // Aqui la logica para traer jaku
      this.gestionjakuServices.showjakutv(id).subscribe((resp: any) => {

        this.listGestionJaku = resp.gestionjakutv;
        console.log(this.listGestionJaku);
      })

      this.idJaku = id;
    });

    this.descripcion$.subscribe(descripcion => {
      this.categoriaJaku = descripcion;
      console.log('Descripción:', descripcion);
    });

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

