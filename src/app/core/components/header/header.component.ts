import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HeaderService } from '../../services/header.service';
import { SideBarService } from '../../services/sidebar.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FirebaseCnUsers } from '../../../auth/services/firebase-cn-users';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class Header {
  public firebaseCnUsers = inject(FirebaseCnUsers);
  public titleService = inject(HeaderService);
  public sideBarService = inject(SideBarService);

  public selectedUserImage = computed(
    () => this.firebaseCnUsers.selectedUser()?.photoURL ?? 'images/IconoPerfilXS.png',
  );
}
