import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { IRandomContact, Results } from 'src/app/models/randomUser';
import { RandomUserService } from 'src/app/services/random-user.service';

@Component({
  selector: 'app-random-contact-page',
  templateUrl: './random-contact-page.component.html',
  styleUrls: ['./random-contact-page.component.scss']
})
export class RandomContactPageComponent implements OnInit{

  contact: IRandomContact | undefined;
  contactList: Results | undefined;

  constructor(private randomUserService: RandomUserService){}
 
  ngOnInit(): void {
    this.obtenerNuevoContacto();
  }

  obtenerNuevoContacto():void{
    this.randomUserService.obtenerRandomContact().subscribe({
      next:(response: Results)=>{
        this.contact = response.results[0]; //una vez que tenemos el contacto, se lo pasamos al componente randomUser para que lo muestre
      },
      error:(error)=>{
        console.error(`Ha ocurrido un error: ${error}`)
      },
      complete:()=>{
        console.info("Peticion de random contact finalizada.")
      }
    })
  }

  obtenerListaContactos(n:number){
    this.randomUserService.obtenerRandomContacts(n).subscribe({
      next:(response: Results)=>{
        this.contactList = response;
        console.log(response);
      },
      error:(error)=>{
        console.error(`Ha ocurrido un error: ${error}`)
      },
      complete:()=>{
        console.info("Peticion de lista de random contact finalizada.")
      }
    })
  }

  obtenerNuevoContactoPorGenero(sexo: string):void{
    this.randomUserService.obtenerRandomContacts(10, sexo).subscribe({
      next:(response: Results)=>{
        this.contact = response.results[0]; //una vez que tenemos el contacto, se lo pasamos al componente randomUser para que lo muestre
      },
      error:(error)=>{
        console.error(`Ha ocurrido un error: ${error}`)
      },
      complete:()=>{
        console.info("Peticion de contacto por genero finalizada.")
      }
    })
  }

}
