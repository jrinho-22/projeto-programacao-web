function showSection(id) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(el => el.classList.add('hide'))
  document.getElementById(id).classList.remove(['hide'])
}
