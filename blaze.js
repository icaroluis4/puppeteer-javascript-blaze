const puppeteer = require('puppeteer');

console.log("Bem vindo ao bot Blaze ");

var flag = 0;
var buffer = ["null" , "null" , "null"];
var valor = 0;
var flagRed = 0;
var flagBlack = 0;
var cash = 41.36;
//var mult = 1;
var aposta = 0.0;
var acumulado = 0.0;
var base = 0.04; // aposta base
var base2 = '0.04'; // aposta base (string)
let globalBase = 0.05; //aposta global
var firstTime = 0;

//TESTES VAR
var casoBW = 0;
var casoRW = 0;
var white = 0;
var R2 = 0;
var B2 = 0;
var num = 0;

(async () => {
  const browser = await puppeteer.launch(); //headless: true,
  const page = await browser.newPage();
  await page.goto('https://blaze.com/pt/games/double');
  await page.setViewport({width: 1200,height: 800});
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');


  //await page.waitForNavigation();
  await page.click('[class="link"]');
  await page.waitForTimeout(3000);
  await page.type('[name="username"]' , 'USER-LOGIN'); //Login do usuario
  await page.type('[type="password"]' , 'USER-PASSWORD'); //Senha
  await page.waitForTimeout(3000);
  await page.click('[class = "input-footer"]');
  await page.waitForTimeout(3000);
  
  
  //TEST "number"
  await page.type('[type="number"]' , base2);
  await page.waitForTimeout(3000);
  await page.click('[type="number"]' , {clickCount: 3});
  //await page.keyboard.press("Backspace");
  await page.type('[type="number"]' , "0.24");

  //TEST CLICK "white"
  await page.click('[class="red "]');
  await page.waitForTimeout(1000);
  await page.click('[class="black "]');
  await page.waitForTimeout(1000);
  await page.click('[class="white "]');


  //await page.click('[button type ="button"]');
  //await page.waitForTimeout(7000).then(() => console.log('Waited 7 seconds!'));
  //await page.screenshot({ path: 'pics/blaze.png' });

  //await page.waitForSelector('[class = "time-left"]').innerText;
   while(1){
        try{
                //await page.waitForTimeout(1000)//.then(() => console.log('Waited 1 seconds!'));
                data = await page.evaluate(()=> {
                        let num = document.querySelector('[class = "entry"]').innerText;
                        let time = document.querySelector('[class = "time-left"]').innerText;
                        let currency = document.querySelector('[class = " currency"]').innerText;
                        num = Number(num);
                        time = time.slice(0,10);
                        //time = Number(time);

                        return{
                            num , time , currency
                        }

                })
                
                let test = Object.values(data);
                let realCash = test[2];
                valor = test[0];

                if(test[1] == "Girando Em" && flag == 0 ){
                    //console.log(test);
                    //console.log(test[1]);
                    console.log(test[0]);
                    flag = 1;

                    if(valor > 7){
                        buffer[2] = buffer[1];
                        buffer[1] = buffer[0];
                        buffer[0] = "Black";
                    }
                    else if(valor < 8 && valor != 0){
                        buffer[2] = buffer[1];
                        buffer[1] = buffer[0];
                        buffer[0] = "Red";
                    }
                    else{
                        buffer[2] = buffer[1];
                        buffer[1] = buffer[0];
                        buffer[0] = "white";
                    }

                    console.log("BUFFER: ",buffer);

                    if(buffer[0] == "white" && buffer[1] == "Red" && buffer[2] == "Red"){
                        flagBlack = 1;
                    }
                    else if(buffer[0] == "Red" && buffer[1] == "white" && buffer[2] == "Red"){
                        flagBlack = 1;
                    }
                    else if(buffer[0] == "Red" && buffer[1] == "Red" && buffer[2] == "white"){
                        flagBlack = 1;
                    }

                    if(buffer[0] == "white" && buffer[1] == "Black" && buffer[2] == "Black"){
                        flagRed = 1;
                    }
                    else if(buffer[0] == "Black" && buffer[1] == "white" && buffer[2] == "Black"){
                        flagRed = 1;
                    }
                    else if(buffer[0] == "Black" && buffer[1] == "Black" && buffer[2] == "white"){
                        flagRed = 1;
                    }
                    /*
                    for ( num = 0; num < 3; num++) {
                        if(buffer[num] == "white"){
                            white = white + 1;
                        }
                        if(buffer[num] == "Red"){
                            R2 = R2 + 1;
                        }
                        if( R2 == 2 && white == 1){
                            casoRW = casoRW + 1;
                            console.log("CASO RW: ", casoRW);
                            white = 0;
                            R2 = 0;
                        } 
                    }

                    for ( num = 0; num < 3; num++) {
                        if(buffer[num] == "white"){
                            white = white + 1;
                        }
                        if(buffer[num] == "Black"){
                            B2 = B2 + 1;
                        }
                        if( B2 == 2 && white == 1){
                            casoBW = casoBW + 1;
                            console.log("CASO BW: ", casoBW);
                            white = 0;
                            B2 = 0;
                        } 
                    } */

                    if(buffer[0] == "Red" && buffer[1] == "Red" && buffer[2] == "Red"){
                        flagBlack = 1;
                    }

                    else if(buffer[0] == "Black" && buffer[1] == "Black" && buffer[2] == "Black"){
                        flagRed = 1;
                    }

                    if(flagBlack == 1){
                        if(buffer[0] == "Black"){
                            flagBlack = 0;
                        // mult = 1;
                            cash = cash + acumulado + globalBase;
                            console.log("ACUMULADO: ", acumulado);
                            console.log("CASH: ", cash);
                            console.log("RealCASH: ", realCash);
                            acumulado = 0;
                            base = globalBase;
                            firstTime = 0;
                            await page.click('[class="white "]');
                        }
                        else{
                            cash = cash - base;
                            aposta = base; //mult
                            acumulado = acumulado + aposta;
                            base2 = JSON.stringify(base);
                            await page.click('[type="number"]' , {clickCount: 3});
                            await page.type('[type="number"]' , base2);

                            if(firstTime == 0){
                                await page.click('[class="black "]');
                            }

                            await page.click('[class = "place-bet"]')
                            //mult = mult + 1;
                            console.log("APOSTA: ", aposta);
                            console.log("CASH: ", cash);
                            console.log("RealCASH: ", realCash);
                            console.log("ACUMULADO: ", acumulado);
                            base = base * 2;
                            firstTime = 1;
                        }
                    }
                    else if(flagRed == 1){
                        if(buffer[0] == "Red"){
                            flagRed = 0;
                        // mult = 1;
                            cash = cash + acumulado + globalBase;
                            console.log("ACUMULADO: ", acumulado);
                            console.log("CASH: ", cash);
                            console.log("RealCASH: ", realCash);
                            acumulado = 0;
                            base = globalBase;
                            firstTime = 0;
                            await page.click('[class="white "]');
                        }
                        else{
                            cash = cash - base ; // 0.05(base) * mult
                            aposta = base;
                            acumulado = acumulado + aposta
                            base2 = JSON.stringify(base);
                            await page.click('[type="number"]' , {clickCount: 3});
                            await page.type('[type="number"]' , base2);

                            if(firstTime == 0){
                                await page.click('[class="red "]');
                            }

                            await page.click('[class = "place-bet"]')
                            //mult = mult + 1;
                            console.log("APOSTA: ", aposta);
                            console.log("CASH: ", cash);
                            console.log("RealCASH: ", realCash);
                            console.log("ACUMULADO:  ",  acumulado);
                            base = base * 2;
                            firstTime = 1;
                        }

                    }

                    
                    // FAZER Lógica do Cash para TESTES BBB RRR BWB RWR

                }
                else if(test[1]== "Girando..." && flag == 1){
                    flag = 0;
                    //console.log(test);
                }
                //console.log(test);
        }
        catch{
            await page.waitForTimeout(3000);
        }

   }
  //await browser.close();
})();
