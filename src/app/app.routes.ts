import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { HomeComponent } from './pages/layout/home/home.component';
import { CadastroAdminComponent } from './pages/layout/cadastro-admin/cadastro-admin.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
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
