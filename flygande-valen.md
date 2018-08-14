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
*Hur får vi vår val att röra sig?*
I AppLab finns inga sprajtar. Vi kan själva skriva kod som efterliknar det som Scratch gör. 
Det är ett roligt sätt att lära sig JavaScript tycker jag.

Vad är en sprajt egentligen? Om vi öppnar info-rutan för en sprajt i Scratch, ser vi lite av den information som en sprajt innehåller. Så här ser valens info ut:

![scratch-sprite-info](https://user-images.githubusercontent.com/4598641/44079353-14c1f5e2-9fa9-11e8-9227-6fe57476257a.png)


# Referenser
* https://studio.code.org/projects/applab/a8BQLOAeazZu8Yzv1hsOT1TNpa5MUwu0r1ZIxEf3sEY

