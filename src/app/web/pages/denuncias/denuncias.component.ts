import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { DenunciasService } from '../../services/denuncias.service';

@Component({
  selector: 'app-denuncias',
  templateUrl: './denuncias.component.html',
  styleUrl: './denuncias.component.css'
})
export class DenunciasComponent {

  // Formulario
  public formulario!: FormGroup;


  public opcionAlerta: boolean = true;

  constructor(
    private fb: FormBuilder,
    private denunciaServices: DenunciasService
  ) {
    this.crearFormulario();
  }

  public crearFormulario() {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      email: ['', [Validators.required]],
      denuncia: ['', [Validators.required, Validators.maxLength(250)]]
    });
  }

  // Validaciones para formulario
  get nombre() {
    return this.formulario.get('nombre');
  }

  get celular() {
    return this.formulario.get('celular');
  }

  get email() {
    return this.formulario.get('email');
  }

  get denuncia() {
    return this.formulario.get('denuncia');
  }

  /**
  * submit
  */
  public submit(formDirective: FormGroupDirective) {

    this.denunciaServices.store(this.formulario.value).subscribe({
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

