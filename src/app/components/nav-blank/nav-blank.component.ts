import { Component, inject } from '@angular/core';
import { RouterLinkActive, RouterLink } from "@angular/router";
import { AuthService } from '../../core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/my-translate.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent {

  readonly _AuthService = inject(AuthService);
  readonly _MyTranslateService = inject(MyTranslateService);
  readonly _TranslateService = inject(TranslateService);

  changeLanguage(lang: string): void {
    // 1. change language using ngx-translate
    this._MyTranslateService.changLang(lang);
  }


  // SignOut(): void
  // {
  //   this._AuthService.logOut();
  // }

}
