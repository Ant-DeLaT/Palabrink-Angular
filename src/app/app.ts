import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './core/components/header/header.component';
import { Footer } from './core/components/footer/footer.component';
import { Sidebar } from './core/components/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderService } from './core/services/header.service';
import { SideBarService } from './core/services/sidebar.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Sidebar, MatSidenavModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Palabrink');
  public sideBarService = inject(SideBarService);
  public headerService = inject(HeaderService);
}
