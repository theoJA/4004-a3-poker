const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const assert = require('assert');

let = driver = new webdriver.Builder()
.forBrowser('chrome')
.setFirefoxOptions()
.setChromeOptions()
.build();


//AI test strategy 1 (a) -----------------------------------------------------
driver.get("http://localhost:3000/");
driver.sleep(500);
driver.findElement(webdriver.By.id("setGameOptions")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("selectOpponent")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("aiOpponent")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("numOfOpponents")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("3Opponents")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("sendGameOptions")).click();

driver.sleep(500);
driver.findElement(webdriver.By.id("AI1")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("Strat1AI1")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("00")).sendKeys("7d");
driver.findElement(webdriver.By.id("01")).sendKeys("7s");
driver.findElement(webdriver.By.id("02")).sendKeys("7c");
driver.findElement(webdriver.By.id("03")).sendKeys("Kh");
driver.findElement(webdriver.By.id("04")).sendKeys("Kd");

driver.sleep(500);
driver.findElement(webdriver.By.id("AI2")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("Strat1AI2")).click()
driver.sleep(500);
driver.findElement(webdriver.By.id("10")).sendKeys("8d");
driver.findElement(webdriver.By.id("11")).sendKeys("8s");
driver.findElement(webdriver.By.id("12")).sendKeys("8c");
driver.findElement(webdriver.By.id("13")).sendKeys("5h");
driver.findElement(webdriver.By.id("14")).sendKeys("4d");

driver.sleep(500);
driver.findElement(webdriver.By.id("AI3")).click();
driver.findElement(webdriver.By.id("AI3")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("Strat1AI3")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("20")).sendKeys("Ad");
driver.findElement(webdriver.By.id("21")).sendKeys("Qs");
driver.findElement(webdriver.By.id("22")).sendKeys("Tc");
driver.findElement(webdriver.By.id("23")).sendKeys("Th");
driver.findElement(webdriver.By.id("24")).sendKeys("2d");

driver.sleep(500);
driver.findElement(webdriver.By.id("startGameAI")).click()
driver.sleep(500);
driver.findElement(webdriver.By.id("youHold")).click()


driver.sleep(5000);


// AI test strategy 1 (b) -----------------------------------------------------
driver.get("http://localhost:3000/");
driver.sleep(500);
driver.findElement(webdriver.By.id("setGameOptions")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("selectOpponent")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("aiOpponent")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("numOfOpponents")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("3Opponents")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("sendGameOptions")).click();

driver.sleep(500);
driver.findElement(webdriver.By.id("AI1")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("Strat1AI1")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("00")).sendKeys("Jd");
driver.findElement(webdriver.By.id("01")).sendKeys("Js");
driver.findElement(webdriver.By.id("02")).sendKeys("9c");
driver.findElement(webdriver.By.id("03")).sendKeys("9h");
driver.findElement(webdriver.By.id("04")).sendKeys("3d");

driver.sleep(500);
driver.findElement(webdriver.By.id("AI2")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("Strat1AI2")).click()
driver.sleep(500);
driver.findElement(webdriver.By.id("10")).sendKeys("8d");
driver.findElement(webdriver.By.id("11")).sendKeys("8s");
driver.findElement(webdriver.By.id("12")).sendKeys("5c");
driver.findElement(webdriver.By.id("13")).sendKeys("5h");
driver.findElement(webdriver.By.id("14")).sendKeys("4d");

driver.sleep(500);
driver.findElement(webdriver.By.id("AI3")).click();
driver.findElement(webdriver.By.id("AI3")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("Strat1AI3")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("20")).sendKeys("Ad");
driver.findElement(webdriver.By.id("21")).sendKeys("Qd");
driver.findElement(webdriver.By.id("22")).sendKeys("Qc");
driver.findElement(webdriver.By.id("23")).sendKeys("Qh");
driver.findElement(webdriver.By.id("24")).sendKeys("3d");

driver.findElement(webdriver.By.id("startGameAI")).click()
driver.sleep(500);

driver.sleep(500);
driver.findElement(webdriver.By.id("exchangingInput0")).sendKeys("9d");
driver.findElement(webdriver.By.id("0")).click()

driver.sleep(2000);
driver.findElement(webdriver.By.id("exchangingInput2")).sendKeys("5d,5s");
driver.findElement(webdriver.By.id("2")).click()

driver.findElement(webdriver.By.id("youHold")).click()


driver.sleep(5000);

//AI test strategy 2 (a) -----------------------------------------------------
driver.get("http://localhost:3000/");
driver.sleep(500);
driver.findElement(webdriver.By.id("setGameOptions")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("selectOpponent")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("aiOpponent")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("numOfOpponents")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("3Opponents")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("sendGameOptions")).click();

