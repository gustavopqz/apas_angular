export interface Doacoes {  
  id_pagamento: string,
  doadorNome: string,
  email: string,
  valor: number,
  mensagem: string,
  img: string,
  tipoDoacao: string,
  descricao: string,
  data: Date,
  conclusao: Boolean
}