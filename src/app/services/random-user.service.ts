import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Results } from '../models/randomUser';

@Injectable({
  providedIn: 'root'
})
export class RandomUserService {

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse){
    if(error.status === 0){
      console.error(`Ha ocurrido un error: ${error.error}`);
    }else{
      console.error(`Error en el backend: ${error.status}. El error es: ${error.error}`);
    }
    return throwError(
      ()=> new Error('Error en la petición de contacto aleatorio')
    );
  }

  obtenerRandomContact():Observable<Results>{
    // El servicio no tiene q estar encargado de crear el objeto, para eso utilizamos un componente.
    return this.http.get<Results>('https://randomuser.me/api').pipe(
      retry(2),  //numero de intento de peticiones, sino sale se envia el error
      catchError(this.handleError)
      // hay q agregar la posibilidad de recibir un error al suscribirse desde el componente q llame al servicio
    );
  }

  obtenerRandomContacts(n:number, gender?:string):Observable<Results>{
    
    // la api randomuser.com/api (https://randomuser.me/) opuede recibir parametros para obtener distintos tipos de datos, por ejemplo la cantidad de contactos que va a traer
    let opciones: HttpParams = new HttpParams().set('results', n);

    if(gender){
      opciones = opciones.append("gender", gender);
    }

    return this.http.get<Results>('https://randomuser.me/api', { params: opciones}).pipe(
      retry(2),  //numero de intento de peticiones, sino sale se envia el error
      catchError(this.handleError)
      // hay q agregar la posibilidad de recibir un error al suscribirse desde el componente q llame al servicio
    );
  }


  // obtenerRandomContactPorGenero(sexo: string):Observable<IRandomContact>{
  //   // la api randomuser.com/api (https://randomuser.me/) opuede recibir parametros para obtener distintos tipos de datos, por ejemplo la cantidad de contactos que va a traer
  //   const opciones: HttpParams = new HttpParams().set('gender', sexo);
  //   return this.http.get<IRandomContact>('https://randomuser.me/api', { params: opciones}).pipe(
  //     retry(2),  //numero de intento de peticiones, sino sale se envia el error
  //     catchError(this.handleError)
  //     // hay q agregar la posibilidad de recibir un error al suscribirse desde el componente q llame al servicio
  //   );
  // }
  
}
