import checkMain from './home.js'

// Executa ao carregar a página
function loadpage () {
    const token = localStorage.getItem('token');

    checkMain(token)

};

document.addEventListener('DOMContentLoaded', loadpage())





