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

<img src="https://user-images.githubusercontent.com/4598641/44286727-69cbd800-a26a-11e8-95e5-e9c2d49bcc40.png" width="200">

### Steg 04: "för alltid"
Händelser i AppLab hanteras på ett lite annat sätt än i Scratch.
Vi bygger upp vår app så att vi har en funktion `update()` som körs 50 gånger i sekunden, alltså 50 FPS. 
Eftersom 1 s = 1000 ms så är det 1000 / 50 = 20 ms mellan anropen till `update`.
Funktionen ska rita upp *alla* våra sprajtar som de ser ut just för tillfället. 
För att `update` ska köras var 20 ms skriver vi
```javascript
timedLoop(20, update);
 ```
Tills vidare lägger vi in en tom `update()` och testkör så att allt fungerar som tidigare.
```javascript
function update() {
}
```

### Steg 05: Peka mot muspekare, gå 10 steg
Här har vi tre olika utmaningar.
* I AppLab har vi ingen muspekare. Vi använder istället blocket `onEvent` som ger x- och y-koordinater där vi tryckte på skärmen.
* Hur får vi vår val att peka i en viss riktning? Vi kollar hur Scratch gör.
* Hur får vi vår val att röra sig? Även här kan vi få idéer från Scratch.

### Skärmtryck istället för muspekare
Istället för "Peka mot muspekare" sparar vi senaste skärmtryckningen i variabeln `lastClick`:
```javascript
  var lastClick = {x: 0, y: 0};
  onEvent("screen1", "click", function(event) {
    lastClick.x = event.x;
    lastClick.y = event.y;
  });
```

Vi kan testa vår kod genom att skriva ut koordinaterna i `update()`-funktionen:
```javascript
function update() {
  console.log(lastClick.x + " " + lastClick.y);
}
```

Så här kan koden se ut nu:
```javascript
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

När vi trycker på skärmen ser vi utskrifter av koordinaterna där vi tryckte. Koordinaterna verkar vara flyttal, alltså med decimaler:
```
246.4 149.333333334
```

### Peka valen åt en punkt (x, y)
Valen är en sprajt men i AppLab finns inga sprajtar. Vi kan själva skriva kod som efterliknar det som Scratch gör.

Vad är en sprajt egentligen? Om vi öppnar info-rutan för en sprajt i Scratch, ser vi lite av den information som en sprajt innehåller. Så här ser valens info ut:

![scratch-sprite-info](https://user-images.githubusercontent.com/4598641/44079353-14c1f5e2-9fa9-11e8-9227-6fe57476257a.png)

Vi ser att sprajten har olika egenskaper som kan ha olika värden. 
I Scratch gäller följande:
* `direction` är det håll som sprajten rör sig åt. Riktningen räknas i grader med 0 grader rakt uppåt, 90 grader rakt åt höger, 180 grader rakt neråt och 270 grader rakt åt vänster. Men vi kan vänta med det.
* `x` och `y` talar om var sprajtens mittpunkt är. Det kan vi se i Scratch genom att dra omkring en sprajt och se hur `x` och `y` ändrar sig eller genom att sätta en ny mittpunkt på sprajten och se att x och y är samma fastän sprajten hoppar omkring.

Visst verkar `x`, `y` och `direction` intressanta för oss? Vi ska ju peka valen i riktning mot `lastClick` och sen gå 10 steg enligt beskrivningen. Om vi skapar en variabel som heter `whale` med egenskaperna `x`, `y` och `direction` skulle det vara snyggt att kunna skriva kod av typen
```javascript
whale.pointTowards(lastClick.x, lastClick.y);
whale.moveSteps(10);
```
Detta går faktiskt att göra i JavaScript. Det är en del jobb och vi får ta ett steg i taget.

Vi börjar med att skapa sprajten `whale` som en variabel i vår kod. Vi använder klamrar för att tala om att objektet/sprajten `whale` har flera olika egenskaper, precis som att `lastClick` sparar x- och y-koordinaterna.
```javascript
var whale = {x: 0, y: 0, direction: 0};
```
I JavaScript kommer värdena att heta `whale.x`, `whale.y` och `whale.direction`, ungefär som variabler i Scratch som är knutna till en viss sprajt. Just nu har alla värdet 0.

Vi kan labba i Scratch med lite kod som den här. 
Om vi t.ex. pekar rakt till höger om valen och trycker på mellanslag kan vi se att ett steg i Scratch verkar motsvara en pixel.

![PointTowards](https://user-images.githubusercontent.com/4598641/44541630-d895af00-a70a-11e8-88b4-5a13d6ecbc2b.png)

Nu kan vi fundera på `whale.pointTowards` och `whale.moveSteps` i vår kod.

De lägger vi också in i `whale` som funktioner.
Eftersom alla sprajtar kommer att vilja använda de funktionerna så använder vi ett trick i JavaScript.
```javascript
var whale = {x: 0, y: 0, direction: 0, pointTowards: pointTowards, moveSteps: moveSteps };
function pointTowards(x, y) {
  console.log("pointTowards " + x + " " + y);
}
function moveSteps(steps) {
  console.log("moveSteps " + steps);
}
```

Varför är det två `pointTowards` i `whale`? 
1. Det första `pointTowards` är namnet efter punkten i `whale.pointTowards`
1. Det andra `pointTowards` talar om att jobbet görs av en funktion med samma namn längre ner i koden med samma namn. Vi använder samma namn för enkelhets skull

Varför delar vi upp koden? Det blir lättare att först hur sprajten `whale` fungerar vi lägger funktionerna för sig själv.

Om vi nu lägger in vår kod i `update()` så går det att köra och vi kan se loggutskrifter. Inget mer händer än.

```
pointTowards 246.4 149.333333334
moveSteps 10
```

Nu kan vår kod se ut ungefär så här:

```javascript
var lastClick = {x: 0, y: 0};
var whale = {x: 0, y: 0, direction: 0, pointTowards: pointTowards, moveSteps: moveSteps };
onEvent("screen1", "click", function(event) {
  lastClick.x = event.x;
  lastClick.y = event.y;
});
timedLoop(20, update);
function update() {
  console.log(lastClick.x + " " + lastClick.y);
  whale.pointTowards(lastClick.x, lastClick.y);
  whale.moveSteps(10);
}
function pointTowards(x, y) {
  console.log("pointTowards " + x + " " + y);
}
function moveSteps(steps) {
  console.log("moveSteps " + steps);
}
```

### Nästa steg

Nu vi vill få liv i de här två raderna som vi började på innan:
```javascript
  whale.pointTowards(lastClick.x, lastClick.y);
  whale.moveSteps(3);
