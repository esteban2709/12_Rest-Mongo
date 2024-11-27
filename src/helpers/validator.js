const moment = require('moment-timezone');

//validation messages
exports.messages = {
    required: 'Este campo es requerido',
    numeric: 'Este campo solo permite valores numéricos',
    alpha: 'Este campo solo puede contener caracteres alfabéticos',
    minLength: 'Este campo no cumple con la cantidad mínima de caracteres',
    maxLength: 'Este campo ha excedido el límite de caracteres',
    email: 'El formato del correo es incorrecto',
    password: 'La longitud de la contraseña debe ser mínimo de 10 caracteres. Recuerde que la contraseña no puede incluir espacios y debe tener al menos una letra minúscula, una letra mayúscula, un número y un caracter especial.',
    name: 'Este campo solo puede contener caracteres alfabéticos y debe tener entre 3 y 50 caracteres',
}

exports.person = {
    documentNumber: function (value) {
        return documentNumberValidators.documentNumber(value);
    },
    nameValidation: function (value) {
        return generalValidators.textWithOutSpecialCharacters(value);
    },
    nameLength: function (value) {
        return (value.length >= 1 && value.length <= 50);
    },
    email: function (value) {
        return basicDataValidators.email(value);
    },
    emailLength: function (value) {
        return (value.length >= 6 && value.length <= 200);
    },
    address: function (value) {
        return basicDataValidators.address(value);
    },                  
    addressLength: function (value) {
        return (value.length >= 1 && value.length <= 200);
    },
    phone: function (value) {
        return basicDataValidators.phone(value);
    }
}

let generalValidators = {

    notEmpty: function (value) {
        return (!!value);
    },
    alphanumeric: function (value) {
        return /^([A-Za-z0-9 áéíóúüñÁÉÍÓÚÜÑ()])+$/.test(value);
    },
    alphanumericWithSpecialCharacters: function (value) {
        return /^([A-Za-z0-9 áéíóúüñÁÉÍÓÚÜÑ.\-_()])+$/.test(value);
    },
    nameWithSpecialCharacters: function (value) {
        return /^[A-Za-z0-9 áéíóúüñÁÉÍÓÚÜÑ(),.\-/!¡#$%&='¿?*+-]*$/.test(value);
    },
    numeric: function (value) {
        return /^[0-9]*$/.test(value);
    },
    numericWithSpecialCharacters: function (value) {
        return /^(\d*[() ,;.+-¨])*$/.test(value)
    },
    textWithSpecialCharacters: function (value) {
        return /^[A-z áéíóúüñÁÉÍÓÚÜÑ(),\-;.¡!¿?]*$/.test(value);
    },
    textWithSpecialCharactersTwo: function (value) {
        return /^[A-z áéíóúüñÁÉÍÓÚÜÑ,:."]*$/.test(value);
    },
    textWithSpecialCharactersHtml: function (value) {
        return /^[A-Za-z0-9 áéíóúüñÁÉÍÓÚÜÑ(),-:;".=¡_!¿?&#</>[\]\s]*$/.test(value);
    },
    textWithOutSpecialCharacters: function (value) {
        return /^[A-z áéíóúüñÁÉÍÓÚÜÑ]*$/.test(value);
    },
    oneLetter: function (value) {
        return /^[A-z]$/.test(value);
    },
    textAndNumbers: function (value) {
        return /^([A-Za-z0-9 \-])*$/.test(value);
    }
}

let basicDataValidators = {
    address: function (value) {
        return /^[\w\d-,.# áéíóúüÁÉÍÓÚÜÑñ]*$/.test(value);
    },
    phone: function (value) {
        return /[0-9]{7,10}/.test(value);
    },
    email: function (value) {
        return /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/.test(value.toLowerCase());
    },
    pin: function (value) {
        return /^\w{1,100}$/.test(value);
    }
}

let documentNumberValidators = {
    documentNumber: function (value) {
        return /^\d{4,15}$/.test(value);
    }
}