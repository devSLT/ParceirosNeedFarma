document.getElementById('bankSelect').addEventListener('change', function () {
    const outrosField = document.getElementById('outrosField');
    outrosField.style.display = 'block';
    if (this.value === 'outros') {
        // Check if input already exists, if not, create it
        if (!document.getElementById('otherBank')) {
            const input = document.createElement('input');
            input.type = 'text';
            input.name = 'otherBank';
            input.id = 'otherBank';
            input.placeholder = 'Especifique o banco';
            outrosField.appendChild(input);
        }
    } else {
        // Remove the input if it exists
        const otherInput = document.getElementById('otherBank');
        outrosField.style.display = 'none';
        if (otherInput) {
            outrosField.removeChild(otherInput);
        }
    }
});