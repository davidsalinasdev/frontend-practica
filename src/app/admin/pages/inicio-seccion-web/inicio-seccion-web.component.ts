import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-inicio-seccion-web',
  templateUrl: './inicio-seccion-web.component.html',
  styleUrl: './inicio-seccion-web.component.css'
})
export class InicioSeccionWebComponent {



  // Formulario Inicio
  public formularioInicio!: FormGroup;

  constructor(private fb: FormBuilder) {

  }


  public crearFormulario() {
    this.formularioInicio = this.fb.group({
      imagen: ['', [Validators.required]],
    });
  }


  get imagen() {
    return this.formularioInicio.get('imagen');
  }

  /**
   * submitInicio
   */
  public submitInicio(formDirectiveInicio: FormGroupDirective) {
    console.log('Hola Mundo');
  }


}
