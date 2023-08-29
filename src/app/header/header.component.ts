import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() selectedTheme = new EventEmitter<boolean>();

  isDarkTheme = false;

  onToggleTheme(){
    this.isDarkTheme = !this.isDarkTheme
    this.selectedTheme.emit(this.isDarkTheme);
  }
}
