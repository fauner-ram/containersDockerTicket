import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NgZorroModule } from '../../ng-zorro.module';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NgZorroModule,
    RouterModule
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayoutComponent implements OnInit {

  isCollapsed = false;
  menu = [

    {
      id: 0,
      // icon: 'appstore',
      icon: '../../../assets/img/dashboard.png',
      title: 'Dashboard',
      link: '/tiket'
    },

    {
      id: 1,
      icon: '../../../assets/img/settings.png',
      title: 'Settings',
      link: '/tiket'
    },

  ]

  constructor(private router: Router) { }
  ngOnInit(): void {
    // if (window.innerWidth < 768 ) {
    //   this.isCollapsed = true;
    // }
   }

  onCollapse(collapsed: boolean): void {
    this.isCollapsed = collapsed;
  }
  
  closeSession() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }


}
