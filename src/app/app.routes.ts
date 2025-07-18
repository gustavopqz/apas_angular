import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { HomeComponent } from './pages/layout/home/home.component';
import { CadastroAdminComponent } from './pages/layout/cadastro-admin/cadastro-admin.component';
import { LandingComponent } from './pages/landing/landing.component';
import { AcompanhamentoComponent } from './pages/acompanhamento/acompanhamento.component';
import { RelatoriosGastosComponent } from './pages/layout/relatorios-gastos/relatorios-gastos.component';
import { RelatorioDoacoesComponent } from './pages/layout/relatorios-doacoes/relatorios-doacoes.component';
import { DoacoesComponent } from './pages/doacoes/doacoes.component';
import { PatrocinadoresComponent } from './pages/patrocinadores/patrocinadores.component';
import { EsqueciSenhaComponent } from './pages/esqueci-senha/esqueci-senha.component';
import { AlteraSenhaComponent } from './pages/altera-senha/altera-senha.component';
import { adminGuard } from './guards/admin.guard'
import { AcessoNegadoComponent } from './pages/acesso-negado/acesso-negado.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingComponent
    },
    {
        path: 'acesso-negado',
        component: AcessoNegadoComponent
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
        path: 'patrocinios',
        component: PatrocinadoresComponent,
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'esqueci-senha',
        component: EsqueciSenhaComponent
    },
    {
        path: 'altera-senha',
        component: AlteraSenhaComponent
    },
    {
        path: 'painel',
        component: LayoutComponent,
        canActivate: [adminGuard],
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
                component: RelatorioDoacoesComponent
            },

            {
              path: '',
              redirectTo: 'home',
              pathMatch: 'full'
            }
        ]
    }
];