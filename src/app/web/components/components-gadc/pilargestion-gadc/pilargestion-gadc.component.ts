import { Component } from '@angular/core';
import { PilaresGestionService } from '../../../services/pilares-gestion.service';

@Component({
  selector: 'app-pilargestion-gadc',
  templateUrl: './pilargestion-gadc.component.html',
  styleUrl: './pilargestion-gadc.component.css'
})
export class PilargestionGadcComponent {

  public pilares: any[] = [];
  public pilaresDivididos: any;

  constructor(private pilaresGestionServices: PilaresGestionService) { }


  ngOnInit(): void {
    this.indexPilaresGestion();
  }


  /**
   * indexPilaresGestion
   */
  public indexPilaresGestion() {
    this.pilaresGestionServices.indexPilaresGestion().subscribe({
      next: (resp: any) => {

        this.pilares = resp.data;
        this.pilaresDivididos = this.chunk(this.pilares, 4);
        // console.log(this.pilaresDivididos);

      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        // console.log('complete');
      }
    })
  }

  chunk(arr: any[], chunkSize: number) {

    // console.log(arr);
    let R = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  abrirArchivo(link: string) {
    window.open(link, '_blank');
  }

}
