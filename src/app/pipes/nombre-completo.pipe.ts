import { Pipe, PipeTransform } from '@angular/core';
import { IRandomContact } from '../models/randomUser';

@Pipe({
  name: 'nombreCompleto'
})
export class NombreCompletoPipe implements PipeTransform {

  transform(value: IRandomContact, ...args: unknown[]): string {
    return value.name.title + " " + value.name.first + " " + value.name.last;
  }

}
