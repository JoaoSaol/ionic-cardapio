import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  logout() {
    this.localStorageService.set('logado', false);
    this.router.navigate(['/login']);
    console.log('Logged out'); // Example: Just logging out
  }

}