driver.sleep(500);
driver.findElement(webdriver.By.id("AI1")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("Strat2AI1")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("00")).sendKeys("8d");
driver.findElement(webdriver.By.id("01")).sendKeys("8s");
driver.findElement(webdriver.By.id("02")).sendKeys("2c");
driver.findElement(webdriver.By.id("03")).sendKeys("5h");
driver.findElement(webdriver.By.id("04")).sendKeys("4d");

driver.sleep(500);
driver.findElement(webdriver.By.id("AI2")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("Strat2AI2")).click()
driver.sleep(500);
driver.findElement(webdriver.By.id("10")).sendKeys("Td");
driver.findElement(webdriver.By.id("11")).sendKeys("Ts");
driver.findElement(webdriver.By.id("12")).sendKeys("3c");
driver.findElement(webdriver.By.id("13")).sendKeys("6h");
driver.findElement(webdriver.By.id("14")).sendKeys("5d");

driver.sleep(500);
driver.findElement(webdriver.By.id("AI3")).click();
driver.findElement(webdriver.By.id("AI3")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("Strat2AI3")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("20")).sendKeys("Th");
driver.findElement(webdriver.By.id("21")).sendKeys("Tc");
driver.findElement(webdriver.By.id("22")).sendKeys("Kh");
driver.findElement(webdriver.By.id("23")).sendKeys("Kc");
driver.findElement(webdriver.By.id("24")).sendKeys("6d");

driver.findElement(webdriver.By.id("startGameAI")).click()
driver.sleep(500);

driver.sleep(500);
driver.findElement(webdriver.By.id("exchangingInput1")).sendKeys("Jd,Js,Jh");
driver.findElement(webdriver.By.id("1")).click()

driver.sleep(500);
driver.findElement(webdriver.By.id("exchangingInput2")).sendKeys("Kd");
driver.findElement(webdriver.By.id("2")).click()

driver.findElement(webdriver.By.id("youHold")).click()


driver.sleep(5000);

//AI test strategy 2 (b) -----------------------------------------------------
driver.get("http://localhost:3000/");
driver.sleep(500);
driver.findElement(webdriver.By.id("setGameOptions")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("selectOpponent")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("aiOpponent")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("numOfOpponents")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("3Opponents")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("sendGameOptions")).click();

driver.sleep(500);
driver.findElement(webdriver.By.id("AI1")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("Strat2AI1")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("00")).sendKeys("8d");
driver.findElement(webdriver.By.id("01")).sendKeys("9s");
driver.findElement(webdriver.By.id("02")).sendKeys("2c");
driver.findElement(webdriver.By.id("03")).sendKeys("5h");
driver.findElement(webdriver.By.id("04")).sendKeys("4d");

driver.sleep(500);
driver.findElement(webdriver.By.id("AI2")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("Strat2AI2")).click()
driver.sleep(500);
driver.findElement(webdriver.By.id("10")).sendKeys("Td");
driver.findElement(webdriver.By.id("11")).sendKeys("8s");
driver.findElement(webdriver.By.id("12")).sendKeys("3c");
driver.findElement(webdriver.By.id("13")).sendKeys("6h");
driver.findElement(webdriver.By.id("14")).sendKeys("5d");

driver.sleep(500);
driver.findElement(webdriver.By.id("AI3")).click();
driver.findElement(webdriver.By.id("AI3")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("Strat2AI3")).click();
driver.sleep(500);
driver.findElement(webdriver.By.id("20")).sendKeys("Ts");
driver.findElement(webdriver.By.id("21")).sendKeys("Tc");
driver.findElement(webdriver.By.id("22")).sendKeys("4c");
driver.findElement(webdriver.By.id("23")).sendKeys("7h");
driver.findElement(webdriver.By.id("24")).sendKeys("6d");

driver.sleep(500);
driver.findElement(webdriver.By.id("startGameAI")).click()

driver.sleep(1000);
driver.findElement(webdriver.By.id("exchangingInput0")).sendKeys("Jd,Js,Jc,6c,6s");
driver.findElement(webdriver.By.id("0")).click()

driver.sleep(1000);
driver.findElement(webdriver.By.id("exchangingInput1")).sendKeys("Th,Jh,Qh,Kh,Ah");
driver.findElement(webdriver.By.id("1")).click()

driver.sleep(1000);
driver.findElement(webdriver.By.id("exchangingInput2")).sendKeys("5c,7d,2d");
driver.findElement(webdriver.By.id("2")).click()

driver.findElement(webdriver.By.id("youHold")).click()