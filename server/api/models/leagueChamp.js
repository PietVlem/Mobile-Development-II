const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChampionSchema = new Schema(
    {
        title:{
            type: String, 
            required: true
        },
        id: {
            type: Number,
            required: true
        },
        key:{
            type: String, 
            required: true
        },
        name:{
            type: String, 
            required: true
        }
    }
);

module.exports = mongoose.model('Champion', ChampionSchema);

