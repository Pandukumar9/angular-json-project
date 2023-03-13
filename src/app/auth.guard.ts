import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DatashareService } from './public/providers/datashare.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: DatashareService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isLogged()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
