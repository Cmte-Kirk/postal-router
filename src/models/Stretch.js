const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');


/* #region definição do CitySchema */
StretchSchema = new mongoose.Schema({
    source: {
        type: String,
        required: true,
    },
    target: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})
/* #endregion */

StretchSchema.plugin(mongoosePaginate);

mongoose.model('Stretch', StretchSchema);

