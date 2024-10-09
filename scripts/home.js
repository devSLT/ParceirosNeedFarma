var userJson;

// Checkando existência do token na home, se nao existir nao acessar painel
function checkHome(token) {
    return new Promise((resolve) => { // Retorna uma Promise
        if (token) {
            fetch("https://api-parceiros.onrender.com/user/check", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    msg: "Verificando..."
                })
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Erro na requisição');
                    }
                    return res.json();
                })
                .then(data => {
                    const resposta = data.sucess;

                    switch (resposta) {
                        case true:
                            userJson = data.user; // Armazena os dados na variável
                            window.globalJson = userJson; // 
                            console.log("Token válido!");
                            resolve(userJson); // Resolve a Promise com userJson
                            break;
                        case false:
                            localStorage.removeItem('token');
                            reject('Token inválido');
                            break;
                        default:
                            localStorage.removeItem('token');
                            window.location.href = "https://parceiros-need-farma.vercel.app/pages/adm/adminhome.htmll";
                            break;
                    }
                })
                .catch(err => {
                    console.log(err);
                    window.location.href = "https://parceiros-need-farma.vercel.app/pages/adm/adminhome.html";
                });
        } else {
            console.log('Token inválido');
        }
    });
}

// Checkando existência do token ADMS, se nao existir nao acessar
function checkMain(token) {
    return new Promise((resolve, reject) => { // Retorna uma Promise
        if (token) {
            fetch("https://api-parceiros.onrender.com/user/check", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    msg: "Verificando..."
                })
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Erro na requisição');
                    }
                    return res.json();
                })
                .then(data => {
                    const resposta = data.sucess;

                    switch (resposta) {
                        case true:
                            userJson = data.user; // Armazena os dados na variável
                            window.globalJson = userJson; // 
                            console.log("Token válido!");
                            resolve(userJson); // Resolve a Promise com userJson
                            break;
                        case false:
                            localStorage.removeItem('token');
                            reject('Token inválido');
                            break;
                        default:
                            localStorage.removeItem('token');
                            window.location.href = "./pages/site/login.html";
                            break;
                    }
                })
                .catch(err => {
                    reject(err); // Rejeita a Promise em caso de erro
                    window.location.href = "/";
                });
        } else {
            reject('Token não fornecido'); // Rejeita se não houver tokens
            window.location.href = "/";

        }
    });
}


// Executa ao carregar a página
window.onload = function () {
    const token = localStorage.getItem('token');

    const cHeader = document.getElementById('cHeader')


    checkHome(token)
        .then(user => {

            const adm = user.admin;

            switch (adm) {
                case true:
                    //https://parceiros-need-farma.vercel.app/pages/adm/adminhome.html
                    cHeader.innerHTML = `<li><a class="dropdown-item" href="https://parceiros-need-farma.vercel.app/pages/adm/adminhome.html">Painel de Controle</a></li>`;
                    //
                    break;
                case false:
                    //https://parceiros-need-farma.vercel.app/pages/paineldecontrole/paineldecontrole.html
                    cHeader.innerHTML = `<li><a class="dropdown-item" href="https://parceiros-need-farma.vercel.app/pages/paineldecontrole/paineldecontrole.html">Painel de Controle</a></li>`;
                    //http://127.0.0.1:5501/pages/paineldecontrole/paineldecontrole.html
                    break;
                default:
                    cHeader.innerHTML = `<li><a class="dropdown-item" href="https://parceiros-need-farma.vercel.app/pages/adm/adminhome.html">Painel de Controle</a></li>`;
                    break;
            }
        })
        .catch(err => {
            console.error(err);
            alert(err); // Exibe um alerta se houver erro
        });
};

export default checkMain;



