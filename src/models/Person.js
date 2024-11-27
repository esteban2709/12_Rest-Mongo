const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { dataBase } = require('../database/connection');
const moment = require('moment-timezone');

const { v4: uuidv4 } = require('uuid');

/*** ============ Model Helpers ================= ***/
const validations = require('../helpers/validator').person

let personSchema = new Schema({
    documentType: {
        type: String,
        enum: {
            values: ["C.C"],
            message: '{VALUE} no es un tipo de documento válido'
        },
        default: "C.C"
    },
    documentNumber: {
        type: String,
        validate: {
            validator: validations.documentNumber,
            message: 'El número de documento no posee un formato válido'
        },
    },
    firstName: {
        type: String,
        validate: [{
            validator: validations.nameValidation,
            message: 'Este campo solo acepta letras'
        }, {
            validator: validations.nameLength,
            message: 'Este campo debe contener entre 1 y 50 caracteres'
        }]
    },
    secondName: {
        type: String,
        validate: [{
            validator: validations.nameValidation,
            message: 'Este campo solo acepta letras'
        }]
    },
    surname: {
        type: String,
        validate: [{
            validator: validations.nameValidation,
            message: 'Este campo solo acepta letras'
        }, {
            validator: validations.nameLength,
            message: 'Este campo debe contener entre 1 y 50 caracteres'
        }]
    },
    secondSurname: {
        type: String,
        validate: [{
            validator: validations.nameValidation,
            message: 'Este campo solo acepta letras'
        }]
    },
    fullName: {
        type: String
    },
    email: {
        type: String,
        validate: [{
            validator: validations.email,
            message: 'El formato del correo electrónico no es correcto'
        }, {
            validator: validations.emailLength,
            message: 'Este campo debe contener entre 1 y 200 caracteres'
        }]
    },
    address: {
        type: String,
        validate: [{
            validator: validations.address,
            message: 'El formato de dirección no es correcto'
        }, {
            validator: validations.addressLength,
            message: 'Este campo debe contener entre 1 y 200 caracteres'
        }]
    },
    country: {
        type: String
    },
    department: {
        type: String
    },
    location: {
        type: String
    },
    phone: {
        type: String,
        validate: {
            validator: validations.phone,
            message: 'El número de teléfono no posee un formato válido'
        }
    },
    createdAt: {
        type: Date,
        immutable: true
    },
    updateAt: {
        type: Date,
        immutable: true
    },
    personID: {
        type: String
    },
});

personSchema.pre('save', function (next) {

    if (this.isNew) {
        this.createdAt = moment();
        this.personID = uuidv4();
    }
    else if (this.isModified) this.updateAt = moment()
    next()
})

module.exports = dataBase.model('Person', personSchema)
