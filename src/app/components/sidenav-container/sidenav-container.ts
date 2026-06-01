import { Component, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-sidenav-container',
  imports: [
    MatButton,
    MatTooltip,
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
