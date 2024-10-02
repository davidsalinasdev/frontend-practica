import { Component } from '@angular/core';
import { GobiernoService } from '../../services/gobierno.service';

@Component({
  selector: 'app-gobernador',
  templateUrl: './gobernador.component.html',
  styleUrl: './gobernador.component.css'
})
export class GobernadorComponent {

  public despacho: any;

  constructor(private gobiernoServices: GobiernoService) {
    // Mover la página a la parte superior
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnInit(): void {

    this.getDespacho();

  }

  /**
   * getDespacho
   */
  public getDespacho() {
    this.gobiernoServices.getDespacho().subscribe((resp: any) => {
      this.despacho = resp.data;
      console.log(this.despacho);
    })
  }


}
