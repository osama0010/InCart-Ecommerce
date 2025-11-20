import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriesService);


  productsList:IProduct[] = [];
  categoriesList:ICategory[] = [];

  getAllProductsSub!:Subscription

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.

    this._CategoriesService.getAllCategories().subscribe({
      next: (response) => {
        console.log('Categories:', response);
        this.categoriesList = response.data;
      },
      error: (error) => {
        console.log('Error fetching categories:', error);
      }
    });

    this.getAllProductsSub = this._ProductsService.getAllProducts().subscribe({
      next: (response) => {
        console.log('Products:',response);
        this.productsList = response.data;
      },
      error: (error) => {
        console.log(error);
      }
    });

  }


  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.getAllProductsSub?.unsubscribe();
  }


}
