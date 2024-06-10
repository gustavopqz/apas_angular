import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'; // Importar MatTableDataSource
import { DoacoesService } from '../../../services/doacoes.service';
import { Doacoes } from '../../../modules/doacoes.model';

@Component({
  selector: 'app-relatorio-doacoes',
  templateUrl: './relatorios-doacoes.component.html',
  styleUrls: ['./relatorios-doacoes.component.scss'], 
  standalone: true,
  imports: [MatTableModule, CommonModule],
  providers: [MatTableDataSource]
})
export class RelatorioDoacoesComponent implements OnInit {
  displayedColumns: string[] = ['data', 'doador', 'descricao', 'valor'];
  dataSource = new MatTableDataSource<Doacoes>(); // Use MatTableDataSource

  constructor(private doacoesService: DoacoesService) { }

  ngOnInit(): void {
    this.getDoacoesCompletas();
  }

  resposta?: any

  getDoacoesCompletas(): void {
    this.doacoesService.getDoacoesCompletas().subscribe((response) => {
      this.resposta = response 
      this.dataSource.data = this.resposta;  // Atribua os dados ao MatTableDataSource
    }, (error: any) => {
      console.error('Erro ao buscar doações', error);
    });
  }
}

