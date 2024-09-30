
//tratando do formulario de envio
const botaoSub = document.getElementById('cadastroForm')

botaoSub.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o envio do formulário para que possamos verificar os campos

    const businessName = document.getElementById('businessName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const personalPhone = document.getElementById('personalPhone').value;
    const cnpj = document.getElementById('cnpj').value;
    const businessType = document.getElementById('businessType').value;
    const cep = document.getElementById('cep').value;
    const address = document.getElementById('address').value;
    const password = document.getElementById('password').value;

    // Verificar se algum campo está vazio
    if (!businessName || !email || !personalPhone || !phone || !cnpj || !businessType || !cep || !address || !password) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const URL = "http://localhost:8080/criar/signup";

    let data = {
        businessName,
        email,
        phone,
        personalPhone,
        cnpj,
        businessType,
        cep,
        address,
        password,
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

            //Link pagina verificar codigo
            if (data.msg === 'Código de verificação enviado.') {
                return window.location.href = 'http://127.0.0.1:5500/pages/site/codeVerificar.html';
            }

        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao enviar o formulário. Tente novamente mais tarde.');
        });

});