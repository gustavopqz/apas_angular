import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { HomeComponent } from './pages/layout/home/home.component';
import { CadastroAdminComponent } from './pages/layout/cadastro-admin/cadastro-admin.component';
import { LandingComponent } from './pages/landing/landing.component';
import { AcompanhamentoComponent } from './pages/acompanhamento/acompanhamento.component';
import { RelatoriosGastosComponent } from './pages/layout/relatorios-gastos/relatorios-gastos.component';
import { RelatoriosDoacoesComponent } from './pages/layout/relatorios-doacoes/relatorios-doacoes.component';
import { DoacoesComponent } from './pages/doacoes/doacoes.component';

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
        path: 'doacoes',
        component: DoacoesComponent
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
                path: 'relatorios-gastos',
                component: RelatoriosGastosComponent
            },
            {
                path: 'relatorios-doacoes',
                component: RelatoriosDoacoesComponent
            },
            {
              path: '',
              redirectTo: 'home',
              pathMatch: 'full'
            }
        ]
    }
];
