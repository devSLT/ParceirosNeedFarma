const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

// Fetch data and populate the table
async function populateTable() {
    try {
        const response = await fetch('http://localhost:8080/table/');
        const data = await response.json();

        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = ''; // Clear any existing rows

        data.forEach((item, index) => {
            const row = document.createElement('tr');

            // Create the ID cell with a tooltip
            const idCell = document.createElement('td');
            idCell.classList.add('align-middle');
            const idLink = document.createElement('a');
            idLink.setAttribute('data-bs-toggle', 'tooltip');
            idLink.setAttribute('data-bs-title', item.id); // Set the tooltip with the ID
            idLink.innerHTML = '<i class="bi bi-question-circle-fill"></i>';
            idCell.appendChild(idLink);

            // Create the other cells
            const nameCell = document.createElement('td');
            nameCell.classList.add('align-middle');
            nameCell.textContent = item.name; // Name from the JSON

            const statusCell = document.createElement('td');
            statusCell.classList.add('align-middle');
            statusCell.textContent = item.staticString; // Status from the JSON

            const typeCell = document.createElement('td');
            typeCell.classList.add('align-middle');
            typeCell.textContent = item.type; // Type from the JSON

            const dateCell = document.createElement('td');
            dateCell.classList.add('align-middle');
            dateCell.textContent = item.dateOfCreation; // Date from the JSON

            // Create the options cell with the buttons
            const optionsCell = document.createElement('td');
            optionsCell.classList.add('align-middle');

            if (item.staticString === "Em Análise") {
                // Show both check and x buttons for "Em Análise" status

                // Accept Button (bi-check-lg)
                const acceptButton = document.createElement('button');
                acceptButton.classList.add('btn', 'btn-sm', 'border-primary', 'acceptButton');
                acceptButton.id = `accept-${index}`; // Dynamic ID for accept button
                acceptButton.innerHTML = '<i class="bi bi-check-lg text-primary"></i>';
                acceptButton.addEventListener('click', () => handleAccept(item.id)); // Add click event

                // Deny Button (bi-x-lg)
                const denyButton = document.createElement('button');
                denyButton.classList.add('btn', 'btn-sm', 'border-danger', 'ms-1', 'denyButton');
                denyButton.id = `deny-${index}`; // Dynamic ID for deny button
                denyButton.innerHTML = '<i class="bi bi-x-lg text-danger"></i>';
                denyButton.addEventListener('click', () => handleDeny(item.id)); // Add click event

                optionsCell.appendChild(acceptButton);
                optionsCell.appendChild(denyButton);
            } else if (item.staticString === "Ativado") {
                // Show only the deny button for "Ativado" status

                // Deny Button (bi-x-lg) for unaccept
                const denyButton = document.createElement('button');
                denyButton.classList.add('btn', 'btn-sm', 'border-danger', 'denyButton');
                denyButton.id = `deny-${index}`; // Dynamic ID for deny button
                denyButton.innerHTML = '<i class="bi bi-x-lg text-danger"></i>';
                denyButton.addEventListener('click', () => handleUnaccept(item.id)); // Add click event for unaccept

                optionsCell.appendChild(denyButton);
            } else if (item.staticString === "Desativado") {
                // Show only the accept button for "Desativado" status

                // Accept Button (bi-check-lg) for undeny
                const acceptButton = document.createElement('button');
                acceptButton.classList.add('btn', 'btn-sm', 'border-primary', 'acceptButton');
                acceptButton.id = `accept-${index}`; // Dynamic ID for accept button
                acceptButton.innerHTML = '<i class="bi bi-check-lg text-primary"></i>';
                acceptButton.addEventListener('click', () => handleUndeny(item.id)); // Add click event for undeny

                optionsCell.appendChild(acceptButton);
            }

            // Append cells to the row
            row.appendChild(idCell);
            row.appendChild(nameCell);
            row.appendChild(statusCell);
            row.appendChild(typeCell);
            row.appendChild(dateCell);
            row.appendChild(optionsCell);

            // Append the row to the table body
            tableBody.appendChild(row);
        });

        // Initialize Bootstrap tooltips
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
        let table = new DataTable('#usersTable', {
            "language": {
                "decimal": "",
                "emptyTable": "Sem dados para mostrar nessa tabela.",
                "info": "Mostrando _START_ a _END_ de _TOTAL_ linhas",
                "infoEmpty": "Mostrando 0 a 0 de 0 linhas",
                "infoFiltered": "(filtrado de _MAX_ linhas)",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "Mostrar _MENU_ linhas",
                "loadingRecords": "Carregando...",
                "processing": "",
                "search": "Filtrar:",
                "zeroRecords": "Nenhum dado correspondente encontrado...",
                "paginate": {
                    "first": "Primeira",
                    "last": "Última",
                    "next": "Próxima",
                    "previous": "Anterior"
                }
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Handle Accept button click for "Em Análise"
async function handleAccept(id) {
    try {
        const response = await fetch('http://localhost:8080/table/adminAccept', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id }) // Send the ID in the request body
        });

        if (response.ok) {
            alert(`User with ID ${id} has been accepted.`);
            populateTable(); // Refresh the table after the action
        } else {
            alert('Error accepting the user.');
        }
    } catch (error) {
        console.error('Error processing accept:', error);
    }
}

// Handle Deny button click for "Em Análise"
async function handleDeny(id) {
    try {
        const response = await fetch('http://localhost:8080/table/adminDeny', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id }) // Send the ID in the request body
        });

        if (response.ok) {
            alert(`User with ID ${id} has been denied.`);
            populateTable(); // Refresh the table after the action
        } else {
            alert('Error denying the user.');
        }
    } catch (error) {
        console.error('Error processing deny:', error);
    }
}

// Handle Unaccept button click for "Ativado"
async function handleUnaccept(id) {
    try {
        const response = await fetch('http://localhost:8080/table/adminUnaccept', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id }) // Send the ID in the request body
        });

        if (response.ok) {
            alert(`User with ID ${id} has been unaccepted.`);
            populateTable(); // Refresh the table after the action
        } else {
            alert('Error unaccepting the user.');
        }
    } catch (error) {
        console.error('Error processing unaccept:', error);
    }
}

// Handle Undeny button click for "Desativado"
async function handleUndeny(id) {
    try {
        const response = await fetch('http://localhost:8080/table/adminUndeny', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id }) // Send the ID in the request body
        });

        if (response.ok) {
            alert(`User with ID ${id} has been undenied.`);
            populateTable(); // Refresh the table after the action
        } else {
            alert('Error undenying the user.');
        }
    } catch (error) {
        console.error('Error processing undeny:', error);
    }
}

// Call the function to populate the table on page load
window.onload = populateTable;