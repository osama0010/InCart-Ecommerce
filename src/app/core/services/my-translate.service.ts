import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, Renderer2, RendererFactory2, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {

  private readonly _TranslateService = inject(TranslateService)
  private readonly PLATFORM_ID = inject(PLATFORM_ID)
  private readonly Renderer2 = inject(RendererFactory2).createRenderer(null, null);
  // to prevent xss attacks and instead of directly manipulating the DOM

  constructor() {
    // Logic here
    if (isPlatformBrowser(this.PLATFORM_ID)) {

      // set default language
      this._TranslateService.setDefaultLang('en'); //To work as a fallback

      this.setLanguage();
    }

  }

  setLanguage(): void {
    let savedLanguage = localStorage.getItem('lang');

    // use saved language local or default to 'en'
    if (savedLanguage) {
      this._TranslateService.use(savedLanguage);
    } else {
      this._TranslateService.use('en');
    }
    // change direction
    // Direction EN => LTR, AR => RTL
    if (savedLanguage === 'en') {
      // document.documentElement.dir = 'ltr';
      this.Renderer2.setAttribute(document.documentElement, 'dir', 'ltr');
      this.Renderer2.setAttribute(document.documentElement, 'lang', 'en');

    } else if (savedLanguage === 'ar') {
      this.Renderer2.setAttribute(document.documentElement, 'dir', 'rtl');
      this.Renderer2.setAttribute(document.documentElement, 'lang', 'ar');

    }

  }

  changLang(lang: string): void {
    if (isPlatformBrowser(this.PLATFORM_ID)) {
      // Save language to local storage
      localStorage.setItem('lang', lang);
      // change language using ngx-translate
      this._TranslateService.use(lang);
      // change direction
      this.setLanguage();
    }
  }

}
