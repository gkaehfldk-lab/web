const menuList = document.querySelector('.aside ul');

function navigateMenu(event) {
  const link = event.target instanceof Element
    ? event.target.closest('a')
    : null;

  if (!link || !menuList.contains(link)) {
    return;
  }

  if (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    (link.target && link.target !== '_self')
  ) {
    return;
  }

  event.preventDefault();
  window.location.assign(link.href);
}

menuList.addEventListener('click', navigateMenu);