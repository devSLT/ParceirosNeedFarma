//Login 
function login() {

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
        .then(response => response.json())
        .then(data => {

            console.log('Resposta do servidor: ', data)

            if (data.sucess == true) {

                localStorage.setItem('token', data.token);
                window.location.href = "http://127.0.0.1:5501/index.html";

            } else {
                alert(data.msg)
            }

        })
        .catch(err => {
            console.log('Ocorreu um erro: ', err)
        })

}



