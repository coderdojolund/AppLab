# Från Scratch till JavaScript med AppLab

Vi utgår från Flygande valen (kodboken.se) och kodar i AppLab.

# Målgrupp

För dig som förstår de mer avancerade Scratch-exemplen och vill lära dig textprogrammering med JavaScript. Exempel på avancerad Scratch kan vara Pong och Rymdattack från kodboken.se.

Med AppLab kan du lära dig JavaScript och du kan köra din kod direkt i mobilen.

# Skillnader mellan Scratch och AppLab
* Precis som i Scratch kan du dela ut projekt gjorda i AppLab
* Appar i AppLab kan köras i mobilen
* AppLab har inga sprajtar. I det här exemplet kodar vi våra egna sprajtar
* code.org har också GameLab. De appar du skapar där fungerar inte så bra i mobil just nu (augusti 2018)

# Hur?
Vi tar ett lite enklare spel från kodboken.se, Flygande valen, och gör om det stegvis till AppLab. Eftersom AppLab inte är Scratch är det en del som vi får koda själva, t.ex. hur sprajtar ritas. Vi följer Kodbokens text och bygger vår app ett steg i taget. 

Öppna https://www.kodboken.se/start/skapa-spel/uppgifter-i-scratch/flygande-valen?chpt=0

Testkör Flygande valen och läs igenom kodblocken så att du förstår hur spelet fungerar.

Gå igenom  de grundläggande exemplen för AppLab: LÄNKAR

## 1. En val som följer muspekaren

### Steg 01, 02, 03: 

Skapa ett nytt projekt i AppLab och ge det ett bra namn.

Exportera två sprajtar (i bitmapformat) med valens klädsel från Scratch och importera dem till AppLab. 
En sprajt ska vara vänd åt höger och en åt vänster. 
Du kan lätt spegelvända dem i Scratch innan du exporterar.

När du importerar bilderna som Image i AppLab kan en storlek på 100 pixlars bredd och 40 pixlars höjd vara lagom. 
Ge bilderna två olika id, t.ex. `whaleLeft` och `whaleRight`.

### Steg 04: "för alltid"
Händelser i AppLab hanteras på ett lite annat sätt än i Scratch.
Vi bygger upp vår app så att vi har en funktion `update()` som körs 50 gånger i sekunden, alltså 50 FPS. 
Eftersom 1 s = 1000 ms så är det 1000 / 50 = 20 ms mellan anropen till `update`.
Funktionen ska rita upp *alla* våra sprajtar som de ser ut just för tillfället. 
För att `update` ska köras var 20 ms skriver vi
```
timedLoop(20, update);
 ```
Tills vidare lägger vi in en tom `update()` och testkör så att allt fungerar som tidigare.
```
function update() {
}
```

### Steg 05: Rörelse och peka mot muspekare
Här har vi tre olika utmaningar.
* I AppLab har vi ingen muspekare. Vi fångar istället upp skärmtryck med blocket `onEvent` som ger x- och y-koordinater där vi tryckte på skärmen.
* Hur får vi vår val att röra sig?
* Hur får vi vår val att peka i en viss riktning?

Istället för "Peka mot muspekare" sparar vi senaste skärmtryckning i variabeln `lastClick` så här:
```
  var lastClick;
  onEvent("screen1", "click", function(event) {
    lastClick.x = event.x;
    lastClick.y = event.y;
  });
```

Vi kan testa vår kod genom att skriva ut koordinaterna i `update()`-funktionen så här:
```
function update() {
  console.log(lastClick.x + " " + lastClick.y);
}
```

Så här kan koden se ut nu:
```
var lastClick = {x: 0, y: 0};
onEvent("screen1", "click", function(event) {
  lastClick.x = event.x;
  lastClick.y = event.y;
});
timedLoop(20, update);
function update() {
  console.log(lastClick.x + " " + lastClick.y);
}
```

*Hur får vi vår val att röra sig?*
I AppLab finns inga sprajtar. Vi kan själva skriva kod som efterliknar det som Scratch gör. 
Det är ett roligt sätt att lära sig JavaScript tycker jag.

Vad är en sprajt egentligen? Om vi öppnar info-rutan för en sprajt i Scratch, ser vi lite av den information som en sprajt innehåller. Så här ser valens info ut:

![scratch-sprite-info](https://user-images.githubusercontent.com/4598641/44079353-14c1f5e2-9fa9-11e8-9227-6fe57476257a.png)

Vi ser att sprajten har olika egenskaper som kan ha olika värden. 
I Scratch gäller följande:
* `direction` är det håll som sprajten rör sig åt. Riktningen räknas i grader med 0 grader rakt uppåt, 90 grader rakt åt höger, 180 grader rakt neråt och 270 grader rakt åt vänster.
* `x` och `y` talar om var sprajtens mittpunkt är. Det kan vi se i Scratch genom att dra omkring en sprajt och se hur `x` och `y` ändrar sig eller genom att sätta en ny mittpunkt på sprajten och se att x och y är samma fastän sprajten hoppar omkring.

Visst verkar `x`, `y` och `direction` intressanta för oss? Vi ska ju peka valen i riktning mot `lastClick` och sen gå 10 steg enligt beskrivningen. Om vi skapar en variabel som heter `whale` med egenskaperna `x`, `y` och `direction` skulle det vara snyggt att kunna skriva kod av typen
```
whale.pointTowards(lastClick.x, lastClick.y);
whale.moveSteps(10);
```
Detta går faktiskt att göra i JavaScript. Det är en del jobb och vi får ta ett steg i taget.

Vi börjar med att skapa sprajten `whale` som en variabel i vår kod. Vi använder klamrar för att tala om att objektet/sprajten `whale` har flera olika egenskaper.
```
var whale = {x: 0, y: 0, direction: 0};
```
I JavaScript kommer värdena att heta `whale.x`, `whale.y` och `whale.direction`, ungefär som variabler i Scratch som är knutna till en viss sprajt. Just nu har alla värdet 0.

Men `whale.pointTowards` och `whale.moveSteps`: var kommer de ifrån?
De lägger vi också in i `whale` som funktioner.
Eftersom alla sprajtar kommer att vilja använda de funktionerna så använder vi ett trick i JavaScript.
```
var whale = {x: 0, y: 0, direction: 0, pointTowards: pointTowards, moveSteps: moveSteps };
function pointTowards(x, y) {
  console.log("pointTowards " + x + " " + y);
}
function moveSteps(steps) {
  console.log("moveSteps " + steps);
}
```

Varför är det två `pointTowards` i `whale`? 
1. Det första `pointTowards` är namnet vi efter punkten i `whale.pointTowards`
1. Det andra `pointTowards` talar om att jobbet görs av en funktion längre ner i koden med samma namn. Vi använder samma namn för enkelhets skull

Om vi nu lägger in vår kod i `update()` så går det att köra och vi kan se loggutskrifter. Inget mer händer än.

Nu kan vår kod se ut ungefär så här:

# Referenser 
* https://studio.code.org/projects/applab/a8BQLOAeazZu8Yzv1hsOT1TNpa5MUwu0r1ZIxEf3sEY

