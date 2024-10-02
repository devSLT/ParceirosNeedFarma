import checkMain from './home.js'

// Executa ao carregar a página
window.onload = function () {

    const token = localStorage.getItem('token');
    checkMain(token)

};





