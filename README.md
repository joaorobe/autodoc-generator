# AutoDoc - Gerador de Documentação

## Objetivo do Projeto
O AutoDoc é uma ferramenta voltada para desenvolvedores com o objetivo de gerar documentação técnica automática para blocos de código ou funções, economizando tempo e garantindo padronização.

* **Entrada:** O usuário insere um trecho de código (função, classe ou script).
* **Processamento:** O back-end recebe o código e o envia para a API do OpenRouter. O prompt de sistema (`role: "system"`) instrui a IA a agir como um Engenheiro de Software especialista em documentação técnica, com temperatura ajustada para `0.3` para garantir precisão. A IA é obrigada a processar o código e extrair as especificações exatas exigidas.
* **Saída:** O sistema exibe a documentação formatada obrigatoriamente com 4 tópicos: Descrição da funcionalidade, Parâmetros (nome e tipo), Retorno esperado e um Exemplo de Uso prático.

## Como instalar e executar

Siga os passos abaixo para rodar o AutoDoc:

1. **Instale as dependências:**
   Execute no terminal: `npm install`
2. **Configure a Chave da API:**
   Crie um arquivo `.env` na raiz do projeto contendo a sua chave do OpenRouter: `OPENROUTER_API_KEY=sua_chave_aqui`
3. **Inicie o Servidor:**
   Execute no terminal: `npm start`
4. **Acesse a Aplicação:**
   Abra o navegador em `http://localhost:3000`

## Como pegar a chave do OpenRouter para colocar no .env

1. Acesse o site do OpenRouter e faça login na sua conta.
2. Entre na área de chaves de API ou nas configurações de conta.
3. Crie uma nova chave de API, se ainda não tiver uma.
4. Copie o valor da chave.
5. Crie um arquivo chamado `.env` na raiz do projeto.
6. Cole a chave no formato: `OPENROUTER_API_KEY="sua_chave_aqui"`


## Como usar o AutoDoc

1. Cole uma função ou trecho de código que você queira documentar dentro da área de entrada.

2. Clique no botão **Gerar Documentação**.

3. Aguarde alguns segundos enquanto o sistema envia o código para o modelo e recebe a resposta.

4. A documentação gerada aparecerá no painel abaixo do botão, com os tópicos de Descrição, Parâmetros, Retorno e Exemplo de Uso.


## Como testar usando o TERMINAL/CMD

1. Execute o servidor e abra um segundo terminal

2. **Terminal do VSCODE** 
   Execute no terminal: 
   curl -X POST http://localhost:3000/api/llm \
   -H "Content-Type: application/json" \
   -d '{"prompt":"function soma(a, b) { return a + b; }"}'

   **CMD do Windows/PowerShell**
   curl -X POST http://localhost:3000/api/llm -H "Content-Type: application/json" -d "{\"prompt\":\"function soma(a, b) { return a + b; }\"}"

**Código de exemplo**


function calcularValorFinal(valorTotal, cupomDesconto) {
    if (valorTotal <= 0) {
        return 0;
    }
    let desconto = 0;
    if (cupomDesconto === "ALUNOADS10") {
        desconto = 0.10; // 10% de desconto
    } else if (cupomDesconto === "BOLSISTA20") {
        desconto = 0.20; // 20% de desconto
    }
    const valorComDesconto = valorTotal - (valorTotal * desconto);
    return valorComDesconto;
} 
