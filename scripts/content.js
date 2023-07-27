var hideDisabledUsers = true;
var disabledUsers = [];
var ownName = '';

function unfoldReplies() {
  var findReplies = document.querySelectorAll('span.show-more-text:not(.mandy-unfolded-processed)');
  for (let reply of findReplies) {
    if (reply.innerHTML.endsWith('megtekintése ')) {
      reply.classList.add('mandy-unfolded-processed');
      reply.closest('div.response-count').classList.add('mandy-unfolded-hidden');
      reply.click();
    }
  }
}

function loadMore() {
  var findLoadMore = document.querySelectorAll('button.btn-primary');
  for (let button of findLoadMore) {
    if (button.innerText === 'Továbbiak betöltése') {
      button.click();
    }
  }
}

function hideAllDisabledUsers() {
  ownName = document.querySelector('span.font-username-bold')?.textContent.trim() ?? '';
  var findComments = document.querySelectorAll('man-comment-card:not(.mandy-unfolded-processed)');
  for (let comment of findComments) {
    comment.classList.add('mandy-unfolded-processed');
    var findName = comment.querySelector('div.comment-card-name');
    var name = findName.childNodes[0].textContent.trim();
    if (name === ownName) {
      findName.classList.add('mandy-unfolded-own');
    }
    else if (hideDisabledUsers) {
      if (disabledUsers.includes(name)) {
        comment.classList.add('mandy-unfolded-disabled');
      }
      else {
        findName.after(createDisableButton(name));
      }
    }
  }
}

function hideSingleUser(userName) {
  var findComments = document.querySelectorAll('man-comment-card');
  for (let comment of findComments) {
    var findName = comment.querySelector('div.comment-card-name');
    var name = findName.childNodes[0].textContent.trim();
    if (name === userName) {
      comment.classList.add('mandy-unfolded-processed', 'mandy-unfolded-disabled');
    }
  }
}

function disableUser(button) {
  var userName = button.getAttribute('data-username');
  if (disabledUsers.length == 0 || !disabledUsers.includes(userName)) {
    hideSingleUser(userName);
    disabledUsers.push(userName);
    chrome.storage.local.set({ disabledUsers: JSON.stringify(disabledUsers) });
  }
}

function createDisableButton(userName) {
  var button = document.createElement('button');
  button.innerText = '🗙';
  button.classList.add('mandy-unfolded-disable-user');
  button.setAttribute('title', 'Tiltás');
  button.setAttribute('data-username', userName);
  button.onclick = () => disableUser(button);
  return button;
}

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

const unfoldInterval = setInterval(unfoldReplies, 1000);
const loadMoreInterval = setInterval(loadMore, 10000);
const hideDisabledUserInterval = setInterval(hideAllDisabledUsers, 5000);

chrome.storage.local.get(['hideDisabledUsers', 'disabledUsers']).then((result) => {
  hideDisabledUsers = result.hideDisabledUsers ?? true;
  disabledUsers = JSON.parse(result.disabledUsers ?? '[]');
});

var searchButton = document.querySelector('div.header-search');
var ownButton = createHeaderButton('hamburger-user');
ownButton.onclick = () => {
  window.open('profil/hozzaszolasok');
};
searchButton.after(ownButton);

var jumpButton = createHeaderButton('folder-open-white');
jumpButton.onclick = () => {
  var comments = document.querySelector('app-comment-section');
  comments.scrollIntoView()
};
searchButton.after(jumpButton);
