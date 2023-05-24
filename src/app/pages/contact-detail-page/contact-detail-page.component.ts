import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRandomContact } from 'src/app/models/randomUser';

@Component({
  selector: 'app-contact-detail-page',
  templateUrl: './contact-detail-page.component.html',
  styleUrls: ['./contact-detail-page.component.scss']
})
export class ContactDetailPageComponent implements OnInit{
  
  contacto: IRandomContact | undefined;
  history : any = history.state;
  id: any | undefined;
  filtroPrevio:string = 'todos';


  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {

    // va a leer la url, se va a suscribir, y en caso de que se haya establecido el query param "id", se lo va a asignar a la variable "id" creada.
    this.route.params.subscribe(
      (params: any) => {
        if(params.id){
          this.id = params.id;
        }
      }
    );
    // Si esta en el historial de navegacion el objeto, se lo asigna a la variable contacto y ya podemos manipular el objeto desde el html
    if(this.history.data){
      this.contacto = this.history.data;
    }
    if(this.history.filtro){
      this.filtroPrevio = this.history.filtro;
    }
  }

}
