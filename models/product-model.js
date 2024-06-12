const {Schema, model} = require('mongoose');

const productSchema = Schema({
    image: Buffer,
    name: String,
    price: Number,
    discount: {
        type: Number,
        default: 0
    },
    bgColor: String,
    panelColor: String,
    textColor: String,
})

module.exports = model("product", productSchema);