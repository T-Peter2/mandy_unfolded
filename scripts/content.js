// Letiltsuk a nemkívánatosokat egyáltalán?
var hideDisabledUsers = true;
// Ha letiltjuk, elég kiszürkíteni, vagy tűnjenek szem elől?
var dimDisabledUsers = true;
// A letiltottak listája
var disabledUsers = [];
// A saját nevünk
var ownName = '';

// Kicsomagolás
function unfoldReplies() {
  // Az összes még eddig fel nem dolgozott "válasz megtekintése" link
  var findReplies = document.querySelectorAll('span.show-more-text:not(.mandy-unfolded-processed)');
  for (let reply of findReplies) {
    // minden "válasz megtekintése" linkre:
    if (reply.innerHTML.endsWith('megtekintése ')) {
      // jelezzük a linken, hogy már feldolgoztuk, hogy legközelebb már ne nyomjuk meg újból
      reply.classList.add('mandy-unfolded-processed');
      // eltüntetjük magát a számlálós linket
      reply.closest('div.response-count').classList.add('mandy-unfolded-hidden');
      // megnyomjuk a linket, hogy a válasz előbukkanjon
      reply.click();
    }
  }
}

// További kozzászólások betöltése
function loadMore() {
  // Minden elsődleges gomb
  var findLoadMore = document.querySelectorAll('button.btn-primary');
  for (let button of findLoadMore) {
    // Ha ez egy "Továbbiak betöltése" gomb, ...
    if (button.innerText === 'Továbbiak betöltése') {
      // ...megnyomjuk
      button.click();
    }
  }
}

// Tiltott felhasználók eltüntetése
function hideAllDisabledUsers() {
  // Saját nevünk kinyerése
  ownName = document.querySelector('span.font-username-bold')?.textContent.trim() ?? '';
  // Az összes még fel nem dolgozott hozzászólás
  var findComments = document.querySelectorAll('man-comment-card:not(.mandy-unfolded-processed)');
  for (let comment of findComments) {
    // Jelezzük a hozzászóláson, hogy már feldolgoztuk, hogy legközelebb már ne tegyük meg újból
    comment.classList.add('mandy-unfolded-processed');
    // A hozzászóló neve
    var findName = comment.querySelector('div.comment-card-name');
    var name = findName.childNodes[0].textContent.trim();
    // Ha megegyezik a saját nevünkkel, akkor a mi hozzászólásunk
    if (name === ownName) {
      // Saját nevet kiemelő stílus
      findName.classList.add('mandy-unfolded-own');
      // A név mögé kerül a hozzászólásaink között ugráló gomb
      findName.after(createNextButton());
    }
    // Nem saját hozzászólás
    // Ha kértük a tiltott felhasználók letiltását, ...
    else if (hideDisabledUsers) {
      // és ez a felhasználó a tiltottak között van, ...
      if (disabledUsers.includes(name)) {
        // a megfelelő (kiszürkítő vagy eltüntető) stílus kiválasztása
        var disabledClass = dimDisabledUsers ? 'mandy-unfolded-dimmed' : 'mandy-unfolded-hidden';
        // és a stílus hozzárendelése a hozzászóláshoz
        comment.classList.add(disabledClass);
      }
      else {
        // nem tiltott felhasználó, odatesszük a név mögé a piros X-et, hátha egyszer le akarjuk tiltani
        findName.after(createDisableButton(name));
      }
    }
  }
}

// A hozzászólásaink között ugráló gomb létrehozása
function createNextButton() {
  var button = document.createElement('button');
  button.innerText = '▼';
  button.classList.add('mandy-unfolded-next-comment');
  button.setAttribute('title', 'Következő');
  button.onclick = () => nextOwnComment();
  return button;
}

// Ugrás a következő hozzászólásunkra
function nextOwnComment() {
  // Az összes olyan hozzászólás, amire még nem ugrottunk rá
  var findComments = document.querySelectorAll('man-comment-card:not(.mandy-unfolded-visited)');
  for (let comment of findComments) {
    // A hozzászóló neve
    var findName = comment.querySelector('div.comment-card-name');
    var name = findName.childNodes[0].textContent.trim();
    // Ha megegyezik a saját nevünkkel, akkor a mi hozzászólásunk
    if (name === ownName) {
      // Megjelöljük, hogy ide már ugrottunk egyszer
      comment.classList.add('mandy-unfolded-visited');
      // Behozzuk a nevet (és ezzel együtt magát a hozzászólást) a böngésző közepére
      findName.scrollIntoView();
      return;
    }
  }
}

// Ugrás a legelső hozzászólásunkra
function firstOwnComment() {
  // Az összes hozzászólás
  var findComments = document.querySelectorAll('man-comment-card');
  for (let comment of findComments) {
    // A hozzászóló neve
    var findName = comment.querySelector('div.comment-card-name');
    var name = findName.childNodes[0].textContent.trim();
    // Ha megegyezik a saját nevünkkel, akkor a mi hozzászólásunk
    if (name === ownName) {
      // Visszaadjuk a saját első hozzászólásunkat
      return comment;
    }
  }
}

