import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Gastos } from '../../../modules/gastos.module';

@Component({
  selector: 'app-relatorios-gastos',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule, MatTableModule],
  templateUrl: './relatorios-gastos.component.html',
  styleUrl: './relatorios-gastos.component.scss'
})

export class RelatoriosGastosComponent {
  displayedColumns: string[] = ['data', 'descricao', 'valor'];
  dataSource: Gastos[] = [
    { data: '2024-04-01', descricao: 'Ração', valor: 'R$ 680,00' },
    { data: '2024-04-02', descricao: 'Medicamentos', valor: 'R$ 450,00' },
    { data: '2024-04-02', descricao: 'Aluguel', valor: 'R$ 700,00' },
    { data: '2024-04-02', descricao: 'Embasa', valor: 'R$ 425,00' },
    { data: '2024-04-02', descricao: 'Coelba', valor: 'R$ 500,00' }
  ]
 }

