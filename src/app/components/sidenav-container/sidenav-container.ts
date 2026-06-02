import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-sidenav-container',
  imports: [
    MatTooltip,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './sidenav-container.html',
  styleUrl: './sidenav-container.scss'
})
export class SidenavContainer {
  addTargetEmitter = output<void>();
  showConfigEmitter = output<void>();

  async addTarget() {
    this.addTargetEmitter.emit();
  }

  async showConfig() {
    this.showConfigEmitter.emit();
  }
}
