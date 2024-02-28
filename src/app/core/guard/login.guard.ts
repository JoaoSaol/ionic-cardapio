import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '../services/account/account.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService, 
        private localStorageService: LocalStorageService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const logado = this.localStorageService.get('logado');
        if (logado) {
          this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
          console.log('Logged in'); // Example: Just logging in
          return true;
        } else { 
          console.log('Not logged in'); // Example: Just logging out
          // not logged in so redirect to login page with the return url
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
          return false;
        }
    }
}