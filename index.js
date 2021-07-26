const puppeteer = require('puppeteer');

console.log("Bem vindo ao bot flipCoin ");

//var n = 0;
//const roll = 5;
var valor = '0.1';
var valor2 = 0.1;
//var col = 0;
//var cash = 250;




(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  //OBJETIVO RELACIONAR CASH AO VALOR REAL NO SITE !!!!!!
  
  //acessa o site
  await page.goto('https:forex-social.com/jogos/desafio-moeda/');

  //OBTENDO DADOS
  let data = await page.evaluate(()=> {
    let money = document.querySelector('strong [class = "balance"]').innerText;

    money = Number(money);

    return{
      money
    }

  })

  //await page.waitForSelector('strong [class = "balance"]');
  //let cash = JSON.stringify(data);
  //cash = cash.slice(9,12);
  let cash = Object.values(data);
  //cash = Number(cash);
  //cash = cash;
  console.log(data);
  console.log(cash);

  cash2 = 0;
  //console.log(cash2);

  
  //console.log(document.querySelector('[class="balace"]'));

  while( 1){
    //n++;
    console.log("Começou ");
    //await page.waitForNavigation();
    //clicka na "cara" da moeda
    await page.click('[id="head"]');
    //await page.screenshot({ path: 'pics/flip1.png' });

    //Preenche o número a ser apostado
    await page.type('[type="number"]' , valor);
    //await browser.close();
    //let cashn =  document.querySelector('strong [class = "balance"]').innerText;


    await page.click('[class="btn btn-lg btn-success"]');

    await page.waitForTimeout(1000).then(() => console.log('Waited a second!'));

    data = await page.evaluate(()=> {
      let money = document.querySelector('strong [class = "balance"]').innerText;
      
      money = Number(money);

      return{
        money
      }
  
    })
    //await page.click('[id="head"]');
    
    console.log(data);
    cash2 = Object.values(data);
    //cash2 = JSON.stringify(data);
    console.log("Cash2: ",cash2);
    //cash2 = cash.slice(9,14);
    console.log("Cash: ",cash);

    
    
    
    if ( cash < cash2){
        //cash = cash + 0,1;
        console.log("Sucesso ");
        valor = '0.1';
        valor2 = 0.1;
        

    } else if (cash > cash2){
        //cash = cash + 0,1;
        console.log("Fail ");
        valor2 = valor2 * 2;
        valor = String(valor2); 

    }

    console.log("Valor: ", valor);
    console.log("Cabou ");
    cash = cash2;

    if(cash >= 250.5){
      break;
    }
   
  }

  //await browser.close();

})();


//FAZER UMA FORMATAÇÃO DECENTE _> TENTAR REDUZIR O NUMERO DE VAR(s)
//TENTAR Por exemplo  Number(Object.values(data));