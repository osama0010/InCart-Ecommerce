import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { HomeComponent } from '../home/home.component';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)



  productDetails: IProduct | null = null

  customOptionsProdDetes: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplayTimeout: 5000,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true
  }


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        let productId = params.get('ID')
        // logic api ----- to call api specific product
        this._ProductsService.getSpecificProduct(productId).subscribe({
          next: (res) => {
            console.log(res);
            this.productDetails = res.data
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
    })
  }



  addToCart(productId: string): void {
    this._CartService.addProductToCart(productId).subscribe({
      next: (response) => {
        console.log('Product added to cart:', response);
        // alert('Product added to cart successfully!');
        this._ToastrService.success(response.message, 'Success');
      },
      error: (error) => {
        console.log('Error adding product to cart:', error);
        alert('Failed to add product to cart.');
      }
    });
  }

}
