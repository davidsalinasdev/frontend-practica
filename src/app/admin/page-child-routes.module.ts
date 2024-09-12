import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Componentes hijas de pages
import { PersonaComponent } from './pages/persona/persona.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { InicioSeccionWebComponent } from './pages/inicio-seccion-web/inicio-seccion-web.component';
import { UltimasNoticiasComponent } from '../web/components/components-gadc/ultimas-noticias/ultimas-noticias.component';



// Rutas hijas de Admin Module
const childRoutes: Routes = [

    { path: 'persona', component: PersonaComponent, data: { titulo: 'Gestión Persona' } },
    { path: 'usuario', component: UsuariosComponent, data: { titulo: 'Gestión Usuarios' } },
    { path: 'web-seccion', component: InicioSeccionWebComponent, data: { titulo: 'Gestión de datos generales de la web' } },
    { path: 'ultimas-noticias', component: UltimasNoticiasComponent, data: { titulo: 'Gestión de ultimas noticias' } }

];

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
})
export class PageChildRoutesModule { }
