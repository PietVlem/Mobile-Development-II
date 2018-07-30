const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MapSchema = new Schema(
    {
        mapName:{
            type: String, 
            required: true
        },
        mapImage:{
            type: String, 
            required: true
        },
        mapId:{
            type: Number,
            required: true
        }
    }
);

module.exports = mongoose.model('Map', MapSchema);