import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      seccion: 'Administración',
      titulo: 'Dashboard!!',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Principal', url: '/' },
        { titulo: 'Reportes', url: 'reportes' },
        // { titulo: 'ProgressBar', url: 'progress' },
        // { titulo: 'Gráficas', url: 'grafica1' },
      ]
    },
    {
      seccion: 'Pagina Web',
      titulo: 'Web',
      icono: 'mdi mdi-internet-explorer',
      submenu: [
        { titulo: 'Inicio', url: '/admin/dashboard/web-seccion' },
        { titulo: 'Ultimas noticias', url: '/admin/dashboard/usuario' },
        { titulo: 'Auditoria', url: '/admin/dashboard/roles' },
        // { titulo: 'ProgressBar', url: 'progress' },
        // { titulo: 'Gráficas', url: 'grafica1' },
      ]
    },
    {
      seccion: 'Gestión R. Humanos',
      titulo: 'Usuarios',
      icono: 'mdi mdi-account-star-variant',
      submenu: [
        { titulo: 'Persona', url: '/admin/dashboard/persona' },
        { titulo: 'Usuario', url: '/admin/dashboard/usuario' },
        { titulo: 'Roles', url: '/admin/dashboard/roles' },
        // { titulo: 'ProgressBar', url: 'progress' },
        // { titulo: 'Gráficas', url: 'grafica1' },
      ]
    }
  ]

  constructor() { }
}
