import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { HomeComponent } from './pages/layout/home/home.component';
import { CadastroAdminComponent } from './pages/layout/cadastro-admin/cadastro-admin.component';
import { LandingComponent } from './pages/landing/landing.component';
import { AcompanhamentoComponent } from './pages/acompanhamento/acompanhamento.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingComponent
    },
    {
        path: 'acompanhamento',
        component: AcompanhamentoComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'painel',
        component: LayoutComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'cadastro-admin',
                component: CadastroAdminComponent
            },
            {
              path: '',
              redirectTo: 'home',
              pathMatch: 'full'
            }
        ]
    }
];
