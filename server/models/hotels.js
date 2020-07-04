const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HotelSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true,
    },
    avatar: {
        data: Buffer,
        contentType: String,
    },
    photos: {
        data: Buffer,
        contentType: String,
    }
}, {
    timestamps: true
}
);

module.exports = mongoose.model('hotels', HotelSchema); 
