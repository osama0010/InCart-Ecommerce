import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriesService);


  productsList:IProduct[] = [];
  categoriesList:ICategory[] = [];

  getAllProductsSub!:Subscription

  customOptionsCateg: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }

    customOptionsMainSlide: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true
  }


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
