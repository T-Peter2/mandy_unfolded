// A letiltottak listája
var disabledUsers = [];

// Beállítások lementése a böngészőbe
const saveOptions = () => {
  // A jelölőmezők kiolvasása
  const hideDisabledUsers = document.getElementById('hide_disabled_users').checked;
  const dimDisabledUsers = document.getElementById('dim_disabled_users').checked;

  // Adatok lementése
  chrome.storage.local.set({
    disabledUsers: JSON.stringify(disabledUsers),
    hideDisabledUsers: hideDisabledUsers,
    dimDisabledUsers: dimDisabledUsers,
  }).then(() => {
    // Üzenet a felhasználónak
    showStatus('Lementve.');
  });
};

// Beállítások kiolvasása a böngészőből
const restoreOptions = () => {
  chrome.storage.local.get(['hideDisabledUsers', 'dimDisabledUsers', 'disabledUsers']).then((result) => {
    document.getElementById('hide_disabled_users').checked = result.hideDisabledUsers ?? true;
    document.getElementById('dim_disabled_users').checked = result.dimDisabledUsers ?? true;
    disabledUsers = JSON.parse(result.disabledUsers ?? '[]');
    // Letiltottak listájának megjelenítése
    displayUsers();
  });
};

// Letiltottak listájának megjelenítése
function displayUsers() {
  // A névlista helye
  var list = document.getElementById('disabled_users');
  // Töröljük a korábbi listát
  list.replaceChildren();
  // Minden egyes letiltott névhez:
  for (let user of disabledUsers) {
    // ... létrehozunk egy listaelemet
    var item = document.createElement('li');
    namePart = document.createElement('span'),
      namePart.innerText = user;
    // * jelölőmező a név elé
    item.appendChild(createEnableButton(user));
    // * a név maga
    item.appendChild(namePart);
    // Hozzáadjuk a listához
    list.appendChild(item);
  }
}

// Egy felhasználó engedélyezése
function enableUser(button) {
  // A felhasználó neve
  var userName = button.getAttribute('data-username');
  // Kivesszük a nevet a listából (lemásoljuk a listát úgy, hogy mindenkit átmásolunk, kivéve ezt a felhasználót)
  disabledUsers = disabledUsers.filter(item => item !== userName);
  // Letiltottak listájának megjelenítése
  displayUsers();
}

// Engedélyező gomb létrehozása
function createEnableButton(userName) {
  var button = document.createElement('button');
  button.innerText = '✓';
  button.setAttribute('title', 'Engedélyezés');
  button.classList.add('mandy-unfolded-enable-user');
  button.setAttribute('data-username', userName);
  button.onclick = () => enableUser(button);
  return button;
}

// letiltottak listájának kitörlése
const clearDisabledList = () => {
  disabledUsers = [];
  // Letiltottak listájának megjelenítése
  displayUsers();
};

// Letiltottak listájának beolvasása TXT fájlból
const importDisabledList = () => {
  // Fájlválasztó alapértelmezett beállításai: fájl típusa
  let fileInput = document.createElement('input');
  fileInput.setAttribute('type', 'file');
  fileInput.setAttribute('accept', '.txt');
  fileInput.onchange = () => {
    // Megtörtént a fájl kiválasztása
    var reader = new FileReader();
    var file = fileInput.files[0];
    reader.onload = (event) => {
      // A fájl tartalmát szétvágjuk sorokra.
      // Minden sor egy felhasználó neve.
      var newUsers = event.target.result.split('\n');
      // Ha a beolvasott felhasználók száma nagyobb nullánál, azaz nem volt üres a fájl, ...
      if (newUsers.length !== 0) {
        // ... akkor minden egyes felhasználóra:
        for (let newUser of newUsers) {
          // Ha a név érvényes, nem üres és még nem tiltottuk le ezt a felhasználót (vagyis csak egyszer szerepel a neve a fájlban), ...
          if (newUser != '' && (disabledUsers.length == 0 || !disabledUsers.includes(newUser))) {
            // .. hozzáadjuk a nevet a listánkhoz.
            disabledUsers.push(newUser);
          }
        }
        // Letiltottak listájának megjelenítése
        displayUsers();
      }
    };
    // Beolvassuk a kiválasztott fájlt.
    // Amikor megvan a tartalma, a fenti onload() reagál rá.
    reader.readAsText(file);
  };
  // Megmutatjuk a felhasználónak a fájlválasztót.
  // Amikor választott, a fenti onChange() reagál rá.
  fileInput.click();
};

// Letiltottak listájának kimentése TXT fájlba
const exportDisabledList = () => {
  // Ha van egyáltalán letiltott felhasználó, ...
  if (disabledUsers.length > 0) {
    // Egybemásoljuk a neveket, mindegyiket új sorba.
    var users = disabledUsers.join('\n');
    // Létrehozunk egy linket, amire kattintva le lehet tölteni a fájlt
    var downloadLink = document.createElement('a');
    downloadLink.setAttribute('href',
      window.URL.createObjectURL(
        new Blob([users], { type: 'text/plain' })
      )
    );
    // Odaadjuk a linknek a fájlt a megadott névvel, ...
    downloadLink.setAttribute('download', 'Mandy_felhasznalok.txt');
    // ... és megnyomjuk a felhasználó helyett, így a letöltés automatikusan elindul.
    downloadLink.click();
  }
  else
    // Ha nincs letiltott felhasználó, értesítést adunk.
    showStatus('Nincsenek letiltott felhasználók.');
};

// Egy rövid üzente felvillantása 750 ms időtartamra
function showStatus(message) {
  const status = document.getElementById('status');
  status.textContent = message;
  setTimeout(() => {
    status.textContent = '';
  }, 750);
}

// Az oldal betöltésekor beolvassuk a böngészőben tárolt beállításokat.
document.addEventListener('DOMContentLoaded', restoreOptions);

// Az egyes gombokhoz hozzárendeljük a feladatukat végrehajtó kezelőket.
document.getElementById('enable_all').onclick = clearDisabledList;
document.getElementById('import').onclick = importDisabledList;
document.getElementById('export').onclick = exportDisabledList;
document.getElementById('save').onclick = saveOptions;
