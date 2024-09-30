document.getElementById('sendLinkPass').addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;

    const data = {
        email,
    }

    const URL = 'http://localhost:8080/criar/forgotPass';

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

            //Link pagina mudar senha
            if (data.msg === 'Link para criação da nova senha enviado') {
                return window.location.href = 'http://127.0.0.1:5500/pages/site/changePass.html';
            }

        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao enviar o link. Tente novamente mais tarde.');
        });

})