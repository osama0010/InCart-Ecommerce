import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {
  constructor(private _OrdersService: OrdersService, private _ActivatedRoute :ActivatedRoute) { }

  userId: string = '';
  cartOrders: any[] = [];

  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe(params => {
      this.userId = params.get('Id') ?? '';
    });

    this._OrdersService.getAllOrders(this.userId).subscribe({
      next: (response) => {
        this.cartOrders = response.totalOrderPrice;
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}