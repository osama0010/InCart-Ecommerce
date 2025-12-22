import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(products: any[], input: string): any[] | null {
    return products.filter( (product) => product.title.toLowerCase().includes(input.toLowerCase()));
  }

}
