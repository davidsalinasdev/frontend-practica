import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { SugerenciasService } from '../../services/sugerencias.service';


@Component({
  selector: 'app-susgerencias',
  templateUrl: './susgerencias.component.html',
  styleUrl: './susgerencias.component.css'
})
export class SusgerenciasComponent {

  // Formulario
  public formulario!: FormGroup;


  public opcionAlerta: boolean = true;

  constructor(
    private fb: FormBuilder,
    private sugerenciaServices: SugerenciasService
  ) {
    this.crearFormulario();
  }

  public crearFormulario() {
    this.formulario = this.fb.group({
      sugerencia: ['', [Validators.required, Validators.maxLength(250)]]
    });
  }

  // Validaciones para formulario
  get sugerencia() {
    return this.formulario.get('sugerencia');
  }

  /**
  * submit
  */
  public submit(formDirective: FormGroupDirective) {

    this.sugerenciaServices.store(this.formulario.value).subscribe({
      next: (resp: any) => {

        // Se recupera la persona creada de la respuesta
        const { status } = resp;

        if (status === true) {

          // Resetear formulario
          formDirective.resetForm();
          this.opcionAlerta = false;
          setTimeout(() => {
            this.opcionAlerta = true;
          }, 3000);
        }
      },
      error: (err) => {
        toastr.error(`Intente nuevamente`, 'GACD WEB')
        console.log('error');
      },
      complete: () => {
        console.log('complete');
      }
    })
  }
}
