import checkMain from './home.js'

// Executa ao carregar a página
window.onload = function () {

    const signout = document.getElementById('signout')

    const token = localStorage.getItem('token');
    checkMain(token)

    signout.addEventListener('click', () => {
        localStorage.removeItem('token');
        alert('Deslogado com sucesso');
        window.location.href = '../../index.html'
    })

};