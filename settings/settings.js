var disabledUsers = [];

const saveOptions = () => {
  const hideDisabledUsers = document.getElementById('hide_disabled_users').checked;

  chrome.storage.local.set({
    disabledUsers: JSON.stringify(disabledUsers),
    hideDisabledUsers: hideDisabledUsers,
  }).then(() => {
    showStatus('Lementve.');
  });
};

const restoreOptions = () => {
  chrome.storage.local.get(['hideDisabledUsers', 'disabledUsers']).then((result) => {
    document.getElementById('hide_disabled_users').checked = result.hideDisabledUsers ?? true;
    disabledUsers = JSON.parse(result.disabledUsers ?? '[]');
    displayUsers();
  });
};

function displayUsers() {
  var list = document.getElementById('disabled_users');
  list.replaceChildren();
  for (let user of disabledUsers) {
    var item = document.createElement('li');
    namePart = document.createElement('span'),
      namePart.innerText = user;
    item.appendChild(createEnableButton(user));
    item.appendChild(namePart);
    list.appendChild(item);
  }
}

function enableUser(button) {
  var userName = button.getAttribute('data-username');
  disabledUsers = disabledUsers.filter(item => item !== userName);
  displayUsers();
}

function createEnableButton(userName) {
  var button = document.createElement('button');
  button.innerText = '✓';
  button.setAttribute('title', 'Engedélyezés');
  button.classList.add('mandy-unfolded-enable-user');
  button.setAttribute('data-username', userName);
  button.onclick = () => enableUser(button);
  return button;
}

const clearDisabledList = () => {
  disabledUsers = [];
  displayUsers();
};

const importDisabledList = () => {
  let fileInput = document.createElement('input');
  fileInput.setAttribute('type', 'file');
  fileInput.setAttribute('accept', '.txt');
  fileInput.onchange = () => {
    var reader = new FileReader();
    var file = fileInput.files[0];
    reader.onload = (event) => {
      var newUsers = event.target.result.split('\n');
      if (newUsers.length !== 0) {
        for (let newUser of newUsers) {
          if (newUser != '' && (disabledUsers.length == 0 || !disabledUsers.includes(newUser))) {
            disabledUsers.push(newUser);
          }
        }
        displayUsers();
      }
    };
    reader.readAsText(file);
  };
  fileInput.click();
};

const exportDisabledList = () => {
  if (disabledUsers.length > 0) {
    var users = disabledUsers.join('\n');
    var downloadLink = document.createElement('a');
    downloadLink.setAttribute('href',
      window.URL.createObjectURL(
        new Blob([users], { type: 'text/plain' })
      )
    );
    downloadLink.setAttribute('download', 'Mandy_felhasznalok.txt');
    downloadLink.click();
  }
  else
    showStatus('Nincsenek letiltott felhasználók.');
};

function showStatus(message) {
  const status = document.getElementById('status');
  status.textContent = message;
  setTimeout(() => {
    status.textContent = '';
  }, 750);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('enable_all').onclick = clearDisabledList;
document.getElementById('import').onclick = importDisabledList;
document.getElementById('export').onclick = exportDisabledList;
document.getElementById('save').onclick = saveOptions;