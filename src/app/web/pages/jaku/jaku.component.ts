import { Component } from '@angular/core';
import { JakuService } from '../../services/jaku.service';
import { environment } from '../../../../environments/environment';

const base_url = environment.base_url;

@Component({
  selector: 'app-jaku',
  templateUrl: './jaku.component.html',
  styleUrl: './jaku.component.css'
})
export class JakuComponent {

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
