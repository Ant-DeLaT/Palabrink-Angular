import { Component, inject } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { MatSidenavModule } from '@angular/material/sidenav';
@Component({
  selector: 'app-sidebar',
  imports: [MatSidenavModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class Sidebar {
  public headerService = inject(HeaderService);
}
