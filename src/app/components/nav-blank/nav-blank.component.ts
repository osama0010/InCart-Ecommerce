import { Component, computed, inject, OnInit, Signal, WritableSignal } from '@angular/core';
import { RouterLinkActive, RouterLink } from "@angular/router";
import { AuthService } from '../../core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit {

  readonly _AuthService = inject(AuthService);
  readonly _MyTranslateService = inject(MyTranslateService);
  readonly _TranslateService = inject(TranslateService);
  readonly _CartService = inject(CartService);

  changeLanguage(lang: string): void {
    // 1. change language using ngx-translate
    this._MyTranslateService.changLang(lang);
  }

  countCartItems:Signal<number> = computed(() => this._CartService.CartNumber());

  ngOnInit(): void {

    this._CartService.getProductsCart().subscribe({
      next: (response) => {
        this._CartService.CartNumber.set(response.numOfCartItems);
      }
    });

    // // Used for BehabiorSubject
    // this._CartService.CartNumber.subscribe({
    //   next: (data) => {
    //     this.countCartItems = data;
    //   }
    // })

    
  }

  // SignOut(): void
  // {
  //   this._AuthService.logOut();
  // }

}
