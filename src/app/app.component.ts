import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  setMode = false;
  
  onRecivedTheme(event: boolean){
    this.setMode = event;
  }
}
