import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PlaceholderPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'placeholder',
})
export class PlaceholderPipe implements PipeTransform {
  
  transform(value: string, defecto: 'Titulo') {
    return value ? value: defecto;
  }
}
