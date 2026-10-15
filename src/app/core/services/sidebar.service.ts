import { signal, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SideBarService {
  sidebarOpen = signal(false);
  // por qué no "function?"
  toggleSideBar(): void {
    this.sidebarOpen.set(!this.sidebarOpen());
  }
}
