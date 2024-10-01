import { Component } from '@angular/core';
import { SecretariasService } from '../../../services/secretarias.service';

@Component({
  selector: 'app-gobierno-gadc',
  templateUrl: './gobierno-gadc.component.html',
  styleUrl: './gobierno-gadc.component.css'
})
export class GobiernoGadcComponent {

  public listSecretarias: any[] = []

  constructor(private secretariasServices: SecretariasService) { }

  ngOnInit(): void {
    this.indexSecratarias();
  }

  /**
   * indexSecratarias
   */
  public indexSecratarias() {
    this.secretariasServices.indexSecretarias().subscribe({
      next: (resp: any) => {
        this.listSecretarias = resp.data
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        // console.log('complete')
      }
    })
  }


}


