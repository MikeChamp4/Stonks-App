import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { InputSwitchModule } from 'primeng/inputswitch';


@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePageComponent {
  themeSelection: boolean = false;
  checked: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document){
    let theme = localStorage.getItem('theme');

    if(theme){
      this.themeSelection = theme == 'dark' ? true : false;
      this.changeThemeBasedOnBoolean(this.themeSelection);
    }
  }

  changeThemeBasedOnBoolean(state: boolean) {
    let theme = state ? 'dark' : 'light';
    window.localStorage.setItem('theme', theme);
    let themeLink = this.document.getElementById ('app-theme') as HTMLLinkElement;
    themeLink.href = `lara-${theme}-blue.css`;
  }

  changeTheme(event: Event) {
    let state = (event.target as HTMLInputElement).checked;
    this.changeThemeBasedOnBoolean(state);
  }
}
