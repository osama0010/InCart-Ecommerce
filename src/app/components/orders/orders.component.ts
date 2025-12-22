import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

  private _ActivatedRoute = inject(ActivatedRoute);
  private _OrdersService = inject(OrdersService);


  orders: FormGroup = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null),
  });

  cartId: string = '';

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(params => {
      this.cartId = params.get('Id') ?? '';
      console.log(this.cartId);
    });
  }

  ordersSubmit() {
    console.log(this.orders.value);

    this._OrdersService.CheckOut(this.cartId, this.orders.value).subscribe({
      next: (response) => {
        console.log(response);
        if(response.status === "success"){
          window.open(response.session.url, "_self");
        }
      },
      error: (err) => {
        console.log(err);
      }
    });

  }


}