// A megadott nevű felhasználó elrejtése
function hideSingleUser(userName) {
  // Az összes hozzászólás
  var findComments = document.querySelectorAll('man-comment-card');
  for (let comment of findComments) {
    // A hozzászóló neve
    var findName = comment.querySelector('div.comment-card-name');
    var name = findName.childNodes[0].textContent.trim();
    // Ha megegyezik a megadott névvel, akkor ezt le akarjuk tiltani
    if (name === userName) {
      // a megfelelő (kiszürkítő vagy eltüntető) stílus kiválasztása
      var disabledClass = dimDisabledUsers ? 'mandy-unfolded-dimmed' : 'mandy-unfolded-hidden';
      // és a stílus hozzárendelése a hozzászóláshoz
      comment.classList.add('mandy-unfolded-processed', disabledClass);
    }
  }
}

// A felhasználó hozzáadása a tiltottak listájához
function disableUser(button) {
  // A felhasználó neve
  var userName = button.getAttribute('data-username');
  // Ha egyáltalán van letiltott felhasználó és a megadottat még nem tiltjuk eddig, ...
  if (disabledUsers.length == 0 || !disabledUsers.includes(userName)) {
    // * eltüntetjük az aktuális hozzászólásait,
    hideSingleUser(userName);
    // * hozzáadjuk a letiltottak listájához,
    disabledUsers.push(userName);
    // * a kibővített listát eltároljuk a böngészőben.
    chrome.storage.local.set({ disabledUsers: JSON.stringify(disabledUsers) });
  }
}

// Letiltó piros X gomb létrehozása
function createDisableButton(userName) {
  var button = document.createElement('button');
  button.innerText = '🗙';
  button.classList.add('mandy-unfolded-disable-user');
  button.setAttribute('title', 'Tiltás');
  button.setAttribute('data-username', userName);
  button.onclick = () => disableUser(button);
  return button;
}

// Új lila gomb a fejlécbe
function createHeaderButton(icon) {
  var template = document.createElement('template');
  template.innerHTML = `
  <div class='header-comments'>
    <button class='header-comments-button-desktop'>
      <i class='icon icon-mandiner-${icon}'></i>
    </button>
    <button class='header-comments-button-mobile'>
      <i class='icon icon-mandiner-${icon}'></i>
    </button>
  </div>`;
  return template.content.firstElementChild.cloneNode(true);
}

// Automatikus bejelentkezés
function autoLoginUser() {
  // Minden harmadlagos gomb
  var findLogin = document.querySelectorAll('button.btn-tertiary');
  for (let button of findLogin) {
    // Ha ez egy "Bejelentkezés" gomb, ...
    if (button.innerText === 'Bejelentkezés') {
      // ...megnyomjuk
      button.click();
    }
  }
}

// Rendszeres időzítéssel meghívjuk a következő négy funckiót:
//
// * 1 másodpercenként a kicsomagolást
const unfoldInterval = setInterval(unfoldReplies, 1000);
// * 10 másodpercenként a további hozzászólások betöltését
const loadMoreInterval = setInterval(loadMore, 10000);
// * 5 másodpercenként a tiltott felhasználók eltüntetését
const hideDisabledUserInterval = setInterval(hideAllDisabledUsers, 5000);
// * 3 másodpercenként az automatikus bejelentkezést
const autoLoginUserInterval = setInterval(autoLoginUser, 3000);

// Beállítások betöltése a böngészőből
chrome.storage.local.get(['hideDisabledUsers', 'dimDisabledUsers', 'disabledUsers']).then((result) => {
  // Letiltjuk?
  hideDisabledUsers = result.hideDisabledUsers ?? true;
  // Kiszürkíteni vagy eltüntetni?
  dimDisabledUsers = result.dimDisabledUsers ?? true;
  // Letiltottak listája
  disabledUsers = JSON.parse(result.disabledUsers ?? '[]');
});

// Keresés gomb, ehhez képest szúrjuk be az újakat
var searchButton = document.querySelector('div.header-search');

// Saját profil gomb (háromvonalas ikon)
var ownButton = createHeaderButton('hamburger-user');
ownButton.onclick = () => {
  // Megnyomásakor erre az oldalra ugrik
  window.open('profil/hozzaszolasok');
};
// Beszúrjuk az új gombot a Keresés mögé
searchButton.after(ownButton);

// Saját hozzászólások gomb (mappa ikon)
var jumpButton = createHeaderButton('folder-open-white');
jumpButton.onclick = () => {
  // Első hozzászólásunk
  var comment = firstOwnComment();
  if (comment == undefined) {
    // Ha nincs még saját hozzászólásunk, akkkor a kommentmező eleje
    comment = document.querySelector('app-comment-section');
  }
  // Odaugrunk a célhoz
  comment.scrollIntoView();
};
// Beszúrjuk az új gombot a Keresés mögé
searchButton.after(jumpButton);

window.onload = function () {
  // %kommentek az URL végéről levágva
  if (location.href.endsWith("%23kommentek")) {
    const url = location.href.split('%')[0]
    window.location.replace(url);
  }
  // #kommentek az URL végéről levágva
  else if (location.href.endsWith("#kommentek")) {
    const url = location.href.split('#')[0]
    window.location.replace(url);
  }
  // utm_source az URL végéről mindenestül levágva
  else if (location.href.includes("utm_source")) {
    const url = location.href.split('?')[0]
    window.location.replace(url);
  }
}
