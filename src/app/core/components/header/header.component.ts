import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HeaderService } from '../../services/header.service';
import { SideBarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-header',
  imports: [MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class Header {
  public titleService = inject(HeaderService);
  public sideBarService= inject(SideBarService);
}
