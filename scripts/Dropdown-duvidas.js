const dropDownItems = document.querySelectorAll('.dropdownDuvidas');

dropDownItems.forEach(item => {
  const question = item.querySelector('.dropQuestion');
  const answer = item.querySelector('.textDrop');

  question.addEventListener('click', () => {
    if (answer.style.maxHeight) {
      answer.style.maxHeight = null; // Fecha a resposta
      answer.style.opacity = 0;
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px"; // Abre a resposta com altura dinâmica
      answer.style.opacity = 1;
    }
  });
});
