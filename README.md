# puppeteer-javascript
#Para rodar os bots será necessário NODE.js e Puppeteer

  
#Bot blaze-fictional-cash:
  Bot projetado para jogar como teste o game "Double" do site de apostas Blaze( URL: https://blaze.com/pt/games/double) , o jogo consiste no sorteio de 14 números e um coringa portanto é um sorteio de 15 elementos, os número de 1 a 7 são atrelados a "cor Vermelha" e os números de 8 a 14 são atrelados a cor "Preta" , o bot através de uma estrategia pré-estabelecida escolherá entre as duas cores para fazer a aposta. A estrategia consiste em aguardar o buffer(ou vetor) de 3 slots(ou índices) ficar completo com um padrão da falta de uma das duas cores, então: se o buffer tiver a seguinte configuração(Black ,Black ,Black) o bot será instruido a apostar no vermelho até que o mesmo seja sorteado, caso não aconteça o sorteio esperado dobra-se a aposta; Para testes modificar os seguintes: var base , var base2 , let globalBase , var cash , USER-LOGIN , USER-PASSWORD;
  
#Bot blaze:
 Igual ao anterior com a diferença que se trata de jogar com dinheiro "REAL" será necessario colocar o valor real da conta em "var cash" . ATENÇÃO: Não me responsabilizo por quaisquer perdas decorrentes desse projeto, o mesmo foi criado com intuito de ganhar dinheiro fácil, porém depois de dois dias rodando o mesmo no site o total de 50 reais foram perdidos na minha conta kkkk, o problema não está no bot e sim na estratégia.
