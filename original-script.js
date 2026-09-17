function toggleMenu() {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');
  if (menu) menu.classList.toggle('open');
  if (icon) icon.classList.toggle('open');
}

function toggleReadMore() {
  const content = document.getElementById('more-about');
  const button = document.querySelector('.read-more-btn');
  if (!content || !button) return;
  content.classList.toggle('show');
  button.innerText = content.classList.contains('show') ? 'Show Less ♡' : 'Read More ♡';
}
