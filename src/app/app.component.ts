import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isHeaderVisible!: boolean;

  constructor(private router: Router) {


  this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      if (event.url === '/' || event.url === '/register') {
        this.isHeaderVisible = false;
      } else {
        this.isHeaderVisible = true;
      }
    }
  });
}

}
