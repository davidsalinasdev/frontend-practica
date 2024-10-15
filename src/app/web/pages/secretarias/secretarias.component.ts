import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SecretariasService } from '../../services/secretarias.service';

@Component({
  selector: 'app-secretarias',
  templateUrl: './secretarias.component.html',
  styleUrl: './secretarias.component.css'
})
export class SecretariasComponent {


  public idSecretaria: string | null = ''
  public secretaria: any;


  constructor(
    private activatedRoute: ActivatedRoute,
    private secretariaServices: SecretariasService
  ) {
    // Mover la página a la parte superior
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.parametroQuery();
  }

  ngOnInit(): void {
    console.log('Hola mundo');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  /**
   * recibiendoTitulo
   */
  public parametroQuery() {
    // Suscribirse a los cambios en los parámetros de la ruta
    this.activatedRoute.paramMap.subscribe(params => {
      this.idSecretaria = params.get('id'); // Obtener el valor del parámetro 'id'

      this.secretariaServices.showSecretaria(this.idSecretaria).subscribe((resp: any) => {
        this.secretaria = resp.data;
        console.log(this.secretaria);

      });

    });
  }
}
