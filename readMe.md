API Documentation

ROUTES:

Para criar o cartão:

Método: post
Rota:"/card/create";
Autenticação: {headers: {apikey:string //chave de acesso}}
Espera receber: {
    "employeeId": number,
    "type": "groceries"||"restaurant"||"transport"||"education"||"health"
};
Exemplo:{
    "employeeId": 1,
    "type": "transport"
};

Retorno: statuscode:201, send: Cartão Criado.

Possíveis Erros:
403: Acesso negado, chave de acesso requerida nessa rota.

401: Chave de acesso não encontrada em nenhum usuário no banco de dados.

404: Funcionário Não Encontrado.

409: Funcionário Já Tem Um Cartão do Mesmo Tipo Cadastrado. 

422: Algum dado não enviado na requisição ou enviado fora da formatação Informada.


Para ativar o cartão:

Método: post
Rota:"/card/active"
Espera receber: {
    cvc: string
    password: string //sring de exatamente 4 números
};
Exemplo:{
    "cvc": "123",
    "password": "1234"
};
Retorno: statuscode:201, send: Cartão Ativado.
Possíveis Erros:
404: Cartão Não encontrado.
422: Algum dado não enviado na requisição ou enviado fora da formatação Informada.



Para Receber o Saldo e Transações:

Método: get
Rota: "/card/balance/:cardId"
Espera receber: id do cartão por req.params
Exemplo:/card/balance/01;
Retorno: statuscode:200, send: {
    balance: number,
    transactions:payments //Objeto Com as Transações ,
    recharges //Objeto Com as Recargas
  }.
Exemplo: statuscode:200, send:{
  "balance": 200,
  "transactions": [
    {
      "id": 21,
      "cardId": 28,
      "businessId": 3,
      "timestamp": "2022-09-05T05:59:17.000Z",
      "amount": 100,
      "businessName": "Driven Eats"
    }
  ],
  "recharges": [
    {
      "id": 16,
      "cardId": 28,
      "timestamp": "2022-09-05T05:43:26.000Z",
      "amount": 100
    },
    {
      "id": 17,
      "cardId": 28,
      "timestamp": "2022-09-05T05:44:36.000Z",
      "amount": 200
    }
  ]
}

Possíveis Erros:
404: Cartão Não encontrado.
422: Algum dado não enviado na requisição ou enviado fora da formatação Informada.



Para Bloquear o Cartão: 
Metodo: Post
Rota:"/card/block"
Espera Receber : {
    id: number// id do cartão,
    password: string //sring de exatamente 4 números
}
Exemplo :{
    id: 12,
    password:"1234"
}
Retona: statuscode: 200, send : Cartão Bloqueado.
Possíveis Erros:
400: Cartão Já Bloqueado.
404: Cartão Não Encontrado.
422: Algum dado não enviado na requisição ou enviado fora da formatação Informada.



Para Desbloquear o Cartão: 
Metodo: Post
Rota:"/card/unblock"
Espera Receber : {
    id: number //id do cartão,
    password: string //sring de exatamente 4 números
}
Exemplo :{
    id: 12,
    password:"1234"
}
Retona: statuscode: 200, send : Cartão Desbloqueado
Possíveis Erros:
400: Cartão Já Bloqueado.
404: Cartão Não encontrado.
422: Algum dado não enviado na requisição ou enviado fora da formatação Informada.




Para Recarregar o Cartão:
Metodo: Post;
Rota:"/recharge";
Autenticação: {headers: {apikey:string //chave de acesso}}
Espera Receber : {
    cardId: number,
    amount: number// número maior que 0
};
Exemplo :{
    cardId: 12,
    amount: 12.34
};
Retona: statuscode: 201, send : Cartão Carregado
400: Cartão Expirado. Cartão Não Ativado.
401: Chave de acesso não corresponde a nenhum usuario no banco de dados.
403: Acesso Negado, api key não enviada. 
404: Cartão Não encontrado.



Para Efetuar Pagamento com o Cartão:
Metodo: Post;
Rota:"/payment";
Espera Receber : {
    cardId: number,
    amount: number,
    password:string,
    businessId:number,
    businessType: "groceries"|| "restaurant"|| "transport"|| "education"|| "health"
};
Exemplo {
    cardId: 12,
    amount: 9999.98,
    password:"1234",
    businessId:1,
    businessType: "education"
};
Retona: statuscode: 201, send : Pagamento Efetuado
Possíveis Erros:
400: O Cartão Utilizado Não Foi Ativado. Ou então, o cartão não possui saldo Suficiente. Ou ainda, o cartão não foi recarregado ainda.
401: Tipo De Cartão Não Aceito no Estabelecimento Enviado na Requisição.
404: Cartão ou estabelecimento Não encontrado.
409: O Tipo de Estabelecimento Enviado Na Requisição Não é o Mesmo Registrado No Banco de Dados.
422: Algum dado não enviado na requisição ou enviado fora da formatação Informada.
