import candidates from './data/Candidate.js'

/* Lưu data trên LocalStoreage */
if (!localStorage.getItem('candidates')) {
    localStorage.setItem('candidates', JSON.stringify(candidates));
}

async function loadComponent(id, path) {
  const res = await fetch(path);
  document.getElementById(id).innerHTML = await res.text();
}

async function initApp() {
  await loadComponent('sidebar', './page/Sidebar.html');
  await loadComponent('main-content', './page/CandidateList.html');
  await loadComponent('popupBackdrop', './page/Popup.html');
  await loadComponent('popupEdit', './page/PopupEdit.html');

  const { default: initCandidateList } = await import('./components/CandidateList.js');
  const { default: initPopup } = await import('./components/Popup.js');
  const { default: initPopupEdit } = await import('./components/PopupEdit.js');
  const { default: initSidebar } = await import('./components/sidebar.js');

  initCandidateList();
  initPopup();
  initPopupEdit();
  initSidebar();
}

document.addEventListener('DOMContentLoaded', initApp);

