document.getElementById('sendLinkPass').addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;

    const data = {
        email,
    }

    const URL = 'https://api-parceiros.onrender.com/user/forgotPass';

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
                return window.location.href = 'https://parceiros-need-farma.vercel.app/pages/site/changePass.html';
            }

        })
        .catch(error => {
             console.error('Erros:', error);
            alert('Ocorreu um erro ao enviar o link. Tente novamente mais tarde.');
        });

})