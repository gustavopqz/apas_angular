import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterModule, RouterOutlet, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list'

// NavRotes 
import { dataSource } from './navroutes'

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, RouterOutlet, MatToolbarModule, MatSidenavModule, MatListModule, CommonModule, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent{
 
  navRoutes :any = dataSource


}
