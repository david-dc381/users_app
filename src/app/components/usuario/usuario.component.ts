import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/servicios/usuario.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  usuario: any;
  usuario2: any;
  femenino: boolean;
  country: any;
  canada: boolean;
  usuario3: any;
  userData: any;

  constructor(private servicioUsuario: UsuarioService) {
    this.femenino = false;
    this.canada = false;
  }

  ngOnInit(): void {
    // Programación Orientada a servicios, porque se divide en un servicio los datos
    this.servicioUsuario.obtenerUsuario().subscribe({
      next: (user) => {
        // console.log(user);
        this.usuario = user['results'];
        console.log(this.usuario);
      },

      error: (error) => {
        console.log(error);
      },

      complete: () => {
        console.log('solicitud completa');
      },
    });
  }

  showFemale(): void {
    this.servicioUsuario.obtenerUsuarioMasculino().subscribe({
      next: (user) => {
        console.log(user);
        this.usuario2 = user['results'][0];
        this.femenino = true; // ponemos true para que en el ngIf en la vista nos muestre los datos
      },

      error: (error) => {
        console.log(error);
      },
    });
  }

  showCountry(): void {
    this.servicioUsuario.getCanada().subscribe({
      next: (user) => {
        // console.log(user);
        this.country = user['results'][0];
        this.canada = true;
      },
    });
  }

  mostrarElementos(): void {
    this.servicioUsuario.obtenerCantidadElementos().subscribe({
      next: user => {
        console.log(user);
      },

      error: error => {
        console.log(error);
      }
    })
  }

  MostrarFoto(): void {
    this.servicioUsuario.obtenerFoto().subscribe({
      next: user => {
        console.log(user);
        // los datos que estan en la posicion de cero que son name y picture los pasamos al this.usuario3
        this.usuario3 = user[0];
      },

      error: error => {
        console.log(error);
      }
    })
  }

  showInformation(): void {
    this.servicioUsuario.userInformation().subscribe({
      next: user => {
        console.log(user);

        this.userData = user[0];
      },

      error: error => {
        console.log(error);
      }
    })
  }


}
