import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgOptimizedImage } from '@angular/common';
import { BtnFlutuanteComponent } from '../../components/btn-flutuante/btn-flutuante.component';
import { AdministradoresService } from '../../services/administradores.service';
import { Administradores } from '../../modules/administrador.module';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, NgOptimizedImage, BtnFlutuanteComponent],
  providers: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {

  todosAdministradores?: Administradores[];

  constructor(private adminService: AdministradoresService){
  }
  
  ngOnInit(): void {
    this.getAdmins();
  }

  getAdmins(): void{
    this.adminService.getTodosAdmins()
    .subscribe(admins =>{
      this.todosAdministradores = admins as unknown as Administradores[]
      console.log(this.todosAdministradores)
      this.todosAdministradores.forEach(element => {
        console.log(element)
      });
    })    
  }


}
