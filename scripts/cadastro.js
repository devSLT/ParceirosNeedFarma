
//tratando do formulario de envio
const botaoSub = document.getElementById('cadastroForm')

botaoSub.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o envio do formulário para que possamos verificar os campos

    const businessName = document.getElementById('businessName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById("phone").value.replace(/\D/g,'').slice(2);
    const personalPhone = document.getElementById("personalPhone").value.replace(/\D/g,'').slice(2);
    const cnpj = document.getElementById('cnpj').value.replace(/\D/g,'');
    const businessTypeDropdown = document.getElementById('businessType').value;
    let businessType = businessTypeDropdown;

    if (businessTypeDropdown === "Outros") {
        const otherBusinessType = document.getElementById('otherBusinessType');
        businessType = otherBusinessType ? otherBusinessType.value : businessTypeDropdown;
    }
    
    const cep = document.getElementById('cep').value.replace(/\D/g,'');
    const address = document.getElementById('address').value;
    const password = document.getElementById('password').value;

    // Verificar se algum campo está vazio
    if (!businessName || !email || !personalPhone || !phone || !cnpj || !businessType || !cep || !address || !password) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const URL = "https://api-parceiros.onrender.com/user/register";

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
                return window.location.href = 'https://parceiros-need-farma.vercel.app/pages/site/codeVerificar.html';
            }

        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao enviar o formulário. Tente novamente mais tarde.');
        });

});

$(".toggle-password").click(function() {

    $(this).toggleClass("bi-eye-fill bi-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});
$(document).ready(function() {
    var SPMaskBehavior = function(val) {
            return val.replace(/\D/g, '').length === 13 ? '+55 (00) 00000-0000' : '+55 (00) 0000-00009';
        },
        spOptions = {
            onKeyPress: function(val, e, field, options) {
                field.mask(SPMaskBehavior.apply({}, arguments), options);
            }
        };

    $('.sp_celphones').mask(SPMaskBehavior, spOptions);
});

document.getElementById('businessType').addEventListener('change', function () {
    const outrosField = document.getElementById('outrosField');
    if (this.value === 'Outros') {
        // Check if input already exists, if not, create it
        if (!document.getElementById('otherBusinessType')) {
            const input = document.createElement('input');
            input.type = 'text';
            input.name = 'otherBusinessType';
            input.id = 'otherBusinessType';
            input.placeholder = 'Especifique o tipo de negócio';
            outrosField.appendChild(input);
        }
    } else {
        // Remove the input if it exists
        const otherInput = document.getElementById('otherBusinessType');
        if (otherInput) {
            outrosField.removeChild(otherInput);
        }
    }
});