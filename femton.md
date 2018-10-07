Visa målbilden för spelet: https://studio.code.org/projects/applab/TIRI-Lptw9kzDp3fpB_SDOAV92gdFwnuEb4Y93NffVQ

UI: 4x4 knappar, 1 till 16, nummer 16 dold

Vi numrerar enligt schemat rad:kolumn, 0:0, 0:1 osv

En enda sak händer: flytta en bricka

Testfall 1: klicka på bricka nr 12: hoppar ner ett steg, dvs 2:3 dold och 3:3 visar 12
*	Vi börjar i liten skala med onEvent för ruta 12
*	En gemensam klick-hanterare: clicked
*	använd assert()
*	Anropa test() när appen startar och skriv i konsollen
*	koda enligt TDD = fake it


Testfall 2: klicka på brickan med nr 12 igen: tillbaks i utgångsläget, dvs 2:3 visar 12 och 3:3 dold
*	förbättra enl TDD
*	event.targetId i hjälpen för onEvent: onEvent details
*	JSON-utskrift för att se hur det funkar
*	swap och operatorn ||

klicka på 15: hoppar höger
klicka på 15 igen: hoppar vänster

`parseInt` för vara säkra på att vi har ett heltal
