import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = 'https://randomuser.me/api/?results=100';

  constructor( public http: HttpClient ) { }

  obtenerUsuario(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  get datos() {
    return this.url;
  }

  getUser(idx: number) {
    return this.url [idx];
  }

  // obtenemos usuario másculino para que no se muestren, por eso le ponemos != name
  obtenerUsuarioMasculino(): Observable<any> {
    return this.http.get<any>(this.url).
    // en este caso pipe en este caso es para añadir operadores
      pipe (
        filter(
          usuario => usuario['results'][0].gender != 'male'
        )
      )
  }

  // Para obtener un país distinto de Cánada
  getCanada(): Observable<any> {
    return this.http.get<any>(this.url).
      pipe (
        filter ( // filtra los resultados
          usuario => usuario['results'][0].location.country !== 'Canada'
        )
      )
  }

  obtenerCantidadElementos(): Observable<any> {
    return this.http.get<any>(this.url).
      pipe (
        take(1) // le dices cuantos elementos quieres
      );
  }

  // map realiza transformaciones en los valores emitidos por el observable.
// El operador map funciona de la misma manera que el map de ECMA Script 6.
  obtenerFoto(): Observable<any> {
    return this.http.get<any>(this.url).
      pipe(
        map( resp => {
          console.log(resp);
          // recorremos el array con el map para darle un nuevo array
          return resp['results'].map((usuario: any) => {
            console.log(usuario);

            // en ese nuevo array vamos a obtener el name y picture, name: y picture: son nuevos valores que nos creamos donde guardamos los valores de name y picture que obtenemos de usuario
            return {
              name: usuario.name,
              picture: usuario.picture
            }
          })
        })
      )
    
  }


  userInformation(): Observable<any> {
    return this.http.get<any>(this.url).
      pipe(
        map( resp => {
          return resp['results'].map((user: any) => {
            console.log(user)

            return {
              picture: user.picture,
              name: user.name,
              email: user.email,
              login: user.login
            }

          })
        })
      )
  }

}
