# Mandy Unfolded

## A használhatóbb Mandiner

Az előzményeket tudjuk mind... A Mandiner legutóbbi átalakításával elvettek tőlünk a fórumozáshoz feltétlenül szükséges funkciókat, és kaptunk valami alig használható vackot. Hiába kértük, rimánkodtunk, még válaszra sem méltattak bennünket. Úgyhogy, akkor próbáljunk meg valamit önerőből...

Ennek a bővítménynek három előzménye van:

* _Triacus_ népszerű szkriptje a nemkívánatos trollok szűrésére;
* _Sakamoto_ bővítménye a kommentek automatikus kibontására;
* _T. Péter_ kiegészítő stílusa a dizájn használhatóbbá tételére.

Csomagoljuk hát össze a hármat egy, remélhetőleg sok problémánkat megoldó csomagba. Az integrált szolgáltatások tehát:

A legnépszerűbb nyilván a trolltartó. A saját hozzászólások mellett nem X jelenik meg, hanem egy kék nyíl lefele. Megnyomásával az adott cikk alatt található következő saját hozzászólásra ugrik, így követhetőbbek lennének a reakciók. Jelenleg csak egyszer megy végig egy topikon, az újrázáshoz frissíteni kell előtte az oldalt.

A második a kommentek automatikusabb kezelése. A bővítmény automatikusan kibontja a válaszkommenteket, magától megnyomja a Továbbiak betöltése gombot. Ezeket a lépéseket időzítve újra és újra elvégzi a háttérben, hogy a kommentmező alapvetően a normális fórumozásnak megfelelően működjön. Ez az időzítés szükségszerűen néha kis ugrándozással, sorok kis mozgolódásával jár, ahogy kibontódnak, ezzel cserébe együtt kell élni.

A harmadik a jobb dizájn. Ide tartoznak fontos, sokak által kért dolgok, mint a kommentmező mérete, betűmérete, ugyanakkor a kommentek betűi kisebbek lettek az eredeti feleslegesen nagyhoz képest. Van továbbá sok apróbb igazítás mindenfelé, például a kapcsolódó cikkek jobban elválnak a valódi tartalomtól, feleslegesen nagy térközök megszűntek, a túl hosszú felhasználónevek nem okoznak többé gondot, a válaszok egymásba ágyazása korrektebb, és a bővítmény kiszűr pár nem különösebben kívánatos, felugró, beugró, betüremkedő és zavaró ezt-azt is. A saját kommenteknél a név kékkel kiemelve, kicsit könnyebb így végignézni és új reagálásokat keresni alatta.

Megjelenik továbbá a jobb felső sarokban két új bíborszínű gomb. Az első a kommentekhez ugrik, méghozzá ha van már az oldalon saját komment, akkor a legelsőhöz, ha nincs, akkor a kommentfolyam elejére. A második a saját hozzászólások oldalát nyitja meg. Az utóbbi továbbra is olyan, amilyen, de legalább könnyebb így elérni.

A következő, újabb módosítás az automatikus bejelentkezés. A bővítmény rendszeresen ellenőrzi, hogy van-e az oldalon bejelentkezési gomb, és ha van, bejelentkezik a böngészőben eltárolt
névvel és jelszóval (tehát a bővítménynek **nincs** tudomása a névről és jelszóról, nem kell félni) — biztonsági okokból a Bejelentkezés gombot nekünk kell megnyomni kézzel, ezt nem akartam
teljesen automatikussá és hát mögöttivé tenni. A Mandiner ezek után jellemzően rossz oldalra irányít át, 404-es hiba, a bővítmény ezt is kezeli és automatikusan továbbmegy a helyes oldalra.

Ha ismételten újra és újra bejelentkezik, akkor általában segít, ha a bejelentkezős oldalon megállva Ctrl+F5-tel (nem sima F5, Ctrl+R vagy az újratöltős gomb a címsor mellett) frissítjük az oldalt,
ilyenkor gyakran  a következő bejelentkezés már sikeres lesz. Persze, a hiba a Mandinerben van, nem bennünk, úgyhogy garancia semmire nincsen. Többször az is segít, ha nem tartunk túl sok mandineres
oldalt egyszerre megnyitva, és főleg nem ugyanazt a cikket két fülön.

## Telepítés

