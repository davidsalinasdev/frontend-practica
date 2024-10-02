import { Component } from '@angular/core';
import { SecretariasService } from '../../../services/secretarias.service';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GobiernoService } from '../../../services/gobierno.service';

@Component({
  selector: 'app-gobierno-gadc',
  templateUrl: './gobierno-gadc.component.html',
  styleUrl: './gobierno-gadc.component.css'
})
export class GobiernoGadcComponent {

  public listSecretarias: any[] = []

  public despacho: any;
  public pdfUrl: any;

  constructor(
    private secretariasServices: SecretariasService,
    private gobiernoServices: GobiernoService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.indexSecratarias();
    this.getDespacho();
  }

  /**
   * indexSecratarias
   */
  public indexSecratarias() {
    this.secretariasServices.indexSecretarias().subscribe({
      next: (resp: any) => {
        this.listSecretarias = resp.data
        // console.log(this.listSecretarias);

      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        // console.log('complete')
      }
    })
  }


  /**
 * getDespacho
*/
  public getDespacho() {
    this.gobiernoServices.getDespacho().subscribe((resp: any) => {
      this.despacho = resp.data;
      const url = this.despacho.despacho.organigrama;
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    })
  }

}


