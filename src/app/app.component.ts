import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarBlnakComponent } from "./components/navbar-blnak/navbar-blnak.component";
import { NavbarAuthComponent } from "./components/navbar-auth/navbar-auth.component";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarBlnakComponent, NavbarAuthComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ecommerce';
}