A korábbival ellentétben ez nem GreaseMonkey, hanem egy teljesen önálló böngészőbővítmény. Egyelőre nem a szokásos boltokban (Chrome Webstore), hanem itt, ami kézzel való telepítést jelent. Nincs összecsomagolva, aláírva, egyelőre nézzük meg, hogy működik, mi a vélemény a gyakorlatban, szóljon bele mindenki más is, aztán majd meglátjuk...

Úgyhogy, most csak az próbálja ki, akinek a fejlesztői módban telepítés nem okoz gondot. *Bővítmények kezelése* a böngészőben, *Fejlesztői mód* bekapcsolva, a kódot akárhova letölteni, kicsomagolni, onnan telepíteni.

A bővítménynek szokásos módon van *Beállítások* ablaka az ikonon megjelenő menüben, ott lehet a letiltásokat kezelni. Ha be van pipálva, hogy egyáltalán szükséges (alapállapotban igen), akkor megjelennek a piros X-ek a hozzászólások mellett, egyébként nem. A letiltottak listája is itt jelenik meg, egyesével visszaengedhető mindenki, vagy az egész egyben törölhető, exportálható és importálható, ahogy Triacus szkriptjéből át van emelve most. A beállítások szándékosan úgy vannak, hogy a felhasználók kezelgetése után a végén a *Mentés* gombot meg kelljen nyomni, addig nem történik meg a változások átvezetése.

Itt lehet azt is beállítani, hogy csak elhalványítsa a letiltott felhasználókat, vagy ténylegesen tüntesse el. Az előbbinek van egy apró előnye: mivel így a hozzászólás továbbra is elfoglalja a helyet, nem fognak a letiltás közben ugrálni a tételek. Az eltüntetésnél viszont igen, a helyére csúsznak a mögötte levők. Kinek melyik tetszik jobban...

## Megbízhatóság

Hogy ne merülhessenek fel kételyek a bővítmény megbízhatóságát illetően, a forráskódot elláttam magyarázatokkal, méghozzá bőségesen. Annyira bőségesen, hogy gyakorlatilag minden egyes sorhoz odaírtam, mit csinál. Ez programozási szempontból nyilvánvalóan teljesen felesleges, de így programozni nem vagy alig tudók is követni tudják egészen apró lépésekben, hogy mit csinál a bővítmény, és hogy egészen nyilvánvalóan, láthatóan és igazolhatóan nem csinál semmi olyasmit, ami a legkisebb kételyre adna okot a megbízhatóságát illetően. Nem gyűjt adatot, a letiltott felhasználók listáján kívül nem tárol adatot, abszolúte nem kommunikál a külvilággal, egyetlen hívás sem található benne a Mandiner kezelésétől eltérő, külső címre, sehova. Nincs benne rejtett csapda, hátsó bejárat, semmi. A böngésző garantálja, hogy kizárólag a mandiner.hu oldalon működik, és kizárólag a saját fájljait használja, semmit nem vesz igénybe a netről.

A bővítmények programozásához nem értőknek még egy segédlet, hogy mire szolgál minden egyes fájl a csomagban:

* css/ads.css = a nemkívánatos felugró, beúszó, zavargó reklámok eltüntetésére szolgáló stíluslap [semmilyen futtatható programkód nincs benne]
* css/main.css = a Mandiner oldalának kinézetét átalakító stíluslap [semmilyen futtatható programkód nincs benne]
* icons = a Mandiner ikonja különféle méretekben, ez jelenik meg a böngésző bővítményei között
* scripts/content.js = a fórum tényleges kezelését, a hozzászólások kibontását, az új gombok elhelyezését végző rutinok [részletes magyarázattal ellátva]
* settings/settings.html = a Beállítások oldal stílusa és a rajta található gombok, kezelőszervek, feliratok [semmilyen futtatható programkód nincs benne]
* settings/settings.js = a Beállítások oldal kezelését végző rutinok [részletes magyarázattal ellátva]
* manifest.json = a bővítmény leíró adatait tartalamazó fájl:
  - név
  - verzió
  - leírás
  - annak megjelölése, hogy csak a "mandiner.hu" oldalon érvényes, a böngésző máshol figyelembe sem veszi
  - a működéshez szükséges belső fájlok megadása
  - az egyedüli engedély a letiltott felhasználók nevének böngészőben való eltárolásához szükséges
  - az ikonok felsorolása
  - biztonsági beállítás, hogy kizárólag a saját programfájljait használhatja a bővítmény, semmilyen más (netes) forrásból származót nem
* README.md = ez a leírás
