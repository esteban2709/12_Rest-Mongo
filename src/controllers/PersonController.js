const express = require('express');
const PersonModel = require("../models/Person");

let api = express.Router();
api.post('/savePerson', async (req, res) => {
    let response = await savePerson(req);
    if (response.status >= 400) console.error("Controlled Error:", response);
    return res.status(response.status).send(response);
  });

const savePerson = async function (req) {
    const {documentType, documentNumber, firstName, secondName, surname, secondSurname, email, address, country,
        department, location,fullName, phone} = req.body;
  
    let person = new PersonModel();
    person.documentType = documentType;
    person.documentNumber = documentNumber;
    person.firstName = firstName;
    person.secondName = secondName;
    person.surname = surname;
    person.secondSurname = secondSurname;
    person.fullName = fullName;
    person.email = email;
    person.address = address;
    person.country = country;
    person.department = department;
    person.location = location;
    person.phone = phone;
  
    return await person.save().then( personSaved => {
        if(personSaved){
            return {
              status:200,
              data: {
                success: true,
                message: "Persona creado exitosamente",
                person: personSaved
              }
            }
        }
  
        throw({ success:false, message: "Persona no ha sido creado" })
  
    }).catch((error) => {
        console.error("Error del catch", error)
        return {
            status: error.status? error.status: 500,
            message:  error.message ,
            errors: error
        }
    })
  }

  module.exports = api;