import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-kanban-tasks',
  templateUrl: './kanban-tasks.component.html',
  styleUrls: ['./kanban-tasks.component.scss'],
})
export class KanbanTasksComponent {
  todo = [
    'Aprender Animaciones en Angular',
    'Aprender a Gestionar Angular CLI',
    'Aprender a hacer una build en Angular',
    'Aprender a desplegar bundle de Angular'
  ];
  haciendo = [
    'algo'
  ];

  done = [
    'Aprender JS y ES',
    'Aprender TS',
    'Instalar Angular',
    'Configurar IDE',
    'Crear Hola Mundo Angular',
    'Aprender a gestionar componentes en Angular',
    'Aprender a gestionar servicios en Angular',
    'Aprender a gestionar pipes en Angular',
    'Aprender a gestionar directives en Angular',
    'Aprender a gestionar guards en Angular',
    'Aprender a gestionar peticiones HTTP en Angular',
    'Aprender a gestionar Angular Material y Schematics en Angular',
  ];

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
    }
  }
}
