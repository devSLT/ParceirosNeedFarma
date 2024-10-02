//Login 
function login() {

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;


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



