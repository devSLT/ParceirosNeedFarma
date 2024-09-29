
const resendButton = document.getElementById('resendButton');
const countdownElement = document.getElementById('countdown');
let countdownTime = 6 * 60; // 6 minutos em segundos

const countdownInterval = setInterval(() => {
    const minutes = Math.floor(countdownTime / 60);
    const seconds = countdownTime % 60;
    countdownElement.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    if (countdownTime > 0) {
        countdownTime--;
    } else {
        clearInterval(countdownInterval);
        resendButton.disabled = false;
        countdownElement.textContent = '0:00';
    }
}, 1000);

resendButton.addEventListener('click', () => {
    // Reenviar código aqui (chamada para o backend via fetch ou AJAX)
    alert("Código reenviado para o e-mail!");

    // Reiniciar o temporizador de 6 minutos
    countdownTime = 6 * 60;
    resendButton.disabled = true;

    const newInterval = setInterval(() => {
        const minutes = Math.floor(countdownTime / 60);
        const seconds = countdownTime % 60;
        countdownElement.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

        if (countdownTime > 0) {
            countdownTime--;
        } else {
            clearInterval(newInterval);
            resendButton.disabled = false;
        }
    }, 1000);
});

