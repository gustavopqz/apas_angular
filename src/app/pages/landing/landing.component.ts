import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, NgOptimizedImage],
  providers: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
