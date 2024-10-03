$(document).ready(function() {
    function updateDayText() {
        // Array com os dias da semana
        const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
        
        // Obter a data atual
        const today = new Date();
        const dayOfWeek = daysOfWeek[today.getDay()];
        const day = today.getDate();
        const month = today.toLocaleString('pt-BR', { month: 'long' });

        // Montar o texto formatado
        const formattedText = `<i><i class="bi bi-brightness-high"></i> ${dayOfWeek}, ${day} de ${month}</i>`;

        // Atualizar o texto do elemento com id "dayText"
        $('#dayText').html(formattedText);
    }

    // Chamar a função para atualizar o texto
    updateDayText();
});