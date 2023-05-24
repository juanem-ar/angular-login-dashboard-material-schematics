import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { IContacto } from 'src/app/models/contact.interface';
import { LISTA_CONTACTOS } from 'src/app/mocks/contacts.mock';
import { ContactService } from 'src/app/services/contact.service';
import { RandomUserService } from 'src/app/services/random-user.service';
import { IRandomContact, Results } from 'src/app/models/randomUser';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit{

  // listaContactosAMostrar: IContacto[] = [];
  cargando: boolean = true;

  filtroSexo: string = 'todos';
  listaRandomUserContacts: IRandomContact[] = [];

  constructor(private route: Router, private router:ActivatedRoute, /*private contactService: ContactService,*/
    private randomUserService: RandomUserService){}

  ngOnInit(): void {
    // // se capturan los query params para mostrar los contactos
    this.router.queryParams.subscribe((params: any)=>
    {
      console.log('Query params:' + params.gender);
      if(params.gender){

        this.filtroSexo = params.gender;

        if(params.gender == 'female' || params.gender == 'male'){

          this.randomUserService.obtenerRandomContacts(10, params.gender).subscribe({
            next:(response: Results)=>{
              response.results.forEach((contact: IRandomContact)=>{
                this.listaRandomUserContacts.push(contact);
              })
              console.log(this.listaRandomUserContacts);
            },
            error:(error)=>{
              console.error(`Ha ocurrido un error: ${error}`);
            },
            complete:()=>{
              console.info("Peticion de lista de random contact finalizada.");
              this.cargando = false;
            }
          });

        }
      }else{
        //Implementacion para obtener la lista de contactos de forma aleatoria
        this.randomUserService.obtenerRandomContacts(10).subscribe({
          next:(response: Results)=>{
            response.results.forEach((contact: IRandomContact)=>{
              this.listaRandomUserContacts.push(contact);
            })
            console.log(this.listaRandomUserContacts);
          },
          error:(error)=>{
            console.error(`Ha ocurrido un error: ${error}`);
          },
          complete:()=>{
            console.info("Peticion de lista de random contact finalizada.");
            this.cargando = false;
          }
        })
      }
      // TODO SE CAMBIO LA CONSULTA DEL LISTADO DE CONTACTOS POR EL DE ABAJO
      // this.contactService.obtenerContactos(this.filtroSexo).then((lista)=>this.listaContactosAMostrar = lista).catch((error)=>console.error(`Ha ocurrido un error. ${error}`)).finally(()=>console.info('Ha finalizado la operación de obtener la lista de contacto.'))

    
    });
  }

  // Ejemplo de paso de info entre componentes a travez del estado (por parametros)

  
  volverAHome(contact: IRandomContact){

    let navigationExtras: NavigationExtras = {
      state: {
        data: contact
      }
    }
    this.route.navigate(['/dashboard/home'], navigationExtras);
  }

}
