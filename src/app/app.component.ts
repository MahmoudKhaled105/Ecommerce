import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NavbarAuthComponent } from "./components/navbar-auth/navbar-auth.component";
import { NavbarBlnakComponent } from "./components/navbar-blnak/navbar-blnak.component";
import { NgxSpinnerModule } from 'ngx-spinner';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarBlnakComponent, NavbarAuthComponent, FormsModule, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ecommerce';
}
