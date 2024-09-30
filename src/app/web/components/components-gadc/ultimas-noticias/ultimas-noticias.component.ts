import { Component } from '@angular/core';
import { NoticiasService } from '../../../services/noticias.service';

@Component({
  selector: 'app-ultimas-noticias',
  templateUrl: './ultimas-noticias.component.html',
  styleUrl: './ultimas-noticias.component.css'
})
export class UltimasNoticiasComponent {

  public noticia: any[] = [];

  constructor(private noticiaServices: NoticiasService) { }


  ngOnInit(): void {

    this.indexNoticias();

  }

  /**
   * name
   */
  public indexNoticias() {
    this.noticiaServices.indexCarrusel().subscribe({
      next: (resp: any) => {
        this.noticia = resp.data
        // console.log(this.noticia)
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


