import { Component } from '@angular/core';
import { InicioService } from '../../../services/inicio.service';

@Component({
  selector: 'app-header-gadc',
  templateUrl: './header-gadc.component.html',
  styleUrl: './header-gadc.component.css'
})
export class HeaderGadcComponent {
  public listBanners: any = [];

  constructor(private inicioServices: InicioService) { }

  ngOnInit(): void {
    this.indexBaners();
  }

  /**
 * indexBaners
 */
  public indexBaners() {
    this.inicioServices.indexCarrusel().subscribe({
      next: (resp: any) => {

        const { data } = resp;

        this.listBanners = data;
        console.log(this.listBanners);

      },
      error: (err) => {
        console.log(err);
      },
      complete: () => { }
    })
  }
}
