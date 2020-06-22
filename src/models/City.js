const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const mongoosePaginate = require('mongoose-paginate');

/* #region  validações do esquema */
var nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        passIfEmpty: false,
        message: 'Name should be between 3 and 50 characters'
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: false,
        message: 'Name should contain alpha-numeric characters only'
    })
];

var acronymValidator = [
    validate({
        validator: 'isLength',
        arguments: [2],
        message: 'Acronym should be 2 characters only'
    }),
    validate({
        validator: 'isAlphanumeric',
        message: 'Acronym should contain alpha-numeric characters only'
    })
];
/* #endregion */

/* #region definição do CitySchema */
CitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        //validate: nameValidator
    },
    acronym: {
        type: String,
        required: true,
        //validate: acronymValidator
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})
/* #endregion */

CitySchema.plugin(mongoosePaginate);

mongoose.model('City', CitySchema);

