document.getElementById('formLogin').addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data = {
        email,
        password,
    }

    const URL = 'http://localhost:8080/user/login';

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((res) => {

            if (!res.ok) {
                throw new Error('Erro na autenticação');
            }

            return res;
        }
        )
        .then((res) => {

            const token = res.headers.get('authorization-token'); // Ou 'authorization', dependendo do que seu servidor retorna

            if (token) {
                localStorage.setItem('token', token); // Armazena o token no localStorage
            }

            return res.json(); // Continuar para o próximo then

        })
        .then((data) => {
            console.log(data)

            alert(data.msg)

            const token = localStorage.getItem('token');

            if (token) {
                console.log('Token:', token);
            } else {
                console.log('Nenhum token encontrado.');
            }

            //Link pagina verificar codigo
            /* if (data.sucess) {
                 return window.location.href = 'http://127.0.0.1:5500/ParceirosNeedFarma/';
             }
 */
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao enviar o formulário. Tente novamente mais tarde.');
        });
})