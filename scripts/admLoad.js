import checkMain from './home.js'
const signoutbtn = document.getElementById('signout')

// Executa ao carregar a página
window.onload = function () {

    const token = localStorage.getItem('token');
    checkMain(token)

};

function signout(){
    localStorage.removeItem('token')
    window.location.href = "https://parceiros-need-farma.vercel.app/index.html";
    alert('Desconectado com sucesso!')
}

signoutbtn.addEventListener('click', signout)