import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Doacoes } from '../../../modules/doacoes.model';

@Component({
  selector: 'app-relatorios-doacoes',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './relatorios-doacoes.component.html',
  styleUrl: './relatorios-doacoes.component.scss'
})

export class RelatoriosDoacoesComponent {
  displayedColumns: string[] = ['data', 'doador', 'descricao', 'valor'];
  dataSource: Doacoes[] = [
    // { data: '2024-04-01', doador: 'Pasquinha', descricao: 'Valor em dinheiro', valor: 'R$ 1000,00' },
    // { data: '2024-04-01', doador: 'Fefinho', descricao: 'Valor em ração', valor: 'R$ 600,00' },
    // { data: '2024-04-01', doador: 'Gugu', descricao: 'Valor em Medicação', valor: 'R$ 900,00' },
    // { data: '2024-04-01', doador: 'Cesinha', descricao: 'Valor em dinheiro', valor: 'R$ 500,00' },
    // { data: '2024-04-01', doador: 'Vivi', descricao: 'Valor em ração', valor: 'R$ 300,00' },
  ]
 }
