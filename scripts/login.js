document.getElementById('formLogin').addEventListener('submit', (event)=>{
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data = {
        email,
        password,
    }

    const URL = 'http://localhost:8080/entrar/login';

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

            //Link pagina verificar codigo
            if (data.sucess) {
                return window.location.href = 'http://127.0.0.1:5500/index.html';
            }

        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao enviar o formulário. Tente novamente mais tarde.');
        });
})