const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const materialSchema = new Schema({
    name: String,
    type: String
});

module.exports = mongoose.model("Material", materialSchema);
