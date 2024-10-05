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

$(document).ready(function() {
    var SPMaskBehavior = function(val) {
            return val.replace(/\D/g, '').length === 13 ? '000.000.000-00' : '000.000.000-00';
        },
        spOptions = {
            onKeyPress: function(val, e, field, options) {
                field.mask(SPMaskBehavior.apply({}, arguments), options);
            }
        };

    $('.sp_cpf').mask(SPMaskBehavior, spOptions);
});

$(document).ready(function() {
    var SPMaskBehavior = function(val) {
            return val.replace(/\D/g, '').length === 13 ? '00.000.000/0000-00' : '00.000.000/0000-00';
        },
        spOptions = {
            onKeyPress: function(val, e, field, options) {
                field.mask(SPMaskBehavior.apply({}, arguments), options);
            }
        };

    $('.sp_cnpj').mask(SPMaskBehavior, spOptions);
});

$(document).ready(function() {
    var SPMaskBehavior = function(val) {
            return val.replace(/\D/g, '').length === 13 ? '00000-000' : '00000-000';
        },
        spOptions = {
            onKeyPress: function(val, e, field, options) {
                field.mask(SPMaskBehavior.apply({}, arguments), options);
            }
        };

    $('.sp_cep').mask(SPMaskBehavior, spOptions);
});