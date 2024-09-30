document.getElementById('changePassForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Verificar se algum campo está vazio
    if (!email || !password || !confirmPassword) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const data = {
        email,
        password,
        confirmPassword,
    }

    console.log(data)

    const URL = 'http://localhost:8080/user/changePass';

    fetch(URL, {
        method: 'PUT',
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
            if (data.sucess) {
                return window.location.href = 'http://127.0.0.1:5500/pages/site/login.html';
            }


        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao enviar o link. Tente novamente mais tarde.');
        });

})