
const confirmCode = document.getElementById('confirmCode')

confirmCode.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o envio do formulário para que possamos verificar os campos

    const email = document.getElementById('email').value;
    const verificationCode = document.getElementById('verificationCode').value;

    // Verificar se algum campo está vazio
    if (!email || !verificationCode) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const URL = "https://api-parceiros.onrender.com/user/verify";

    let data = {
        email,
        verificationCode,
    }

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)

            alert(data.msg)
            if(data.msg === 'Sua conta foi enviada para análise, enviaremos um email assim que ela for aceita.'){
                //Envia para a tela de login
                return window.location.href = 'https://parceiros-need-farma.vercel.app/pages/site/login.html';
            }

        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao enviar o formulário. Tente novamente mais tarde.');
        });

});
