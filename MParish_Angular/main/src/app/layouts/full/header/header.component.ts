import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    CommonModule,
    NgScrollbarModule,
    TablerIconsModule,
    MaterialModule,
    MatBadgeModule
  ],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Input() isOver = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  constructor(public theme: ThemeService) {}

  onHamburgerClick() {
    if (this.isOver) {
      console.log('[Header] Hamburger click: mobile mode (isOver=true) -> emit toggleMobileNav');
      this.toggleMobileNav.emit();
    } else {
      console.log('[Header] Hamburger click: desktop mode (isOver=false) -> emit toggleCollapsed AND toggleMobileNav');
      // Emit collapse for desktop layout styling, and also toggle sidenav open state for immediate visual feedback
      this.toggleCollapsed.emit();
      this.toggleMobileNav.emit();
    }
  }

  toggleTheme() {
    this.theme.toggle();
  }
}