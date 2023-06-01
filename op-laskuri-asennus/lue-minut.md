Laskurin asennus verkkosivuille
===============================

Löydät linkin laskurin luomiseen osoitteessa https://kauppiasportaali.fi/kauppias/myra/etusivu.

Perusasennus
============

* Liitä tiedosto `op-calc-widget.js` haluamaasi kohtaan verkkosivun lähdekoodiin tai esim. tag manageriin. 
* Menettele samoin `op-calc-widget.css` tyylimäärittely kanssa.
* Jatka seuravaan kohtaan Laskurityypin asetukset.

Laskurityypin asetukset
=======================

* Kun perusasennus on tehty, luodaan asetukset jokaista käyttöön otettavaa laskurityyppiä kohti. 
* Löydät linkin asetuksien luomiseen osoitteessa `https://kauppiasportaali.fi/kauppias/myra/etusivu`.
* Kopioi script-tagi asetukset sivustollesi.
* Voit hallinnoida laskurin esiintymistä eri sivujen välillä ajamalla yksittäisen asetuksen vain tietyillä sivuilla (esim. kelluva laskuri) esim. tag managerin tai sivuston back end tai front end-koodissa ehtolauseiden avulla.

Laskurin sijainnin määrittäminen
================================

Kelluva laskuri

* Kelluva laskuri ei vaadi ylimääräisiä toimenpiteitä. Laskuri toimii kun laskurin koodi, tyylimäärittely ja asetukset on ladattu sivuston käyttäjälle.

Laskuri sisällön joukkoon

* Tee perusasennus ja lisää laskurityypin asetukset
* Nyt voit lisätä seuraavan div-tagin sivuille: 

```
<div id="op-keti-init-content"></div>
```

* Laskuri latautuu HTML-tagin tilalle.
* Mikäli käyttämäsi sisällönhallintajärjestelmä (esim. WordPress) sallii HTML-koodin, voit valita laskurin paikan suoraan sivustosi ylläpidosta. Tägi voidaan myös laittaa HTML-koodin joukkoon.

Verkkokauppalaskuri

* Määritä tuotesivun lähdekoodiin haluamaasi kohtaan HTML-tagi: 

```
<div id="op-keti-init-product"></div>
```

* Laskuri latautuu HTML-tagin tilalle.
* Verkkokauppalaskurin rahoitusmäärä asetetaan ohjelmallisesti. Ohjeen löydät alta.

Laskurin ohjelmallinen käyttö
=============================

Joitakin laskuriin liittyviä toimintoja voidaan muokata ohjelmallisesti.

Laskurin rahoituksen määrän asettaminen:

Verkkokauppalaskuri:

```
__opCalcWidget["product"].setAmount(12345);
```

Laskuri sisällön joukossa:

```
__opCalcWidget["content"].setAmount(12345);
```

Kelluva laskuri

```
__opCalcWidget["floating"].setAmount(12345);
```

Laskurin lisätoiminnot
======================

Fontin vaihtaminen

Oletusarvoisesti fontti määräytyy sivuston mukaan. Mikäli käytät toistakin fonttia, voit vaihtaa sen käyttöön seuraavalla CSS-määrityksellä:

```
.op-keti__widget {
  font-family: "Times New Roman";
}
```

Muita edistyneempiä asetuksia
=============================

Joitakin laskurin ominaisuuksia voi kytkeä päälle tai pois tarpeen mukaan muokkamalla asetuksia käsin. Käyttötapaus, jossa näin halutaan tehdä, on esim. laskurin sisäinen käyttö. Lisää tarvittavat muokkaukset laskurin asetuksin javascript-objektiin.

Rahoituksen oletussumma:

```
initAmount: 5000
```

Rahoituksen minimimäärä:

```
initAmountMin: 2500
```


Ota pois summan muuttaminen käyttöliittymästä (määrä asetetaan tällöin aina ohjelmallisesti):

```
enableInputChanges: false
```

Näytä tai piilota painike hakuputkeen (esim. sisäinen tilausjärjestelmä):

```
showCta: true
```

Näytä tai piilota rahoituksen lisätietoja:

```
showInfo: {
  realInterest: true,
  interestMargin: true,
  paybackTime: true,
  costEstimate: true
}
```

Tekstit:

```
texts: {
  ctaButton: 'Tutustu ja hae',
  inputAmountLabel: 'Rahoituksen määrä',
  teaser: 'Maksa 1 kk päästä toimituksesta ...',
  altTeaser: 'Toinen tekstiosuus, summien valinnan jälkeen',
  linkMore: 'Lue lisää -linkin teksti',
  floating: {
    openButton: 'Maksa erissä',
  },
  product: {
    openButtonTextStart: 'Tai', 
    openButtonTextEnd: 'rahoituksella.'
  }
}
```
