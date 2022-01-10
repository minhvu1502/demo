import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Demo';
  isActive = 1;
  constructor() {
  }
  changeActive(data : any){
    this.isActive = data;
  }
}
