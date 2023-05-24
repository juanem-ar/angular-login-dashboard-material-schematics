import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IContacto } from 'src/app/models/contact.interface';
import { IRandomContact } from 'src/app/models/randomUser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{

  constructor(private router: Router){}

  token: string | null | undefined;

  contactoSeleccionado: IRandomContact | undefined;

  ngOnInit(): void {
    // Comrpobamos si existe el token en el sessionStorage
    this.token = sessionStorage.getItem('token')
    
    // leemos el contacto guardado en el historial de navegacion
    if(history.state.data){
      this.contactoSeleccionado = history.state.data;
      console.log(history.state.data)
    }
  }

  navegarAContacts():void{
    let navigationExtras: NavigationExtras = {
      queryParams: {
        // order: '' se pueden filtrar los envios de datos con cualquier tipo de regla de negocio
         sexo: 'todos' 
      }
    }

    this.router.navigate(['/dashboard/contacts'], navigationExtras);
  }

}
