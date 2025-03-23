import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { GastosService } from '../../../services/gastos.service';
import { Gastos } from '../../../modules/gastos.module';

@Component({
  selector: 'app-relatorios-gastos',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule, MatTableModule, FormsModule, CommonModule], // Adicionar CommonModule aqui
  templateUrl: './relatorios-gastos.component.html',
  styleUrls: ['./relatorios-gastos.component.scss']
})
export class RelatoriosGastosComponent implements OnInit {
  displayedColumns: string[] = ['data', 'descricao', 'valor'];
  dataSource: Gastos[] = [];
  novoGasto: Gastos = { data: new Date(), descricao: '', valor: 0 };

  constructor(private gastosService: GastosService) { }

  ngOnInit(): void {
    this.carregarGastos();
  }

  carregarGastos(): void {
    this.gastosService.getGastos().subscribe(
      (data: Gastos[]) => {
        this.dataSource = data;
        // console.log(this.dataSource); // Adicione este log para verificar os dados
      },
      (error: any) => {
        console.error('Erro ao carregar gastos', error);
      }
    );
  }

  adicionarGasto(): void {
    this.gastosService.addGasto(this.novoGasto).subscribe(
      (data: Gastos) => {
        this.dataSource.push(data);
        this.dataSource = [...this.dataSource]; // Atualiza a tabela
        this.novoGasto = { data: new Date(), descricao: '', valor: 0 }; // Reseta o formulário
      },
      (error: any) => {
        console.error('Erro ao adicionar gasto', error);
      }
    );
  }
}
