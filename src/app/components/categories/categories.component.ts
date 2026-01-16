import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  counter : number = 0;

  increaseCounter(){
    this.counter = this.counter + 1;
  }
  decreaseCounter(){
    this.counter = this.counter - 1;
  }
}
