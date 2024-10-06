// transmission.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EnviardatosService {
    private itemSubject: BehaviorSubject<any> = new BehaviorSubject(null);

    // Método para establecer el nuevo valor
    public setItem(item: any): void {
        this.itemSubject.next(item);
    }

    // Método para obtener el observable
    public getItem(): Observable<any> {
        return this.itemSubject.asObservable();
    }
}
