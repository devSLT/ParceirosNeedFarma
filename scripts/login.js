//Login 
function login() {

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberme = document.getElementById('rememberme').checked;

    // Verifica se o email e a senha foram preenchidos
    if (email && password) {
        if (rememberme) {
            // Salva o email no localStorage
            localStorage.setItem('email', email);
        } else {
            // Remove o email do localStorage se "Lembrar de mim" não estiver marcado
            localStorage.removeItem('email');
        }
    }

    const data = {
        email,
        password,
    }

    const URL = 'https://api-parceiros.onrender.com/user/login';

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('ola')
            if (data.sucess == true) {

                localStorage.setItem('token', data.token);
                window.location.href = "../../index.html"; //https://parceiros-need-farma.vercel.app/index.html

            } else {
                alert(data.msg)
            }

        })
        .catch(err => {
            console.log('Ocorreu um erro: ', err)
        })

}

$(".toggle-password").click(function() {

    $(this).toggleClass("bi-eye-fill bi-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});

window.onload = function () {
    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
        document.getElementById('email').value = savedEmail;
        document.getElementById('rememberme').checked = true;
    }
}