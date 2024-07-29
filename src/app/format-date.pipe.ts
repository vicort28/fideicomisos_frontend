import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    // Convierte la fecha en una instancia de Date
    const date = new Date(value);
    // Devuelve la fecha en formato 'dd/MM/yyyy'
    return date.toLocaleDateString('es-ES');
  }
}
