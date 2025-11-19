import { Component, inject } from '@angular/core';
import { RouterLinkActive, RouterLink } from "@angular/router";
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent {

  readonly _AuthService = inject(AuthService);

  // SignOut(): void
  // {
  //   this._AuthService.logOut();
  // }

}
