import { Component } from '@angular/core';
import { NavbarBlnakComponent } from "../../components/navbar-blnak/navbar-blnak.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";


@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [NavbarBlnakComponent, RouterOutlet, FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.scss',
})
export class BlankLayoutComponent {}