```
Vi börjar med `moveSteps(1)`, dvs. vad som ska hända om vi bara går *ett* steg.

whale.moveSteps(1) ska flytta valen ett steg i den riktning som sprajten pekar.
Här finns det minst tre saker att lägga märke till:
1. *Varifrån* ska valen flytta?
2. Vad är ett steg?
3. *Åt vilket håll* ska valen gå?

* Varifrån? Det är ju x och y som vi redan har i vår kod.
* Vad är ett steg? Eftersom x och y räknas i pixlar säger vi att ett steg är en pixel, som i Scratch.
* Vilken riktning? Ja, den har vi ju ställt in med pointTowards().

Vi försöker skriva några testfall för att se om vi har allt vi behöver för att koda.

Säg att valen börjar på position x, y = (10, 10) och pekar åt punkten (50, 10). Om vi går ett steg ska valen vara på x, y = (11, 10).

TODO: Bild med koordinatsystemet i AppLab.

Koden för att testa att valen går rätt kan se ut så här.
```javascript
function testWhale() {
  whale.goto(10, 10);
  whale.pointTowards(50, 10);
  whale.moveSteps(1);
  if (whale.x == 11 && whale.y == 10) {
    console.log("Yay whale");
  } else {
    console.log("Fail whale");
  }
}
```
När vi skriver testet ser vi att valen måste kunna starta på rätt plats. Vi behöver alltså koda Scratch-blocket `goto x: y:`.


### Lite matte och många testfall

Vill vi att direction ska ha samma värden som i Scratch? Isåfall behöver vi omvandla hur vinklar räknas.

1. Mer om rätvinkliga trianglar: matteboken.se: sök på Pythagoras sats. 
1. Mer om cosinus och sinus: titta på https://www.matteboken.se/lektioner/matte-4/trigonometri/enhetscirkeln-och-perioder

Pilen som visar riktningen i Scratch

Vi börjar med förflyttningar längs x och y, alltså +/- 1.

Längden på pilen ska alltid vara ett för att stegen ska vara lika långa oavsett vilken riktning vi går i.
Pilen talar alltså om hur vi ska uppdatera x och y för att ta exakt ett steg, oavsett riktning.

Exemplet 45 grader, Pythagoras sats.

Från vinkel till pilens riktning

Pilen kommer att peka i riktningen (cos v, sin v) med v = 0 rakt åt höger och ökande vinkel moturs.
Läs mer på matteboken.se om du vill veta mer. Annars kan du nöja dig med att vi skriver testfall
som övertygar oss att det stämmer.

`pointTowards` (peka i riktning)

Gå över från Scratchs koordinatsystem till radianer i enhetscirkeln? Vi behöver en funktion för detta. Vi skriver testfallen först.

`pointTowards` sparar riktningen i variabeln `direction`. Det räknas från sprajtens mittpunkt till den angivna punkten

Skriva testfall för pointTowards

0 grader. Pekar vi i rätt riktning och är längden = 1? (Pythagoras sats)

Sen lägger vi till testfallen för 90, 180, 270 grader och testkör

Sen lägger vi till 45 grader och testkör

Slutligen 135, 225, 315 grader och testkör

`moveSteps` flyttar ett steg i den riktning som direction har
Vi skriver testfall för `moveSteps`

# goto(x, y)
Vi kodar ju inte bara valspelet utan också bitar av Scratch. 

Tack och lov återanvändbart i nästa spel :)

Så vi ger inte upp!

Vi tittar o markerar i vår kod vad som är unikt för valspelet och vad som vi kan använda i nästa spel.

Vi hade sparat några TODO

goto(x, y): TODO

Kommentarer i kod. 

Kod ljuger inte men kommentarer gör det ibland (Ron Jeffries)

Vi angriper TODO i goto genom att skriva ett testfall istället

Testfall?

```javascript
whale.goto(0, 0)
whale.x == 0
whale.y == 0
```
Det testar vi ju redan.
Vad mer?

Tänk på hur man sätter mittpunkten i Scratch i sprajteditorn

Valens mittpunkt är det vi menar just nu

getXPosition() och getYPosition är alltid övre vänstra hörnet

Så om vi börjar med getXPosition och lägger till halva valens bredd så bör vi hamna högst en pixel från mittpunkten x

Samma för getYPosition och halva valens höjd och högst en pixel från y

Nu kan vi skriva vårt testfall

Nu är koden lättare att skriva

Och testfallet har vi kvar för framtiden

Konsollen: ctrl-shift I

Math.abs

Det här med "whaleRight" ser konstigt ut. goto ska ju inte hålla reda på kostymens namn åt oss

Vi lägger in det som en egenskap i valen istället

whale.costume

# Referenser 
* https://studio.code.org/projects/applab/a8BQLOAeazZu8Yzv1hsOT1TNpa5MUwu0r1ZIxEf3sEY

