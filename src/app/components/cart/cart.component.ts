import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2'
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  private readonly _CartService = inject(CartService);

  CartDetails: ICart = {} as ICart;

  ngOnInit(): void {
    this._CartService.getProductsCart().subscribe({
      next: (response) => {
        console.log(response.data);
        this.CartDetails = response.data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  removeProduct(id: string): void {
    this._CartService.deleteSpecificCartProduct(id).subscribe({
      next: (response) => {
        console.log(response);
        this.CartDetails = response.data;
        this._CartService.CartNumber.set(response.numOfCartItems);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }


  updateCount(id: string, newCount: number): void {
    if (newCount > 0) {
      this._CartService.updateProductQuantity(id, newCount).subscribe({
        next: (response) => {
          console.log(response);
          this.CartDetails = response.data;
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  Clearcart(): void {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you really want to clear your cart?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, clear it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.isConfirmed) {
      // The user clicked YES → Now clear the cart
      this._CartService.ClearCart().subscribe({
        next: (response) => {
          console.log(response);
          this.CartDetails = {} as ICart;
          Swal.fire('Cleared!', 'Your cart has been emptied.', 'success');
          this._CartService.CartNumber.set(0);
        },
        error: (err) => {
          console.error(err);
          Swal.fire('Error', 'Something went wrong.', 'error');
        }
      });

    }
  });
}


  // ngOnChanges(changes: SimpleChanges): void {
  //   // Handle changes if necessary
  // }

}
